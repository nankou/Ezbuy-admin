<template>
  <div id="index">
    <el-container>
      <!-- 菜单 -->
      <admin-menu v-if="isVertical" v-show="!isSmall" :isCollapsed="isCollapsed"/>
      <el-drawer
          v-if="isVertical"
          :class="[isNight ? 'night-drawer-menu' : 'light-drawer-menu']"
          :destroy-on-close="true"
          :visible.sync="isDrawer"
          direction="ltr"
          :with-header="false">
        <admin-menu :isCollapsed="false"/>
      </el-drawer>
      <el-container>
        <!-- 菜单 -->
        <admin-menu v-if="!isVertical"/>
        <!-- 头部 -->
        <el-header class="header">
          <!-- 上 -->
          <div class="header-up">
            <!-- 上左 -->
            <breadcrumb @showDrawerMenu="showDrawerMenu"/>
            <!-- 上右侧 -->
            <nav-bar/>
          </div>
          <!-- 下 -->
          <div class="header-down" v-show="isShowTag">
            <tag/>
          </div>
        </el-header>
        <!-- 内容 -->
        <el-main class="main">
          <transition name="Ryan-animation" mode="out-in">
            <keep-alive :include="cache">
              <router-view :key="key"/>
            </keep-alive>
          </transition>
        </el-main>
        <el-backtop target=".main" :right="16"/>
        <el-footer class="footer" v-show="isShowFooter">
          <div class="footer-text">
            <span>{{footerTxt}} - {{caseNumber}}</span>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import AdminMenu from './AdminMenu'
  import Breadcrumb from './Breadcrumb'
  import NavBar from './NavBar'
  import Tag from './Tag'
  import {footerTxt, caseNumber} from '@/settings'

  export default {
    name: 'Layout',
    components: {NavBar, AdminMenu, Breadcrumb, Tag},
    computed: {
      isDrawer: {
        get() {
          return this.$storeGet.isDrawer;
        },
        set(value) {
          this.$storeSet('setDrawer', value);
        }
      },
      isSmall() {
        return this.$storeGet.isSmall
      },
      isCollapsed() {
        return this.$storeGet.isCollapsed
      },
      key() {
        return this.$route.name
      },
      cache() {
        return this.$storeGet.cache
      },
      isShowTag() {
        return this.$storeGet.setting.isShowTag
      },
      isShowFooter() {
        return this.$storeGet.setting.isShowFooter
      },
      isVertical() {
        return this.$storeGet.setting.isVertical
      },
      isNight() {
        return this.$storeGet.setting.isNight
      },
      footerTxt() {
        return footerTxt
      },
      caseNumber() {
        return caseNumber
      }
    },
    mounted() {
      this.initialListener();
      this.getWindowWidth();
    },
    methods: {
      // 事件监听
      initialListener() {
        window.addEventListener('resize', () => {
          this.getWindowWidth()
        })
      },
      // 获取屏幕宽度
      getWindowWidth() {
        if (window.innerWidth < 992) {
          this.$storeSet('setSmall', true);
          this.$storeSet('setCollapsed', true);
        } else {
          this.$storeSet('setSmall', false);
          this.$storeSet('setDrawer', false);
        }
      },
      // 显示抽屉菜单
      showDrawerMenu() {
        if (this.isSmall) {
          this.$storeSet('setDrawer', !this.isDrawer);
        } else {
          this.$storeSet('setCollapsed', !this.isCollapsed);
        }
      }
    }
  };
</script>

<style lang="scss">
  @import './scss/index';

  #index {
    width: 100%;
    height: 100%;

    .night-drawer-menu,
    .light-drawer-menu {
      .el-drawer__body {
        height: 0;
      }

      .el-drawer {
        width: $menu-width !important;
      }
    }

    .night-drawer-menu {
      .el-drawer {
        background-color: $night-menu-bg-color
      }
    }

    .light-drawer-menu {
      .el-drawer {
        background-color: $light-menu-bg-color
      }
    }

    .header {
      height: auto !important;
      padding: 0;

      .header-up {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        border-bottom: 1px solid rgb(233, 235, 239);
      }

      .header-bottom {
        height: 37px;
      }
    }

    .main {
      padding: 15px;
      background-color: $main-bg-color;
      overflow-y: auto;
      overflow-x: hidden;

      .Ryan-animation-enter-active {
        transition: all .3s;
      }

      .Ryan-animation-leave-active {
        transition: all .3s;
      }

      .Ryan-animation-enter {
        opacity: 0;
      }

      .Ryan-animation-leave-to {
        opacity: 0;
      }
    }

    .footer {
      padding: 0;
      height: $footer-height !important;
      overflow-y: hidden;
      overflow-x: auto;
      background-color: $footer-bg-color;

      .footer-text {
        position: relative;
        line-height: 30px;
        border-top: 1px solid #dcdfe6;
        color: #666;
        white-space: nowrap;
        text-indent: 1.3rem;
        letter-spacing: 1px;
        font-size: 0.7rem;
      }
    }
  }
</style>
