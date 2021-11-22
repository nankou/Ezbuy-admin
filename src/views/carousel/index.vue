<template>
  <card ref="Card" class="box-card" id="Carousel">
    <div slot="header" class="clearfix">
      <el-button type="primary" class="el-icon-upload2 " @click="add">上传</el-button>
    </div>
    <div>
      <el-table v-loading="isTableLoading" :data="formData" @selection-change="getSelected">
        <el-table-column prop="sort" label="序号" sortable></el-table-column>
        <el-table-column label="缩略图">
          <template slot-scope="scope">
            <div style="text-align: center; margin-bottom: 20px;width: 150px;height: 100px">
              <el-image :src="'http://192.168.0.128:8080'+scope.row.name"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sundryId" label="商品编号" sortable></el-table-column>
        <el-table-column label="创建时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
            <delete-button
                :ref="scope.row.id"
                :id="scope.row.id"
                @start="delPicture"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        :title="form.name===''?'轮播图上传':'轮播图编辑'"
        width="400px"
        :visible.sync="visible"
        @close="cancel"
        :close-on-click-modal="false">
      <add-carousel ref="AddCarousel" @input="input" :value="(form.name+'')"></add-carousel>
      <div class="el-row" style="max-width: 320px;margin-top: 10px;">
        <div class="col el-col-4" style="line-height: 32px;">编号：</div>
        <div class="col el-col-20">
          <el-input placeholder="在此输入商品编号" v-model="form.sundryId"/>
        </div>
      </div>
      <div class="el-row" style="max-width: 320px;margin-top: 10px;">
        <div class="col el-col-4" style="line-height: 32px;">排序：</div>
        <div class="col el-col-20">
          <el-input placeholder="在此输入轮播图序号" v-model="form.sort"/>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <submit-button ref="SubmitButton" v-if="form.id===''" @submit="slideShowAdd"/>
        <submit-button ref="SubmitButton" v-else @submit="slideShowEdit"/>
      </div>
    </el-dialog>

  </card>
</template>

<script>
  import {
    listPictureApi,
    delPictureApi,
    slideShowAddApi,
    slideShowGetApi,
    slideShowDelApi,
    slideShowUpdateApi
  } from '@/api/carousel'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Carousel",
    props: {
      pathString: {
        type: String,
        default: ""
      }
    },
    components: {AddCarousel: () => import("../../components/ImageUploaderPlus/index")},
    data() {
      return {
        visible: false,
        isTableLoading: false,
        isDeleteMoreDisabled: true,
        formData: [],
        searchType: '0',
        searchPictureName: '',
        form: {
          id: '',
          sort: '',
          name: '',
          sundryId: '',
          type: 1,
          sundryType: 1,
          carouselUrl: ''
        },
        type: 1
      }
    },
    mounted() {
      this.slideShowGet()
    },
    computed: {
      url() {
        // return process.env.VUE_APP_BASE_API +'/'+ this.form.url
      }
    },
    methods: {
      //获取轮播图
      slideShowGet() {
        slideShowGetApi().then(response => {
          this.formData = response.resultParam.pictureList;
        }).catch(error => {
        })
      },
      //取消编辑
      cancel() {
        this.visible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['AddCarousel'].clearFiles();
      },
      //上传轮播图
      add() {
        this.visible = true
      },
      //编辑
      edit(row) {
        objectEvaluate(this.form, row);
          this.visible = true;
      },
      input(res) {
        this.form.url = res
        this.form.name = res
      },
      getSelected(array) {
        this.deleteList = array.map(item => item.id);
        this.isDeleteMoreDisabled = array.length === 0;
      },
      deleteMorePicture() {
        this.$msgBox('确定批量删除操作吗？').then(() => {
          slideShowDelApi({'ids[]': this.deleteList}).then(() => {
            this.slideShowGet()
          })
        })
      },
      delPicture(id) {
        slideShowDelApi({'id': id}).then(response => {
          this.$refs[id].close();
          this.slideShowGet();
        }).catch(error => {
          this.$refs[id].stop();
        })
      },
      //添加轮播图
      slideShowAdd() {
        let data = {...this.form};
        delete data.id;
        slideShowAddApi(data).then(response => {
          this.visible = false;
          this.slideShowGet()
        }).catch(error => {
        })
      },
      //编辑轮播图
      slideShowEdit() {
        let data = {...this.form};
        slideShowUpdateApi(data).then(response => {
          this.visible = false;
          this.slideShowGet()
        }).catch(error => {
        })
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

    }
  }
</script>

<style lang="scss">
  .el-table-filter__wrap.el-scrollbar__wrap {
    margin-bottom: 0 !important;
  }

  #Carousel {

  }
</style>
