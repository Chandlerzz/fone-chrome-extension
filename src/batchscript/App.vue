<script setup lang="ts">
</script>
<template>
  <router-view/>
</template>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
</style>

<style>
 #risen {
     position: absolute;
     left: 20px;
     right: 20px;
     top: 20px;
     bottom: 20px;
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