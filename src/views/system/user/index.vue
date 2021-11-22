<template>
  <card ref="Card">
    <div slot="header">
<!--      <tree-select-->
<!--          v-model="searchDeptId"-->
<!--          :class="'tree-select-' + size"-->
<!--          style="float: left;width: 200px;"-->
<!--          :options="dept"-->
<!--          :normalizer="normalizer"-->
<!--          :default-expand-level="1"-->
<!--          sort-value-by="INDEX"-->
<!--          placeholder="选择部门搜索"-->
<!--          noResultsText="无数据"-->
<!--          @input="getUserList"-->
<!--      />-->
      <el-input placeholder="输入微信名搜索" v-model="searchUsername" clearable class="w-200 ml-5"
                @keyup.enter.native="getUserList"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getUserList">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="username" label="账号"/>
      <el-table-column prop="nickName" label="姓名"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column label="创建时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.roles | formatArray}}
        </template>
      </el-table-column>
<!--      <el-table-column label="部门">-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.dept | formatObj}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="岗位" :show-overflow-tooltip="true">-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.jobs | formatArray}}-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.enabled">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="deleteUser"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getUserList"></pagination>
    <add-user
        ref="AddUser"
        :dept="dept"
        @update="getUserList"
        :roleList="roleList"
        :jobList="jobList"
        :level="level"/>
    <edit-user
        ref="EditUser"
        :dept="dept"
        @update="getUserList"
        :roleList="roleList"
        :jobList="jobList"
        :level="level"/>
  </card>
</template>

<script>
  import TreeSelect from '@riophae/vue-treeselect';
  import {getUserListApi, deleteUserApi, getUserLevelApi} from '@/api/user';
  import {getDeptTreeApi} from '@/api/dept';
  import {getRoleListApi} from '@/api/role';
  import {getJobListApi} from '@/api/job';
  import {objectEvaluate} from "@/utils/common";
  import AddUser from './add';
  import EditUser from './edit';

  export default {
    name: "User",
    components: {TreeSelect, AddUser, EditUser},
    data() {
      return {
        normalizer(node) {
          return {
            label: node.name
          }
        },
        level: null,
        searchUsername: '',
        searchDeptId: null,
        formData: [],
        dept: [],
        roleList: [],
        jobList: []
      }
    },
    mounted() {
      this.getUserLevel();
      this.getUserList();
      this.getDeptTree();
      this.getRoleList();
      this.getJobList();
    },
    computed: {
      size() {
        return this.$storeGet.setting.layoutSize
      }
    },
    methods: {
      getUserLevel() {
        getUserLevelApi().then(result => {
          this.level = result.resultParam.level
        })
      },
      getJobList() {
        getJobListApi({jobName: ''}).then(result => {
          this.jobList = result.resultParam.jobList.records
        })
      },
      getRoleList() {
        getRoleListApi({roleName: ''}).then(result => {
          this.roleList = result.resultParam.roleList;
        })
      },
      getDeptTree() {
        getDeptTreeApi({deptName: ''}).then(result => {
          this.dept = result.resultParam.deptTree;
        })
      },
      getUserList() {
        this.$refs.Card.start();
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          deptId: this.searchDeptId,
          username: this.searchUsername
        };
        getUserListApi(param).then(result => {
          console.log(result)
          this.$refs.Card.stop();
          let response = result.resultParam.userList;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      add() {
        let _this = this.$refs.AddUser;
        _this.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditUser;
        objectEvaluate(_this.form, obj);
        _this.form.rolesId = [];
        obj.roles.forEach(item => {
          if (item) _this.form.rolesId.push(item.id)
        })
        _this.form.jobsId = [];
        obj.jobs.forEach(item => {
          if (item) _this.form.jobsId.push(item.id)
        })
        _this.visible = true
      },
      deleteUser(id) {
        deleteUserApi({ids: id})
          .then(() => {
            this.getUserList();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>

<style>
  .tree-select-default > .vue-treeselect__control {
    height: 40px;
    font-size: 14px;
  }

  .tree-select-default .vue-treeselect__placeholder,
  .tree-select-default .vue-treeselect__single-value {
    line-height: 37px;
  }

  .tree-select-medium > .vue-treeselect__control {
    height: 36px;
    font-size: 14px;
  }

  .tree-select-medium .vue-treeselect__placeholder,
  .tree-select-medium .vue-treeselect__single-value {
    line-height: 33px;
  }

  .tree-select-small > .vue-treeselect__control {
    height: 32px;
    font-size: 13px;
  }

  .tree-select-small .vue-treeselect__placeholder,
  .tree-select-small .vue-treeselect__single-value {
    line-height: 29px;
  }

  .tree-select-mini > .vue-treeselect__control {
    height: 28px;
    font-size: 12px;
  }

  .tree-select-mini .vue-treeselect__placeholder,
  .tree-select-mini .vue-treeselect__single-value {
    line-height: 25px;
  }
</style>