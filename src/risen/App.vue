<script setup>
 import { ref } from 'vue'
 import sidebar from './views/sidebar/index.vue'

 const cont = ref('')
 const show = ref(true)
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
 function openMenu(event){
     let menu = document.querySelector('#menu')
     menu.style.left = event.clientX + 'px'
     menu.style.top = event.clientY + 'px'
     menu.style.display = "grid"
     document.addEventListener('click',closeMenu)
 }
 function closeMenu(){
     let menu = document.querySelector('#menu')
     menu.style.display = "none"
     document.removeEventListener('click',closeMenu)
 }
</script>

<template>
    <sidebar  @contextmenu.prevent.native = "openMenu">
        <iframe id="document"
                title="Inline Frame Example"
                width="400"
                height="400"
                src="https://esbtest.risen.com/dev/v1/fone_documentation#/原理/币种转换">
        </iframe>
    </sidebar>
    <ul id = "menu">
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

</template>

<style lang="scss" scoped>
 #menu {
     background-color:#ccc;
     padding:10px;
     box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
     padding-inline-start: 0px;
     display:none;
     position:absolute;
     top:0;
     left:0;
     gap: 5px;
     li {
         list-style: none;
         cursor: pointer;
     }
 }
 iframe{
     display:none;
     position:absolute;
     top:0;
     left:100px;
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
