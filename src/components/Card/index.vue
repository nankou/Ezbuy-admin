<template>
  <div class="my-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-hover-shadow'">
    <div class="my-card__header clearfix" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div v-loading="isLoading" class="my-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      header: {},
      bodyStyle: {},
      shadow: {
        type: String
      }
    },
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      start() {
        this.isLoading = true
      },
      stop() {
        this.isLoading = false
      }
    }
  }
</script>

<style scoped>
  .my-card {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    /*overflow: hidden;*/
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s
  }

  .my-card.is-always-shadow, .my-card.is-hover-shadow:focus, .my-card.is-hover-shadow:hover {
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
  }

  .my-card__header {
    padding: 8px 10px;
    border-bottom: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .my-card__body {
    padding: 10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>