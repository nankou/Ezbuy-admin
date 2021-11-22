<template>
  <el-date-picker
      v-if="has"
      v-model="value"
      clearable
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      :default-time="['12:00:00', '12:00:00']"
      @change="emitTime"
  >
  </el-date-picker>
</template>

<script>
  const formatTime = require('silly-datetime');

  export default {
    name: "DateTimePicker",
    props: {
      start: {type: String | Number | Date},
      end: {type: String | Number | Date}
    },
    data() {
      return {
        value: null,
        flag: true,
        has: true
      }
    },
    watch: {
      start() {
        this.setTime()
      },
      end(val) {
        this.setTime();
        if (!val && this.flag) {
          this.has = false;
          this.$nextTick(() => {
            this.has = true
          })
        }
      }
    },
    methods: {
      format(time) {
        return formatTime.format(time, 'YYYY-MM-DD HH:mm:ss');
      },
      setTime() {
        if (this.start && this.end) {
          this.value = [];
          this.value[0] = this.format(this.start);
          this.value[1] = this.format(this.end);
          this.$emit('update:start', this.value[0]);
          this.$emit('update:end', this.value[1]);
          this.flag = true
        } else {
          this.value = null;
        }
      },
      emitTime(value) {
        if (!value) {
          this.$emit('update:start', '');
          this.$emit('update:end', '');
          this.flag = false
        } else {
          this.$emit('update:start', value[0]);
          this.$emit('update:end', value[1]);
        }
      }
    }
  }
</script>
