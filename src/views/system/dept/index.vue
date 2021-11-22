<template>
  <card ref="Card">
    <div slot="header">
      <el-input placeholder="输入部门名称搜索" v-model="searchName" clearable class="w-200"
                @keyup.enter.native="searchDept"/>
      <el-button type="success" class="el-icon-search ml-5" @click="searchDept">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
    </div>
    <el-table
        row-key="id"
        :data="formData"
        :default-expand-all="true"
        :tree-props="{children: 'children'}">
      <el-table-column prop="name" label="部门名称"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.enabled">启用</el-tag>
          <el-tag type="info" v-else>停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="210">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-plus" @click.stop="add(scope.row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="deleteDept"/>
        </template>
      </el-table-column>
    </el-table>
    <add-dept ref="AddDept" :dept="dept" @update="getDeptTree"/>
    <edit-dept ref="EditDept" :dept="dept" @update="getDeptTree"/>
  </card>
</template>

<script>
  import {getDeptTreeApi, deleteDeptApi} from '@/api/dept'
  import {objectEvaluate} from "@/utils/common";
  import AddDept from './add'
  import EditDept from './edit'

  export default {
    name: "Dept",
    components: {AddDept, EditDept},
    data() {
      return {
        formData: [],
        dept: [],
        searchName: ''
      }
    },
    mounted() {
      this.getDeptTree()
    },
    methods: {
      getDeptTree() {
        this.$refs.Card.start();
        getDeptTreeApi({deptName: ''}).then(result => {
          this.formData = result.resultParam.deptTree;
          this.dept = result.resultParam.deptTree;
          this.$refs.Card.stop();
        })
      },
      searchDept() {
        this.$refs.Card.start();
        getDeptTreeApi({deptName: this.searchName}).then(result => {
          this.$refs.Card.stop();
          this.formData = result.resultParam.deptTree;
        })
      },
      add(obj) {
        let _this = this.$refs.AddDept;
        if (obj) _this.form.pid = obj.id;
        _this.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditDept;
        if (obj.pid === 0) obj.pid = null;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      deleteDept(id) {
        deleteDeptApi({deptId: id})
          .then(() => {
            this.getDeptTree();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>


