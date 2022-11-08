<template>
	<div>
		search
	</div>
</template>

<script setup>
import { ref, inject, reactive } from 'vue'
import { getJson1,setHeaders} from "../../../utils/request"
const headers = inject("headers")
const baseUrl = inject("baseUrl")
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

</script>

<style scoped>

</style>

