<script setup>
import { ref, onMounted } from 'vue'

//" api
//"获取 所有目录
//"http://10.10.9.27/api/FContent/getFContentsAndFavorites
//http://10.10.9.27/api/

//payload
//{
//  "action": "SOAPAdminGetBusinessModel",
//  "operation": "OLAP",
//  "params": {
//    "businessModel_goid": "09lja02x",
//    "fContentId": "61668208f13e7ba779094fb7",
//    "language": "zh-CN",
//    "level_int": "2",
//    "session_goid": "23884"
//  }
//}

//payload
//{
//  "action": "SOAPAdminGetDimensionMembers",
//  "operation": "OLAP",
//  "params": {
//    "businessModel_goid": "09lja02x",
//    "dimension_int": "100",
//    "fContentId": "61668208f13e7ba779094fb7",
//    "language": "zh-CN",
//    "payload_string": "",
//    "session_goid": "23884"
//  }
//}
//http://10.10.9.27/api/BusinessModel/GetTableViewDimensionMembers
//{
//  "modelGoid": "09lja02x",
// "dimensionId": "100",
//  "rows": 5000,
//  "currentPage": 1
//}
const headers = ref({})
chrome.runtime.sendMessage({
  type: 'send-background',
})

onMounted(() => {
  var dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(window.localStorage))
  var dlAnchorElem = document.getElementById('download')
  dlAnchorElem.setAttribute('href', dataStr)
  dlAnchorElem.setAttribute('download', 'scene.json')
  dlAnchorElem.click()
})
</script>

<template>
  <main>
    <h3>panel Page!</h3>
    <a href="http://www.url.com" id="download" target="_blank"></a>

    <h6>v 0.0.0</h6>

    <a href="https://www.npmjs.com/package/create-chrome-ext" target="_blank"
      >Power by {{ headers }}</a
    >
  </main>
</template>

<style scoped>
main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

h3 {
  color: #42b983;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 2rem auto;
}

h6 {
  font-size: 0.5rem;
  color: #999999;
  margin: 0.5rem;
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}

@media (min-width: 480px) {
  h3 {
    max-width: none;
  }
}

@media (prefers-color-scheme: light) {
  a:hover {
    color: #747bff;
  }

  h6 {
    color: #333333;
  }
}
</style>
