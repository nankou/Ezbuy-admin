<template> 
  <card ref="Card" >
        <div slot="header" style="display: flex;align-items: center">
          <span style="margin: 5px">商品类型</span>
          <el-button type="primary" icon="el-icon-plus"  @click="addProductAttrCate()" class="btn-add" style="margin-left: auto;margin-right: 10px;">新增</el-button>
        </div>
    <div class="app-container">
    <div class="table-container">
      <el-table ref="productAttrCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading"
                border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="类型名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="属性数量" width="200" align="center">
          <template slot-scope="scope">{{scope.row.attributeCount==null?0:scope.row.attributeCount}}</template>
        </el-table-column>
        <el-table-column label="参数数量" width="200" align="center">
          <template slot-scope="scope">{{scope.row.paramCount==null?0:scope.row.paramCount}}</template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="getAttrList(scope.$index, scope.row)">属性列表
            </el-button>
            <el-button
              size="mini"
              @click="getParamList(scope.$index, scope.row)">参数列表
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="handleUpdate(scope.$index, scope.row)"></el-button>
            <delete-button
                    :ref="scope.row.id"
                    :id="scope.row.id"
                    @start="handleDelete(scope.$index, scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="listQuery.size"
            :page-sizes="[5,10,15]"
            :current-page.sync="listQuery.current"
            :total="total">
    </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="productAttrCatForm":model="productAttrCate" :rules="rules" label-width="120px">
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="productAttrCate.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('productAttrCatForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </card>

</template>
<script>
  import {fetchList,createProductAttrCate,deleteProductAttrCate,updateProductAttrCate} from '@/api/productAttrCate'

  export default {
    name: 'productAttrCateList',
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          current: 1,
          size: 5
        },
        dialogVisible: false,
        dialogTitle:'',
        productAttrCate:{
          name:'',
          id:null
        },
        rules: {
          name: [
            { required: true, message: '请输入类型名称', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false
          console.log(response)
          this.list = response.resultParam.productTypePage.records;
          this.total = response.resultParam.productTypePage.total;
        });
      },
      addProductAttrCate() {
        this.dialogVisible = true;
        this.dialogTitle = "添加类型";
      },
      handleSizeChange(val) {
        this.listQuery.current = 1;
        this.listQuery.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.current = val;
        this.getList();
      },
      handleDelete(index, row) {
          deleteProductAttrCate({'id': row.id}).then(response=>{
            this.$refs[row.id].close();
            this.getList();
          });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑类型";
        this.productAttrCate.name = row.name;
        this.productAttrCate.id = row.id;
      },
      getAttrList(index, row) {
        this.$router.push({path: '/productAttrList',query:{productTypeId:row.id,cname:row.name,type:0}})
      },
      getParamList(index, row) {
        this.$router.push({path: '/productAttrList',query:{productTypeId:row.id,cname:row.name,type:1}})
      },
      handleConfirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = new URLSearchParams();
            // data.append("name",this.productAttrCate.name);
            if(this.dialogTitle==="添加类型"){
              createProductAttrCate({'name': this.productAttrCate.name}).then(response=>{
                this.dialogVisible = false;
                this.getList();
              });
            }else{
              updateProductAttrCate({'id': this.productAttrCate.id,'name':this.productAttrCate.name}).then(response=>{
                this.dialogVisible = false;
                this.getList();
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


