<template>
  <div id="risen-menu" class="sidebar">
    <div class="sidebar-title">RISEN</div>
    <div class="sidebar-content">
		<slot></slot>
	</div>
  </div>
</template>
<script setup>
</script>
<style scoped>
 .sidebar {
  height: 100wh;
  width:100px;
  background-color: #ccc;
  -webkit-box-shadow: 1px 1px 3px #292929;
  -moz-box-shadow: 1px 1px 3px #292929;
  box-shadow: 1px 1px 3px #292929;
  margin: 10px;
}

.sidebar-title {
  color: #fff;
  background-color: #404040;
  font-size: 12pt;
  font-weight: bold;
  padding: 4px 6px;
  cursor: move;
}

.sidebar-content {
  padding: 4px;
}
</style >
