<template>
    <div v-loading="loading" style="background: white">
        <header class="header">
            <span>预算系统</span>
        </header>
        <div class="workline">
            <el-button @click="run">运行</el-button>

            <el-select v-model="params.year" class="m-2" placeholder="Select" @change="changeYear">
                <el-option
                    v-for="item in yearOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <el-select v-model="params.period" class="m-2" placeholder="Select" @change="changePeriod">
                <el-option
                    v-for="item in periodOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </div>
        <Tables :data="tableData" @selectionChange="handleSelectionChange"></Tables>
    </div>
</template>
<script setup>
 import Tables from '@batchscript/views/tables/tables.vue'
 import { yearOptions } from '../../../data/batchscript/yearOptions'
 import { periodOptions } from '../../../data/batchscript/periodOptions'
 import { getJson1, setHeaders } from '../../../utils/request'
 import { getCurMonth, getCurYear } from '../../../utils/date'
 import { findScript,findDataStream,findModel } from '../../../utils/FContents'
 import { ref, inject, reactive, computed, defineEmits } from 'vue'
 import { ElMessage } from 'element-plus'
 import { useMainStore } from '../../stores/main.js'
 import { storeToRefs } from 'pinia'
 // -------------------------------------------------------------------------------------

 const store = useMainStore()
 const { baseUrl, headers } = storeToRefs(store)
 const FContents = ref([])
 const Models = []
 const loading = ref(false)

 const params = reactive({
     year:getCurYear(),
     period:"RF"+ getCurMonth()
 })
 const multipleSelection = ref([])
 const emit = defineEmits(['getHeaders'])

 const tableData = computed(() => {
     const currencyTransformScripts = FContents.value
     currencyTransformScripts.map((item) => {
         item.year = getCurYear()
         item.period = "RF"+ getCurMonth()
     })
     return currencyTransformScripts
 })

 getJson1(
     baseUrl.value + 'api/FContent/getFContentsAndFavorites',
     'POST',
     {},
     (request) => {
         setHeaders(request, headers.value)
     },
     (data) => {
         data = JSON.parse(data)
         let result = data.data.fContents
         findScript(result, (item) => {
             if(item.name.endsWith("预算模型脚本"))
             {
                 FContents.value.push(item)
             }
         })
         result = data.data.fContentsOfSharedFolder
         findModel(result,(item) => {
             Models.push(item)
         })
     },
 )

 // -----------------------------------------------------------------------------------
 // function

 function changeYear(val) {
     tableData.value.map((item) => {
         item.year = val
     })
 }

 function changePeriod(val) {
     tableData.value.map((item) => {
         item.period = val
     })
 }

 function sleep(ms) {
     return new Promise((resolve) => setTimeout(resolve, ms))
 }

 const handleSelectionChange = (val) => {
     multipleSelection.value = val
 }
 function getInputs(arr,type,func){
     for (let item of arr) {
         if(item[type] === "INPUT"){
             const node = {"nodeId": item['id'], "id": item["id"], "name": item["name"], "type": "INPUT", "memberFormulaId":"SELF", "description":"仅自己",}
             func(node)
         }
         if (item.children) {
             getInputs(item.children, type, func)
         }
     }
 }
 async function run() {
     emit('getHeaders')
     const tables = multipleSelection.value
     for (let item of tables) {
         loading.value = true
         let name = item.name
         let fcontentid = FContents.value.find((el) => el.name === name)
         name = item.name.slice(0,-2);//脚本两个字排除
         const model = Models.find((el) => el.name.includes(name))
         const dimensions={
             '0':{
                 name:'数据来源',
                 type:'LineType',
             }
         }
         const inputs ={
             '0':{
                 inputs:[],
                 labels:[],
             }
         }
         for (let i in dimensions){
             getJson1(
                 baseUrl.value + 'api/',
                 'POST',
                 {
                     "action": "SOAPAdminGetDimensionMembers",
                     "operation": "OLAP",
                     "params": {
                         "businessModel_goid": model.data,
                         "dimension_int": i,
                         "fContentId": model._id,
                         "language": "zh-CN",
                         "payload_string": "",
                         "session_goid": headers.value['Ewaresoft-FOne-SessionId']
                     }
                 },
                 (request) => {
                     setHeaders(request, headers.value)
                 },
                 (data) => {
                     data = JSON.parse(JSON.parse(data).data)
                     const arr = data.members
                     const type = dimensions[i].type
                     getInputs(arr,type,(item) =>{
                         inputs[i].inputs.push(item);
                         inputs[i].labels.push(item.name);
                     })
                 },
                 false,
             )
         }
         //TODO 根据模型读取现有的数据来源和科目
         //将科目的数据输入型全部存到数据流中。
         //将数据来源的输入型分批写人到数据流分批执行。
         //先改写数据流再执行脚本
         getJson1(
             baseUrl.value + 'api/FContent/GetFContent',
             'POST',
             {
                 appId: headers.value['ewaresoft-fone-applicationid'],
                 userId: headers.value['ewaresoft-fone-applicationuserid'],
                 from: 'userOpen',
                 _id: fcontentid._id,
             },
             (request) => {
                 setHeaders(request, headers.value)
             },
             async (data) => {
                 const fcontentid = FContents.value.find((el) => el.name === name + "脚本")
                 const row = multipleSelection.value.find((el) => el.name === name + "脚本")
                 data = JSON.parse(data).data
                 data = JSON.parse(data.data)
                 const source =inputs['0']
                 let flag = 0
                 let page = 1
                 const target = {}
                 while(flag < source.inputs.length){
                     row['account'] = source.inputs[flag].nodeId
                     flag = flag + page
                     await doOne(fcontentid, data, row)
                     await sleep(1000)

                 }
                 loading.value = false
             },
             false,
         )
         await sleep(1000)
     }
 }
 async function doOne(fcontentid, fcontent, row){
     let body = {
         appID: headers.value['ewaresoft-fone-applicationid'],
         appUserId: headers.value['ewaresoft-fone-applicationuserid'],
         fContentId: fcontentid.fContentId,
         scriptName: fcontentid.name,
         "taskId": "script_" + (new Date).getTime()
     }
     let variables = fcontent.variables
     let scriptText = fcontent.scriptText
     let script = ''
     variables.forEach((item2) => {
         scriptText = scriptText.replaceAll(`@${item2.name}@`, item2.name)
         if (item2.type === 'dimensionMember') {
             if (item2.name === '年度') {
                 script = script + `var ${item2.name} = '${row.year}';`
             } else if (item2.name === '数据来源') {
                 script = script + `var ${item2.name} = '${row.account}';`
             } else {
                 script = script + `var ${item2.name} = '${row.period}';`
             }
         } else {
             script = script + `var ${item2.name} = '${item2.value}';`
         }
     })
     script = script + '\n'
     scriptText = script + scriptText
     body.scriptText = scriptText
     getJson1(
         baseUrl.value + 'api/Script/ExcuteScriptText',
         'POST',
         body,
         (request) => {
             setHeaders(request, headers.value)
         },
         (data) => {
             tableData.value.find((item) => item._id === row._id).message = data
             ElMessage({
                 message: data,
                 type: 'success',
             })
         },
         false,
     )
 }
</script>

<style lang="scss" scoped>
 .header {
     display: flex;
     place-content: center;
 }
 .workline {
     display: flex;
     gap: 1rem;
     margin: 20px 10px;
     .application {
         margin-left: auto;
     }
 }
</style>