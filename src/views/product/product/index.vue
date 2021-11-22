<template> 
  <card ref="Card">
    <div slot="header" style="display: flex;align-items: center">
      <span style="margin:10px">商品列表</span>
      <el-button type="primary" icon="el-icon-plus"  @click="handleAddProduct()" class="float-right" style="margin-left: auto;margin-right: 10px;">新增</el-button>
    </div>
    <div class="app-container">
    <div class="header-container">
      <el-input placeholder="输入商品名称搜索" v-model="listQuery.name" clearable class="w-200"
                @keyup.enter.native="handleSearchList"/>
      <el-button type="success" class="el-icon-search ml-5" @click="handleSearchList()">搜索</el-button>
      <div class="batch-operate-container" style="float: right;margin-right: 10px;">
        <el-select
                size="small"
                v-model="operateType" placeholder="批量操作">
          <el-option
                  v-for="item in operates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-button
                style="margin-left: 20px"
                class="search-button"
                @click="handleBatchOperate()"
                type="primary"
                size="small">
          确定
        </el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.price}}</p>
            <p>货号：{{scope.row.productSn}}</p>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="140" align="center">
          <template slot-scope="scope">
            <p>上架：
              <el-switch
                      @change="handlePublishStatusChange(scope.$index, scope.row)"
                      :active-value="1"
                      :inactive-value="0"
                      v-model="scope.row.publishStatus">
              </el-switch>
            </p>
            <p>新品：
              <el-switch
                      @change="handleNewStatusChange(scope.$index, scope.row)"
                      :active-value="1"
                      :inactive-value="0"
                      v-model="scope.row.newStatus">
              </el-switch>
            </p>
            <p>推荐：
              <el-switch
                      @change="handleRecommendStatusChange(scope.$index, scope.row)"
                      :active-value="1"
                      :inactive-value="0"
                      v-model="scope.row.recommandStatus">
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="SKU库存" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="handleShowSkuEditDialog(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="销量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sale}}</template>
        </el-table-column>
<!--        <el-table-column label="审核状态" width="100" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{scope.row.verifyStatus | verifyStatusFilter}}</p>-->
<!--            <p>-->
<!--              <el-button-->
<!--                      type="text"-->
<!--                      @click="handleShowVerifyDetail(scope.$index, scope.row)">审核详情-->
<!--              </el-button>-->
<!--            </p>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit"  @click="handleUpdateProduct(scope.$index, scope.row)"></el-button>
            <delete-button
                :ref="scope.row.id"
                :id="scope.row.id"
                @start="handleDelete(scope.$index, scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页-->
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
    <!--    编辑SKU库存-->
    <el-dialog
            title="编辑货品信息"
            :visible.sync="editSkuInfo.dialogVisible"
            width="40%">
      <span>商品货号：</span>
      <span>{{editSkuInfo.productSn}}</span>
      <el-input placeholder="按sku编号搜索" v-model="editSkuInfo.keyword" size="small" style="width: 50%;margin-left: 20px">
        <el-button slot="append" icon="el-icon-search" @click="handleSearchEditSku"></el-button>
      </el-input>
      <el-table style="width: 100%;margin-top: 20px"
                :data="editSkuInfo.stockList"
                border>
        <el-table-column
                label="SKU编号"
                align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
                v-for="(item,index) in editSkuInfo.productAttr"
                :label="item.name"
                :key="item.id"
                align="center">
          <template slot-scope="scope">
            {{getProductSkuSp(scope.row,index)}}
          </template>
        </el-table-column>
        <el-table-column
                label="销售价格"
                width="80"
                align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
                label="商品库存"
                width="80"
                align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
                label="库存预警值"
                width="100"
                align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditSkuConfirm">确 定</el-button>
        </span>
    </el-dialog>
  </div>
  </card>
</template>
<script>
  import {
    fetchList,
    updateDeleteStatus,
    updateNewStatus,
    updateRecommendStatus,
    updatePublishStatus
  } from '@/api/product'
  import {fetchList as fetchSkuStockList,update as updateSkuStockList} from '@/api/skuStock'
  import {fetchList as fetchProductAttrList} from '@/api/productAttr'
  // import {fetchList as fetchBrandList} from '@/api/brand'
  import {deleteProductCate, fetchListWithChildren, updateNavStatus} from '@/api/productCate'

  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    // brandId: null
  };
  export default {
    name: "productList",
    data() {
      return {
        editSkuInfo:{
          dialogVisible:false,
          productId:null,
          productSn:'',
          productAttributeCategoryId:null,
          stockList:[],
          productAttr:[],
          keyword:null
        },
        operates: [
          {
            label: "商品上架",
            value: "publishOn"
          },
          {
            label: "商品下架",
            value: "publishOff"
          },
          {
            label: "移入回收站",
            value: "recycle"
          }
        ],
        operateType: null,
        listQuery: {
          current: 1,
          size: 5
        },
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [],
        publishStatusOptions: [{
          value: 1,
          label: '上架'
        }, {
          value: 0,
          label: '下架'
        }],
        verifyStatusOptions: [{
          value: 1,
          label: '审核通过'
        }, {
          value: 0,
          label: '未审核'
        }]
      }
    },
    created() {
      this.getList();
      // this.getBrandList();
      // this.getProductCateList();
    },

    filters: {
      verifyStatusFilter(value) {
        if (value === 1) {
          return '审核通过';
        } else {
          return '未审核';
        }
      }
    },
    methods: {
      //获得SKU库存颜色、容量等数据
      getProductSkuSp(row, index) {
        let spData = JSON.parse(row.spData);
        if(spData!=null&&index<spData.length){
          return spData[index].value;
        }else{
          return null;
        }
      },
      //获得商品列表
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.resultParam.productPage.records;
          this.total = response.resultParam.productPage.total;
        });
      },
      //获得品牌列表
      // getBrandList() {
      //   fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
      //     this.brandOptions = [];
      //     let brandList = response.data.list;
      //     for (let i = 0; i < brandList.length; i++) {
      //       this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
      //     }
      //   });
      // },
      //获得商品分类列表
      // getProductCateList() {
      //   fetchListWithChildren().then(response => {
      //     let list = response.data;
      //     this.productCateOptions = [];
      //     for (let i = 0; i < list.length; i++) {
      //       let children = [];
      //       if (list[i].children != null && list[i].children.length > 0) {
      //         for (let j = 0; j < list[i].children.length; j++) {
      //           children.push({label: list[i].children[j].name, value: list[i].children[j].id});
      //         }
      //       }
      //       this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
      //     }
      //   });
      // },

      //编辑SKU库存弹出框
      handleShowSkuEditDialog(index,row){
        this.editSkuInfo.dialogVisible=true;
        this.editSkuInfo.productId=row.id;
        this.editSkuInfo.productSn=row.productSn;
        this.editSkuInfo.productAttributeCategoryId = row.productAttributeCategoryId;
        this.editSkuInfo.keyword=null;
        fetchSkuStockList(row.id,{keyword:this.editSkuInfo.keyword}).then(response=>{
          this.editSkuInfo.stockList=response.data;
        });
        if(row.productAttributeCategoryId!=null){
          fetchProductAttrList(row.productAttributeCategoryId,{type:0}).then(response=>{
            this.editSkuInfo.productAttr=response.data.list;
          });
        }
      },
      //弹出框内按sku编号搜索
      handleSearchEditSku(){
        fetchSkuStockList(this.editSkuInfo.productId,{keyword:this.editSkuInfo.keyword}).then(response=>{
          this.editSkuInfo.stockList=response.data;
        });
      },
      //编辑货品信息确定按钮
      handleEditSkuConfirm(){
        if(this.editSkuInfo.stockList==null||this.editSkuInfo.stockList.length<=0){
          this.$message({
            message: '暂无sku信息',
            type: 'warning',
            duration: 1000
          });
          return
        }
        this.$confirm('是否要进行修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          updateSkuStockList(this.editSkuInfo.productId,this.editSkuInfo.stockList).then(response=>{
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            this.editSkuInfo.dialogVisible=false;
          });
        });
      },
      //筛选搜索 查询结果
      handleSearchList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.resultParam.productPage.records;
          this.total = response.resultParam.productPage.total;
        });
      },
      //数据列表 添加
      handleAddProduct() {
        this.$router.push({name: 'add'});
        console.log("跳转")
      },
      //批量操作 确定按钮
      handleBatchOperate() {
        if(this.operateType==null){
          this.$errorMsg("请选择操作类型")
          return;
        }
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$errorMsg("请选择要操作的商品")
          return;
        }
        this.$msgBox('是否要进行该批量操作？').then(() => {
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].id);
          }
          switch (this.operateType) {
            case this.operates[0].value:
              this.updatePublishStatus(1,ids);
              break;
            case this.operates[1].value:
              this.updatePublishStatus(0,ids);
              break;
            case this.operates[2].value:
              this.recycle(1,ids);
              break;
            default:
              break;
          }
          this.getList();
        })
      },
      //分页
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      //列表选择框
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //列表开关
      listChange(){
        let ids = [];
        ids.push(row.id)
      },
      //上架开关
      handlePublishStatusChange(index, row) {
        let ids=[];
        ids.push(row.id)
        updatePublishStatus(
          {
            ids:ids,
            status:row.publishStatus,
          }
        ).then(response=>{
        });
      },
      updatePublishStatus(publishStatus, ids) {
        updatePublishStatus(
          {
            ids:ids,
            status:publishStatus,
          }
        ).then(response=>{
          this.getList();
        });
      },
      //新品开关
      handleNewStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        updateNewStatus({
            ids:ids,
            status:row.newStatus,
          }
        ).then(response=>{
        });
      },
      //推荐开关
      handleRecommendStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        updateRecommendStatus({
            ids:ids,
            status:row.recommandStatus,
          }
        ).then(response=>{
        });
      },
      //删除操作
      handleDelete(index, row){
        let ids = [];
        ids.push(row.id);
        updateDeleteStatus({ids:ids}).then(response => {
          if(response.status === 200){
            this.$refs[row.id].close();
          }
          this.getList();
        });
      },
      // 批量移入回收站
      recycle(index, ids) {
        console.log(ids)
        updateDeleteStatus({ids:ids}).then(response=>{
          this.getList();
        });
      },
      //编辑操作 跳转页面
      handleUpdateProduct(index,row){
        this.$router.push({path:'updateProduct',query:{id:row.id}});
      },
      //查看操作 跳转页面
      handleShowProduct(index,row){
        console.log("handleShowProduct",row);
      },
      // //查看审核详情
      // handleShowVerifyDetail(index,row){
      //   console.log("handleShowVerifyDetail",row);
      // },
      //查看日志
      handleShowLog(index,row){
        console.log("handleShowLog",row);
      },
      // 删除商品
      updateDeleteStatus(deleteStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('deleteStatus', deleteStatus);
        updateDeleteStatus(params).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
        });
        this.getList();
      }
    }
  }
</script>
<style></style>


