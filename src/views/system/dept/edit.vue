<template>
  <el-dialog
      title="编辑部门"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
            v-model="form.sort"
            controls-position="right"
            :precision="0"
            :min="1">
        </el-input-number>
      </el-form-item>
      <el-form-item label="部门状态">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级部门">
        <tree-select
            v-model="form.pid"
            :options="dept"
            :normalizer="normalizer"
            :default-expand-level="1"
            placeholder="默认顶级部门"
            noResultsText="无数据"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import TreeSelect from '@riophae/vue-treeselect'
  import {editDeptApi} from '@/api/dept'

  export default {
    name: "EditDept",
    components: {TreeSelect},
    props: {
      dept: {
        type: Array,
        default: []
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
          id: '',
          name: '',
          sort: 999,
          enabled: true,
          pid: null
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          sort: {required: true, message: '请输入排序', trigger: 'change'}
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            if (!data.pid) data.pid = 0;
            this.$refs.SubmitButton.start();
            editDeptApi(data).then(() => {
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


