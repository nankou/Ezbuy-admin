<template>
  <el-dialog
      title="新增用户"
      width="600px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <row-col>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
    </row-col>
      <row-col>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item slot="r" label="状态">
          <el-radio-group v-model="form.enabled">
            <el-radio :label="true">激活</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </row-col>
      <!--        <el-form-item slot="r" label="邮箱" prop="email">-->
      <!--          <el-input v-model="form.email"></el-input>-->
      <!--        </el-form-item>-->
      <row-col>
        <el-form-item label="部门">
          <tree-select
              v-model="form.deptId"
              :options="dept"
              :normalizer="normalizer"
              :default-expand-level="1"
              sort-value-by="INDEX"
              placeholder=""
              noResultsText="无数据"
          />
        </el-form-item>
      <el-form-item slot="r" label="岗位">
        <el-select v-model="form.jobsId " multiple clearable>
          <el-option
                  v-for="item in jobList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"/>
        </el-select>
      </el-form-item>
      </row-col>
      <el-form-item label="角色" prop="rolesId">
        <el-select v-model="form.rolesId" multiple clearable class="w-100">
          <el-option
              v-for="item in roleList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
              :disabled="level >= item.level"/>
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import TreeSelect from '@riophae/vue-treeselect';
  import {addUserApi} from '@/api/user';
  import {validatePhone, validateUsername, validEmail} from '@/utils/validate';

  export default {
    name: "AddUser",
    components: {TreeSelect},
    props: {
      dept: {
        type: Array,
        default: []
      },
      roleList: {
        type: Array,
        default: []
      },
      jobList: {
        type: Array,
        default: []
      },
      level: {
        type: Number
      }
    },
    data() {
      return {
        normalizer(node) {
          return {
            label: node.name
          }
        },
        visible: false,
        form: {
          username: '',
          nickName: '',
          sex: '男',
          phone: '',
          email: '',
          enabled: true,
          deptId: null,
          jobsId: [],
          rolesId: []
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {validator: validateUsername, trigger: 'blur'}
          ],
          email: {validator: validEmail, trigger: 'blur'},
          phone: {validator: validatePhone, trigger: 'blur'},
          rolesId: {required: true, message: '请选择角色', trigger: 'change'}
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            addUserApi(data).then(() => {
              this.$refs.SubmitButton.stop();
              this.$emit('update');
              this.cancel()
            }).catch(() => {
              this.$refs.SubmitButton.stop();
            })
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.visible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].clearValidate()
      }
    }
  }
</script>


