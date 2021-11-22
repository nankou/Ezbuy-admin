<template>
  <el-cascader
      v-model="selectedOptions"
      popper-class="region-select"
      clearable
      placeholder="选择位置"
      @change="codeToText"
      :props="{checkStrictly}"
      :options="options">
  </el-cascader>
</template>

<script>
  import {regionData} from 'element-china-area-data'
  import {CodeToText} from 'element-china-area-data'
  import {TextToCode} from 'element-china-area-data'

  export default {
    name: "RegionSelect",
    props: {
      province: {type: String, default: ''},
      city: {type: String, default: ''},
      area: {type: String, default: ''}
    },
    data() {
      return {
        checkStrictly: false, // true: 只有一个值，false: 一个或多个
        options: regionData,
        selectedOptions: []
      }
    },
    watch: {
      province() {
        this.textToCode()
      },
      city() {
        this.textToCode()
      },
      area() {
        this.textToCode()
      }
    },
    methods: {
      textToCode() {
        this.selectedOptions = [];
        try {
          if (this.province) this.selectedOptions.push(TextToCode[this.province].code);
          if (this.city) this.selectedOptions.push(TextToCode[this.province][this.city].code);
          if (this.area) this.selectedOptions.push(TextToCode[this.province][this.city][this.area].code);
        } catch (e) {
          this.selectedOptions = [];
        }
      },
      codeToText(array) {
        array = array.map(item => CodeToText[item]);
        let length = array.length;
        if (this.checkStrictly) {
          if (length === 0) {
            this.$emit('update:province', '');
            this.$emit('update:city', '');
            this.$emit('update:area', '');
          } else if (length === 1) {
            this.$emit('update:province', array[0]);
            this.$emit('update:city', '');
            this.$emit('update:area', '');
          } else if (length === 2) {
            this.$emit('update:province', '');
            this.$emit('update:city', array[1]);
            this.$emit('update:area', '');
          } else {
            this.$emit('update:province', '');
            this.$emit('update:city', '');
            this.$emit('update:area', array[2]);
          }
        } else {
          if (length === 0) {
            this.$emit('update:province', '');
            this.$emit('update:city', '');
            this.$emit('update:area', '');
          } else if (length === 1) {
            this.$emit('update:province', array[0]);
            this.$emit('update:city', '');
            this.$emit('update:area', '');
          } else if (length === 2) {
            this.$emit('update:province', array[0]);
            this.$emit('update:city', array[1]);
            this.$emit('update:area', '');
          } else {
            this.$emit('update:province', array[0]);
            this.$emit('update:city', array[1]);
            this.$emit('update:area', array[2]);
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .region-select {
    .el-cascader-panel {
      height: 300px;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>
