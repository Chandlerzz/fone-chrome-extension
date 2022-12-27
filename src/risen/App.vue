<script setup>
 import { ref } from 'vue'
 import sidebar from './views/sidebar/index.vue'

 const cont = ref('')
 const extensionId = localStorage.getItem('extensionId')
 const batchscriptUrl = 'chrome-extension://' + extensionId + '/batchscript.html'
 localStorage.setItem('origin', location.origin)
 const list = [
     {
         name: 'duplication',
         label: '全量复制',
         type: "link",
         url: batchscriptUrl + "#/duplication"
     },
     {
         name: 'batchscript',
         label: '批量脚本',
         type: 'link',
         url: batchscriptUrl,
     },
 ]
 function clickItem(item) {
     const name = item.currentTarget.getAttribute('name')
     const type = item.currentTarget.getAttribute('type')
     const url = item.currentTarget.getAttribute('url')

     // Make a simple request:
     chrome.runtime.sendMessage(
         extensionId,
         {
             openUrlInEditor: url,
             ...localStorage,
         },
         function (response) {
             if (!response.success) handleError(url)
         },
     )
     if (type === 'link') {
         /* window.open(url) */
         return
     }
     cont.value = name
 }
</script>

<template>
    <sidebar>
        <ul>
            <li
                @click="clickItem"
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
