<template>
  <card ref="Card">
    <div slot="header">
      <el-input placeholder="输入菜单名称搜索" v-model="searchTitle" clearable class="w-200"
                @keyup.enter.native="searchMenu"/>
      <el-button type="success" class="el-icon-search ml-5" @click="searchMenu">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="add()" class="float-right">新增</el-button>
    </div>
    <el-table
        row-key="id"
        :data="formData"
        :tree-props="{children: 'children'}">
      <el-table-column prop="title" label="菜单名称"/>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <svg-icon slot="prefix" :icon-class="scope.row.icon" class="el-table-column-icon"/>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column label="路径名称">
        <template slot-scope="scope">
          <clipboard :text="scope.row.name">{{scope.row.name}}</clipboard>
        </template>
      </el-table-column>
      <el-table-column prop="permission" label="权限标识"/>
      <el-table-column label="外链" align="center" width="55">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.iframe">是</el-tag>
          <el-tag type="info" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="缓存" align="center" width="55">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.cache">是</el-tag>
          <el-tag type="info" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="可见" align="center" width="55">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.hidden">否</el-tag>
          <el-tag type="success" v-else>是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="210">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-plus" @click.stop="add(scope.row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="deleteMenu"/>
        </template>
      </el-table-column>
    </el-table>
    <add-menu ref="AddMenu" :menu="menu" @update="getMenu"/>
    <edit-menu ref="EditMenu" :menu="menu" @update="getMenu"/>
  </card>
</template>

<script>
  import {getAllMenuApi, deleteMenuApi} from '@/api/menu';
  import {objectEvaluate} from "@/utils/common";
  import AddMenu from './add';
  import EditMenu from './edit';
  import Clipboard from '@/components/Clipboard';

  export default {
    name: "Menu",
    components: {AddMenu, EditMenu, Clipboard},
    data() {
      return {
        isDeleteLoading: false,
        formData: [],
        menu: [],
        searchTitle: ''
      }
    },
    mounted() {
      this.getMenu()
    },
    methods: {
      getMenu() {
        this.$refs.Card.start();
        getAllMenuApi({title: ''}).then(result => {
          this.formData = result.resultParam.menuList;
          this.menu = result.resultParam.menuList
          this.$nextTick(() => {
            this.$refs.Card.stop();
          })
        })
      },
      searchMenu() {
        this.$refs.Card.start();
        getAllMenuApi({title: this.searchTitle}).then(result => {
          this.$refs.Card.stop();
          this.formData = result.resultParam.menuList;
        })
      },
      deleteMenu(id) {
        deleteMenuApi({menuId: id})
          .then(() => {
            this.getMenu();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      },
      add(obj) {
        let _this = this.$refs.AddMenu;
        if (obj) _this.form.pid = obj.id;
        _this.visible = true;
      },
      edit(obj) {
        let _this = this.$refs.EditMenu;
        if (obj.pid === 0) obj.pid = null;
        objectEvaluate(_this.form, obj);
        _this.visible = true;
      }
    }
  }
</script>