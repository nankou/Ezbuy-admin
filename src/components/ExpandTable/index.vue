<template>
  <el-table
      :data="data"
      :row-key="rowKey"
      @row-click="rowClick"
      :expand-row-keys="expands"
  >
    <slot/>
  </el-table>
</template>

<script>
  export default {
    name: "ExpandTable",
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
        expands: []
      }
    },
    methods: {
      rowClick(row) {
        Array.prototype.remove = function (val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        if (this.expands.indexOf(row[this.rowKey]) < 0) {
          this.expands.push(row[this.rowKey]);
        } else {
          this.expands.remove(row[this.rowKey]);
        }
      }
    }
  }
</script>
