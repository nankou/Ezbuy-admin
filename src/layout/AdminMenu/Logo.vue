<template>
  <div v-if="isShowLogo"
       :id="isVertical ? '' : 'logo-horizontal'"
       :class="['logo-container', isNight ? 'logo-night' : 'logo-light']">
    <div class="logo-box">
      <img src="../../assets/admin-logo.png" class="logo" alt="logo">
      <h1 class="logo-title">{{title}}</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Logo",
    computed: {
      isShowLogo() {
        return this.$storeGet.setting.isShowLogo
      },
      isNight() {
        return this.$storeGet.setting.isNight
      },
      isVertical() {
        return this.$storeGet.setting.isVertical
      }
    },
    data() {
      return {
        title: '言商 - 后台管理'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/index';

  /* 夜间模式 */
  .logo-night {
    background-color: $night-menu-bg-color;
    border-bottom: 1px solid $night-menu-bg-color;

    .logo-title {
      color: $light-menu-bg-color;
    }
  }

  /* 白昼模式 */
  .logo-light {
    background-color: $light-menu-bg-color;
    border-bottom: 1px solid #e9ebef;

    .logo-title {
      color: $night-menu-bg-color;
    }
  }

  /* 菜单水平 */
  #logo-horizontal {
    border: none;
  }

  .logo-container {
    & .logo-box {
      position: relative;
      width: $menu-width;
      height: $horizontal-menu-height;
      line-height: $horizontal-menu-height;
      text-align: center;
      overflow: hidden;

      & .logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 10px; // 标志
      }

      & .logo-title {
        display: inline-block;
        margin-right: 17px; // 标志
        font-weight: 600;
        line-height: $horizontal-menu-height;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: top;
      }
    }
  }
</style>
