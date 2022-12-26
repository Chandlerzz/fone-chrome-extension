<template>
  <el-table :data="props.data" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column property="name" label="Name" width="320" />
    <el-table-column property="year" label="Year" width="120" />
    <el-table-column property="period" label="Period" width="120" />
    <el-table-column property="message" label="Message" width="520" />
  </el-table>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
})
const emit = defineEmits(['selectionChange'])
const handleSelectionChange = (val) => {
  emit('selectionChange', val)
}
</script>
<style lang="scss" scoped></style>
