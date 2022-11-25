<template>
    <div>
        search
        <button @click="update">update</button>
        <button @click="search">search</button>
    </div>
</template>

<script setup>
 import { ref, inject, reactive } from 'vue'
 import { getJson1, setHeaders } from '../../../utils/request'
 const headers = inject('headers')
 const baseUrl = inject('baseUrl')
 const FContents = inject('FContents')
 const types = ['scripts', 'dataStreams', 'reports']
 var db

 async function search(){
     initdb()
     await sleep(1000)
     readAll()
 }
 async function update() {
     window.indexedDB.deleteDatabase(headers['Ewaresoft-FOne-ApplicationId'])
     initdb()
     await sleep(1000)
     await updateFContents()
     await updateDimensionMembers()
 }
 async function updateFContents(){
     // scirpts,datastreams,rreports
     for (let ftype of types) {
         for (let item of FContents[ftype]) {
             getJson1(
                 baseUrl + 'api/FContent/GetFContent',
                 'POST',
                 {
                     appId: headers['Ewaresoft-FOne-ApplicationId'],
                     userId: headers['Ewaresoft-FOne-ApplicationUserId'],
                     from: 'userOpen',
                     _id: item._id,
                 },
                 (request) => {
                     setHeaders(request, headers)
                 },
                 (data) => {
                     let result = JSON.parse(data)
                     result = result.data
                     let result1 = {
                         id: result._id,
                         data: result.data,
                     }
                     add("FContents",result1)
                 },
                 true,
             )
             await sleep(200)
         }
     }
     // models
     for (let item of FContents["models"]){
         getJson1(
             baseUrl + 'api',
             'POST',
             {
                 "action": "SOAPAdminGetBusinessModel",
                 "operation": "OLAP",
                 "params": {
                     "businessModel_goid": item.data,
                     "fContentId": item._id,
                     "language": "zh-CN",
                     "level_int": "2",
                     "session_goid": headers["Ewaresoft-FOne-SessionId"]
                 }
             },
             (request) => {
                 setHeaders(request, headers)
             },
             (data) => {
                 let result = JSON.parse(data)
                 result = result.data
                 let result1 = {
                     id:item._id,
                     data:result
                 }
                 add("FContents",result)
             },
             true,
         )
         await sleep(200)
     }
 }
 async function updateDimensionMembers(){
     for (let item of FContents["models"]){
         getJson1(
             baseUrl + 'api',
             'POST',
             {
                 "action": "SOAPAdminGetBusinessModel",
                 "operation": "OLAP",
                 "params": {
                     "businessModel_goid": item.data,
                     "fContentId": item._id,
                     "language": "zh-CN",
                     "level_int": "2",
                     "session_goid": headers["Ewaresoft-FOne-SessionId"]
                 }
             },
             (request) => {
                 setHeaders(request, headers)
             },
             async (data) => {
                 let result = JSON.parse(data)
                 result = result.data
                 const goid = result.goid
                 let dimensions = result.dimensions
                 for (let dimension of dimensions)
                 {
                     getJson1(
                         baseUrl + 'api',
                         'POST',
                         {
                             "action": "SOAPAdminGetDimensionMembers",
                             "operation": "OLAP",
                             "params": {
                                 "businessModel_goid": "09lja02x",
                                 "dimension_int": dimension.id,
                                 "fContentId": item._id,
                                 "language": "zh-CN",
                                 "payload_string": "",
                                 "session_goid": headers["Ewaresoft-FOne-SessionId"]
                             }
                         },
                         (request) => {
                             setHeaders(request, headers)
                         },
                         (data) => {
                             let result = JSON.parse(data)
                             let id =JSON.stringify({goid:goid,dimensionId:dimension.id})
                             let result1 = {id:id,data:result.data}
                             add("ModelDimensionMembers",result1)
                         },
                         true,
                     )
                     await sleep(200)
                 }
             },
             true,
         )
         await sleep(200)
     }
 }
 function initdb(){
     var request = window.indexedDB.open(headers['Ewaresoft-FOne-ApplicationId'])
     request.onerror = function (event) {
         console.log('数据库打开报错')
     }
     request.onsuccess = function (event) {
         db = request.result
         console.log('数据库打开成功')
     }
     request.onupgradeneeded = function (event) {
         if (event) {
             db = event.target.result
             var objectStore
             if (!db.objectStoreNames.contains('FContents')) {
                 objectStore = db.createObjectStore('FContents', { keyPath: 'id' })
                 objectStore.createIndex('data', 'data', { unique: false })
                 objectStore = db.createObjectStore('ModelDimensionMembers', { keyPath: 'id' })
                 objectStore.createIndex('data', 'data', { unique: false })
             }
         }
     }
 }

 function add(table,result) {
     var request = db.transaction([table], 'readwrite').objectStore(table).add(result)

     request.onsuccess = function (event) {
         console.log('数据写入成功')
     }

     request.onerror = function (event) {
         console.log('数据写入失败')
     }
 }
 function put(table,result){
     var request = db.transaction([table], 'readwrite').objectStore(table).put(result)

     request.onsuccess = function (event) {
         console.log('数据写入成功')
     }

     request.onerror = function (event) {
         console.log('数据写入失败')
     }
 }

 function readAll(){
     var objectStore = db.transaction(['ModelDimensionMembers'],'readwrite').objectStore('ModelDimensionMembers');

     objectStore.openCursor().onsuccess = function (event) {
         var cursor = event.target.result;

         if (cursor) {
             console.log(cursor.value.data)
             cursor.continue();
         } else {
             console.log('没有更多数据了！');
         }
     };
 }
 function sleep(ms) {
     return new Promise((resolve) => setTimeout(resolve, ms))
 }
</script>

<style scoped>
</style>
