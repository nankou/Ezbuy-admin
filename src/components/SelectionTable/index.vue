<template>
  <el-table
      :data="data"
      @selection-change="getSelected"
  >
    <el-table-column type="selection" width="55"/>
    <slot/>
  </el-table>
</template>

<script>
  export default {
    name: "SelectionTable",
    props: {
      data: {
        type: Array,
        default: []
      },
      rowKey: {
        type: String,
        default: "id"
      }
    },
    data() {
      return {
        keys: []
      }
    },
    methods: {
      getSelected(array) {
        this.keys = array.map(item => item[this.rowKey])
      },
      get() {
        return this.keys
      }
    }
  }
</script>
