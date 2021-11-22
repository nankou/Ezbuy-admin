<template>
  <card ref="Card">
    <el-form :model="productAttr" :rules="rules" ref="productAttrFrom" label-width="150px">
      <el-form-item label="属性名称：" prop="name">
        <el-input v-model="productAttr.name"></el-input>
      </el-form-item>
      <el-form-item label="商品类型：">
        <el-select v-model="productAttr.productTypeId" placeholder="请选择">
          <el-option
            v-for="item in productAttrCateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="分类筛选样式:">-->
<!--        <el-radio-group v-model="productAttr.filterType">-->
<!--          <el-radio :label="0">普通</el-radio>-->
<!--          <el-radio :label="1">颜色</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="能否进行检索:">-->
<!--        <el-radio-group v-model="productAttr.searchType">-->
<!--          <el-radio :label="0">不需要检索</el-radio>-->
<!--          <el-radio :label="1">关键字检索</el-radio>-->
<!--          <el-radio :label="2">范围检索</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="商品属性关联:">-->
<!--        <el-radio-group v-model="productAttr.relatedStatus">-->
<!--          <el-radio :label="1">是</el-radio>-->
<!--          <el-radio :label="0">否</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="属性是否可选:">-->
<!--        <el-radio-group v-model="productAttr.selectType">-->
<!--          <el-radio :label="0">唯一</el-radio>-->
<!--          <el-radio :label="1">单选</el-radio>-->
<!--          <el-radio :label="2">复选</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
      <el-form-item label="属性值的录入方式:">
        <el-radio-group v-model="productAttr.inputType">
          <el-radio :label="0">手工录入</el-radio>
          <el-radio :label="1">从下面列表中选择</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="属性值可选值列表:">
        <el-input :autosize="true" type="textarea" v-model="inputListFormat"></el-input>
      </el-form-item>
      <el-form-item label="是否支持手动新增:">
        <el-radio-group v-model="productAttr.handAddStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序属性：">
        <el-input v-model="productAttr.sort"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit('productAttrFrom')">提交</el-button>
        <el-button  v-if="!isEdit" @click="resetForm('productAttrFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </card>
</template>

<script>
  import {fetchList} from '@/api/productAttrCate'
  import {createProductAttr,getProductAttr,updateProductAttr} from '@/api/productAttr'

  const defaultProductAttr = {
    filterType: 0,
    handAddStatus: 0,
    inputList: '',
    inputType: 0,
    name: '',
    productTypeId: 0,
    relatedStatus: 0,
    searchType: 0,
    selectType: 0,
    sort: 0,
    type: 0
  };
  export default {
    name: "ProductAttrDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        productAttr: Object.assign({}, defaultProductAttr),
        rules: {
          name: [
            {required: true, message: '请输入属性名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        },
        productAttrCateList: null,
        inputListFormat:null
      }
    },
    created() {
      //编辑获得属性
      if(this.isEdit){
        getProductAttr({id:this.$route.query.id}).then(response => {
          this.productAttr = response.resultParam.shopAttribute;
          this.inputListFormat = this.productAttr.inputList.replace(/,/g,'\n');
        });
      }else{
        this.resetProductAttr();
      }
      this.getCateList();
    },
    watch:{
      inputListFormat: function (newValue, oldValue) {
        newValue = newValue.replace(/\n/g,',');
        this.productAttr.inputList = newValue;
      }
    },
    methods: {
      //获得商品属性列表
      getCateList() {
        let listQuery = {current: 1, size: 100};
        fetchList(listQuery).then(response => {
          this.productAttrCateList = response.resultParam.productTypePage.records;
        });
      },
      //重置表单
      resetProductAttr() {
        this.productAttr = Object.assign({}, defaultProductAttr);
        this.productAttr.productTypeId = Number(this.$route.query.cid);
        this.productAttr.type = Number(this.$route.query.type);
      },
      //提交表单
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.isEdit){
                var editproductAtrr = {
                  createId:this.productAttr.createId,
                  filterType:this.productAttr.filterType,
                  handAddStatus:this.productAttr.handAddStatus,
                  id:this.productAttr.id,
                  inputList:this.productAttr.inputList,
                  inputType:this.productAttr.inputType,
                  isDelete:this.productAttr.isDelete,
                  name:this.productAttr.name,
                  pageSize:this.productAttr.pageSize,
                  relatedStatus:this.productAttr.relatedStatus,
                  searchType:this.productAttr.searchType,
                  selectType:this.productAttr.selectType,
                  productTypeId:this.productAttr.productTypeId,
                  sort:this.productAttr.sort,
                  type:this.productAttr.type,
                  updateId:this.productAttr.updateId,
                }
                updateProductAttr(editproductAtrr).then(response=>{
                  this.$router.back();
                });
              }else{
                createProductAttr(this.productAttr).then(response=>{
                  this.resetForm('productAttrFrom');
                  this.$router.back();
                });
              }

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.resetProductAttr();
      }
    },
  }
</script>

<style scoped>

</style>
