<template>
  <card ref="Card" >
    <div slot="header" style="display: flex;align-items: center">
      <span style="margin: 5px">商品分类</span>
      <el-button type="primary" icon="el-icon-plus" @click="handleAddProductCate()" class="btn-add" style="margin-left: auto;margin-right: 10px;">新增</el-button>
    </div>
    <div class="app-container">
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="级别" width="100" align="center">
          <template slot-scope="scope">{{scope.row.parentId | levelFilter}}</template>
        </el-table-column>
        <el-table-column label="商品数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.productCount }}</template>
        </el-table-column>
        <el-table-column label="数量单位" width="100" align="center">
          <template slot-scope="scope">{{scope.row.productUnit }}</template>
        </el-table-column>
        <el-table-column label="导航栏" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleNavStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.navStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.parentId | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
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
  </div>
  </card>

</template>

<script>
  import {fetchList,deleteProductCate,updateShowStatus,updateNavStatus,fetchListWithChildren} from '@/api/productCate'

  export default {
    name: "productCateList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        parentId: 0
      }
    },
    created() {
      this.resetParentId();
      this.getList();
    },
    watch: {
      $route(route) {
        this.resetParentId();
        this.getList();
      }
    },
    methods: {
      resetParentId(){
        if (this.$route.query.parentId != null) {
          this.parentId = this.$route.query.parentId;
        } else {
          this.parentId = 0;
        }
      },
      handleAddProductCate() {
        this.$router.push('/addProductCate');
      },
      getList() {
        this.listLoading = true;
        fetchList(this.parentId, this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.resultParam.productSortList;
        });
      },
      handleNavStatusChange(index, row) {
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        updateNavStatus(
          {
            id:ids,
            description:row.description,
            icon:row.icon,
            keywords:row.keywords,
            name:row.name,
            navStatus:row.navStatus,
            parentId:row.parentId,
            productUnit:row.productUnit,
            showStatus:row.showStatus,
            sort:row.sort,
          }
        ).then(response=>{
          console.log(response)
        });
      },
      handleShowStatusChange(index, row) {
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        updateShowStatus(
          {
            id:ids,
            description:row.description,
            icon:row.icon,
            keywords:row.keywords,
            name:row.name,
            navStatus:row.navStatus,
            parentId:row.parentId,
            productUnit:row.productUnit,
            showStatus:row.showStatus,
            sort:row.sort,
          }
        ).then(response=>{
          console.log(response)
        });
      },
      handleShowNextLevel(index, row) {
        this.listLoading = true;
        fetchListWithChildren({id:row.id}).then(response => {
          this.listLoading = false;
          this.list = response.resultParam.productSortList;
        });
      },
      handleTransferProduct(index, row) {
        console.log('handleAddProductCate');
      },
      handleUpdate(index, row) {
        this.$router.push({path:'/updateProductCate',query:{id:row.id}});
      },
      handleDelete(index, row) {
          deleteProductCate({id:row.id}).then(response => {
            this.getList();
          });
      }
    },
    filters: {
      levelFilter(value) {
        if (value === 0) {
          return '一级';
        } else if (value === 2) {
          return '二级';
        }
      },
      disableNextLevel(value) {
        if (value === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
