<template>
  <div class="content">
	  <component :is="useComponent"></component>
  </div>
</template>
<script setup>
import batchscript from "./batchscript.vue"
import search from "./search.vue"
import { computed } from 'vue'
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})
const useComponent = computed(() => {
	if(props.content === "batchscript" )
	{
		return  batchscript;
	}else if(props.content === "search"){
		return search;
	}else {
		return "";
	}
})
</script>

<style scoped>
.content {
  z-index:100;
  flex: 1;
}
</style >
