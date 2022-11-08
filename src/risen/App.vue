<script setup>
import {ref} from 'vue'
import sidebar from './views/sidebar/index.vue'
import content  from './views/content/index.vue'
const cont = ref("")
const list = [
	{
		name:"search",
		label:"搜索"
	},
	{
		name:"batchscript",
		label:"批量脚本"
	},
]
function clickItem(item){
	const name = item.currentTarget.getAttribute("name");
	cont.value = name;
}
</script>

<template>
  <content :content="cont"></content>
  <sidebar>
    <ul>
		<li @click="clickItem" v-for = "item in list" :name="item.name" :key="item.name">{{item.label}}</li>
    </ul>
  </sidebar>
</template>

<style lang="scss" scoped>
ul {
  padding-inline-start: 0px;
  display:grid;
  gap:5px;
  li {
    list-style: none;
	cursor:pointer;
  }
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
.el-table__header{
  width:100% !important;
}
.el-table__body{
  width:100% !important;
}
</style>
