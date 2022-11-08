<script setup>
import {ref,provide} from 'vue'
import sidebar from './views/sidebar/index.vue'
import content  from './views/content/index.vue'
// init headers  baseUrl
let userInfo = JSON.parse(localStorage.getItem("f_userInfo"))
userInfo = JSON.parse(userInfo.data)
const lastSelectedApplication = JSON.parse(localStorage.getItem("f_lastSelectedApplication"))
const sessionId = JSON.parse(localStorage.getItem("f_sessionId"))
const authorization = JSON.parse(localStorage.getItem("f_authorization"))
const origin  = document.location.origin;
let baseUrl = ""
if(origin.includes("localhost")){
	baseUrl = "http://10.10.9.27/"
}
baseUrl = document.location.origin === "https://fone.risen.com" ? "https://fone.risen.com:80/" : "http://10.10.9.27/"
const headers = {
	"Content-Type": "application/json"
}
headers["Ewaresoft-FOne-SessionId"] = sessionId.data;
headers["Ewaresoft-FOne-GlobalUserId"] = userInfo.user_id;
headers["Ewaresoft-FOne-ApplicationId"] = lastSelectedApplication._id;
headers["Ewaresoft-FOne-ApplicationUserId"] = lastSelectedApplication.organization_id;
headers["Authorization"] = authorization.data;
provide("headers",headers);
provide("baseUrl",baseUrl);
		
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
