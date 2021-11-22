<template>
  <div id="app">
    <!--<el-button @click="fun">按钮</el-button>
    <el-button @click="reset">重置</el-button>
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="地区" prop="province">
        <region-select
            :province.sync="form.province"
            :city.sync="form.city"
            :area.sync="form.area"
        />
      </el-form-item>
    </el-form>-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        form: {
          province: '',
          city: '',
          area: ''
        },
        rules: {
          province: {required: true, message: '请选择地区', trigger: 'change'}
        }
      }
    },
    methods: {
      fun() {
        this.form = {
          province: '北京市',
          city: '市辖区',
          area: '123'
        }
      },
      reset() {
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].clearValidate()
      }
    }
  };
</script>
