<script setup>
 import { ref, provide,watch } from 'vue'
 import sidebar from './views/sidebar/index.vue'
 import { findScript, findModel, findDataStream, findReport } from '../utils/FContents'
 import { getJson1, setHeaders } from '../utils/request'
 // init headers  baseUrl
 let baseUrl = ''
 let FContents = {
     models: [],
     dataStreams: [],
     scripts: [],
     reports: [],
 }

 let userInfo = JSON.parse(localStorage.getItem('f_userInfo'))
 userInfo = JSON.parse(userInfo.data)
 const lastSelectedApplication = JSON.parse(localStorage.getItem('f_lastSelectedApplication'))
 const sessionId = JSON.parse(localStorage.getItem('f_sessionId'))
 const authorization = JSON.parse(localStorage.getItem('f_authorization'))
 const origin = document.location.origin
 if (origin.includes('localhost')) {
     baseUrl = 'http://10.10.9.27/'
 }
 baseUrl =
     document.location.origin === 'https://fone.risen.com'
     ? 'https://fone.risen.com:80/'
     : 'http://10.10.9.27/'
 const headers = ref({'Content-Type': 'application/json'})
 function getHeaders(){
     headers.value['Ewaresoft-FOne-SessionId'] = sessionId ? sessionId.data : ""
     headers.value['Ewaresoft-FOne-GlobalUserId'] = userInfo.user_id
     headers.value['Ewaresoft-FOne-ApplicationId'] = lastSelectedApplication._id
     headers.value['Ewaresoft-FOne-ApplicationUserId'] = lastSelectedApplication.organization_id
     headers.value['Authorization'] = authorization.data
 }

 function getFContents(){
     getJson1(
         baseUrl + 'api/FContent/getFContentsAndFavorites',
         'POST',
         {},
         (request) => {
             setHeaders(request, headers.value)
         },
         (data) => {
             let result = JSON.parse(data)
             result = result.data.fContentsOfSharedFolder
             const models = result.filter((item) => item.name === 'B 模型管理')
             const dataStreams = result.filter((item) => item.name === 'C 业务实现')
             const scripts = result.filter((item) => item.name === 'C 业务实现')
             const reports = result.filter((item) => item.name === 'C 业务实现')
             findModel(models, (item) => {
                 FContents.models.push(item)
             })
             findDataStream(dataStreams, (item) => {
                 FContents.dataStreams.push(item)
             })
             findScript(scripts, (item) => {
                 FContents.scripts.push(item)
             })
             findReport(reports, (item) => {
                 FContents.reports.push(item)
             })
             provide('FContents', FContents)
         },
     )
 }

 getHeaders()

 provide('headers', headers)
 provide('baseUrl', baseUrl)
 provide('FContents', FContents)

 const cont = ref('')
 const extensionId = localStorage.getItem("extensionId")
 const batchscriptUrl ="chrome-extension://" + extensionId + "/batchscript.html"
 localStorage.setItem("origin",location.origin)
 const list = [
//     {
//         name: 'search',
//         label: '搜索',
//         type: "module",
//     },
     {
         name: 'batchscript',
         label: '批量脚本',
         type:"link",
         url:batchscriptUrl
     },
 ]
 function clickItem(item) {
     const name = item.currentTarget.getAttribute('name')
     const type = item.currentTarget.getAttribute('type')
     const url = item.currentTarget.getAttribute("url")

     // Make a simple request:
     chrome.runtime.sendMessage(
         extensionId,
         {
             openUrlInEditor: batchscriptUrl,
             ...localStorage
         },
         function(response) {
             if (!response.success)
                 handleError(url);
         }
     );
     if(type === "link"){
         /* window.open(url) */
         return
     }
     cont.value = name
 }
</script>

<template>
    <sidebar>
        <ul>
            <li @click="clickItem"
                v-for="item in list"
                :name="item.name"
                :key="item.name"
                :type="item.type"
                :url="item.url"
            >
                {{ item.label }}
            </li>
        </ul>
    </sidebar>
</template>

<style lang="scss" scoped>
 ul {
     padding-inline-start: 0px;
     display: grid;
     gap: 5px;
     li {
         list-style: none;
         cursor: pointer;
     }
 }
</style>

<style>
 #risen {

 }
 .risen-show {
     display: flex;
 }
 .risen-unshow {
     display: none;
 }
 .el-table__header {
     width: 100% !important;
 }
 .el-table__body {
     width: 100% !important;
 }
</style>
