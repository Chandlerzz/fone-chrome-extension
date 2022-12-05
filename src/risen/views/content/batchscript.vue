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
      <el-select v-model="params.entity" class="m-2" placeholder="Select" @change="changeEntity">
        <el-option
          v-for="item in entityOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input-number v-model="period" :min="1" :max="10" />
    </div>
    <Tables :data="tableData" @selectionChange="handleSelectionChange"></Tables>
  </div>
</template>

<script setup>
import Tables from '../tables/index.vue'
import { items } from '../../../data/batchscript/planning01'
import { yearOptions } from '../../../data/batchscript/yearOptions'
import { entityOptions } from '../../../data/batchscript/entityOptions'
import { periodOptions } from '../../../data/batchscript/periodOptions'
import { getJson1, setHeaders } from '../../../utils/request'
import { getCurMonth, getCurYear } from '../../../utils/date'
import { findScript } from '../../../utils/FContents'
import { ref, inject, reactive, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
// -------------------------------------------------------------------------------------
//init
const headers = inject('headers').value
const baseUrl = inject('baseUrl')
const FContents = ref([])
const loading = ref(false)
const period = ref(1)
const params = reactive({ year: getCurYear(), entity: 'E01', period: 'FR' + getCurMonth() })
const multipleSelection = ref([])
const emit = defineEmits(['getHeaders'])

let currentMonth = getCurMonth()
let tableData = reactive(items)
tableData.map((item) => {
  item.year = getCurYear()
  item.entity = 'E01'
  item.period = 'RF' + currentMonth
})

getJson1(
  baseUrl + 'api/FContent/getFContentsAndFavorites',
  'POST',
  {},
  (request) => {
    setHeaders(request, headers)
  },
  (data) => {
    let result = JSON.parse(data)
    result = result.data.fContentsOfSharedFolder
    findScript(result, (item) => {
      FContents.value.push(item)
    })
  },
)

// -----------------------------------------------------------------------------------
// function

function changeYear(val) {
  tableData.map((item) => {
    item.year = val
  })
}

function changeEntity(val) {
  tableData.map((item) => {
    item.entity = val
  })
}

function changePeriod(val) {
  tableData.map((item) => {
    item.period = val
  })
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
async function run() {
  emit('getHeaders')
  const tables = multipleSelection.value
  for (let item of tables) {
    loading.value = true
    let name = item.name
    let fcontentid = FContents.value.find((el) => el.name === name)
    // 暂时这里设置setTimeout loading不显示
    setTimeout(() => {
      getJson1(
        baseUrl + 'api/FContent/GetFContent',
        'POST',
        {
          appId: headers['ewaresoft-fone-applicationid'],
          userId: headers['ewaresoft-fone-applicationuserid'],
          from: 'userOpen',
          _id: fcontentid._id,
        },
        (request) => {
          setHeaders(request, headers)
        },
        (data) => {
          let result = JSON.parse(data)
          result = result.data.data
          result = JSON.parse(result)
          doOne(fcontentid, result, item)
          loading.value = false
        },
        false,
      )
    }, 100)
    await sleep(period.value * 1000)
  }
}
async function doOne(fcontentid, fcontent, row) {
  let body = {
    appID: headers['ewaresoft-fone-applicationid'],
    appUserId: headers['ewaresoft-fone-applicationuserid'],
    fContentId: fcontentid.fContentId,
    scriptName: fcontentid.name,
  }
  let variables = fcontent.variables
  let scriptText = fcontent.scriptText
  let script = ''
  variables.forEach((item2) => {
    scriptText = scriptText.replaceAll(`@${item2.name}@`, item2.name)
    if (item2.type === 'dimensionMember') {
      if (item2.name === '年度') {
        script = script + `var ${item2.name} = '${row.year}';`
      } else if (item2.name === '组织') {
        script = script + `var ${item2.name} = '${row.entity}';`
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
  body.taskId = 'script_1661826593650'
  getJson1(
    baseUrl + 'api/Script/ExcuteScriptText',
    'POST',
    body,
    (request) => {
      setHeaders(request, headers)
    },
    (data) => {
      tableData[row.id].message = data
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
