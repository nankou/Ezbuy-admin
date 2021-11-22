<template> 
  <card ref="Card">
    <div slot="header" style="display: flex;align-items: center">
      <span style="margin: 5px">数据列表</span>
      <el-button type="primary" icon="el-icon-plus"  @click="addProductAttr()" class="btn-add" style="margin-left: auto;margin-right: 10px;">新增</el-button>
    </div>
    <div class="app-container">
    <div class="table-container">
      <el-table ref="productAttrTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="属性名称" width="140" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="商品类型" width="140" align="center">
          <template slot-scope="scope">{{$route.query.cname}}</template>
        </el-table-column>
        <el-table-column label="属性是否可选" width="120" align="center">
          <template slot-scope="scope">{{scope.row.selectType|selectTypeFilter}}</template>
        </el-table-column>
        <el-table-column label="属性值的录入方式" width="150" align="center">
          <template slot-scope="scope">{{scope.row.inputType|inputTypeFilter}}</template>
        </el-table-column>
        <el-table-column label="可选值列表" align="center">
          <template slot-scope="scope">{{scope.row.inputList}}</template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
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
      <pagination ref="Pagination" @update="getList"></pagination>
    </div>
  </card>
</template>
<script>
  import {fetchList, deleteProductAttr} from '@/api/productAttr'
  import {deleteProductAttrCate} from "@/api/productAttrCate";

  export default {
    name: 'productAttrList',
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          current: 1,
          size: 5,
          type: this.$route.query.type
        },
        operateType: null,
        multipleSelection: [],
        operates: [
          {
            label: "删除",
            value: "deleteProductAttr"
          }
        ]
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(
         {current:this.listQuery.current,productTypeId:this.$route.query.productTypeId,size:this.listQuery.size,type:this.listQuery.type}
        ).then(response => {
          this.listLoading = false;
          this.list = response.resultParam.productAttributePage.records;
          this.total = response.resultParam.productAttributePage.total;
        });
      },
      addProductAttr() {
        this.$router.push({path:'addProductAttr',query:{productTypeId:this.$route.query.productTypeId,type:this.$route.query.type}});
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      handleUpdate(index, row) {
        this.$router.push({path:'updateProductAttr',query:{id:row.id}});
      },
      handleDeleteProductAttr(ids) {
          deleteProductAttr({ids:ids}).then(response => {
              this.$refs[ids].close();
            this.getList();
          });
      },
      handleDelete(index, row) {
        let ids = [];
        ids.push(row.id);
        this.handleDeleteProductAttr(ids);
      },
    },
    filters: {
      inputTypeFilter(value) {
        if (value === 1) {
          return '从列表中选取';
        } else {
          return '手工录入'
        }
      },
      selectTypeFilter(value) {
        if (value === 1) {
          return '单选';
        } else if (value === 2) {
          return '多选';
        } else {
          return '唯一'
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>


