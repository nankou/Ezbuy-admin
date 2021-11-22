<!--<template>
    <div id="home" :style="'height:' + (mainHeight - 30) + 'px'" v-show="isShow">
        <h1 class="title">言商商城后台管理系统</h1>
    </div>
</template>

<script>
    const elementResizeDetectorMaker = require("element-resize-detector");
    let mainResizeListen = elementResizeDetectorMaker();

    export default {
        name: "Home",
        data() {
            return {
                mainHeight: 0,
                isShow: false
            };
        },
        mounted() {
            this.addListen();
        },
        methods: {
            addListen() {
                let main = document.querySelector(".main");
                this.mainHeight = main.offsetHeight;
                this.isShow = true;
                mainResizeListen.listenTo(main, () => {
                    this.$nextTick(() => {
                        this.mainHeight = main.offsetHeight;
                    });
                });
            }
        },
        beforeDestroy() {
            let main = document.querySelector(".main");
            mainResizeListen.uninstall(main);
        }
    };
</script>

<style lang="scss">
    #home {
        -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        background: url("../../assets/home.jpg") no-repeat center center;
        background-size: cover;

        .title {
            padding-top: 120px;
            color: beige;
            font-size: 60px;
            font-family: 华文楷体;
            text-align: center;
        }
    }
</style>-->


<template>
  <card ref="Card">
    <div slot="header">
      <el-button type="success" @click="objectEvaluate">赋值</el-button>
      <el-button type="danger" @click="reset">重置</el-button>
      <submit-button ref="SubmitButton" @submit="submit"/>
      <el-button class="float-right" @click="stop">停止</el-button>
      <el-button class="float-right" @click="start">旋转</el-button>
      <Clipboard :text='token' class="float-right">
        <el-button type="warning">点击复制Token</el-button>
      </Clipboard>
    </div>
    <el-form :model="form" :rules="rules" ref="Form" label-width="150px">
      <row-col>
        <el-form-item label="上传单张图片" prop="image">
          <image-uploader v-model="form.image"/>
        </el-form-item>
        <el-form-item label="上传视屏" prop="video">
          <video-uploader v-model="form.video"/>
        </el-form-item>
        <el-form-item slot="r" label="上传单张图片(剪辑)" prop="imagePlus">
          <image-uploader-plus v-model="form.imagePlus"/>
        </el-form-item>
        <el-form-item slot="r" label="上传多张图片" prop="moreImage">
          <image-uploader-batch v-model="form.moreImage"/>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="日期" prop="start">
          <date-time-picker :start.sync="form.start" :end.sync="form.end"/>
        </el-form-item>
        <el-form-item slot="r" label="地区" prop="province">
          <region-select :province.sync="form.province" :city.sync="form.city" :area.sync="form.area"/>
        </el-form-item>
      </row-col>
      <el-row>
        <el-col :span="8">
          <el-form-item label="选择部门" prop="dept">
            <tree-select :tree="tree" v-model="form.dept"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="输入职业" prop="job">
            <input-search v-model="form.job"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择职业" prop="jobId">
            <search-select v-model="form.jobId"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="内容" prop="content">
        <custom-editor v-model="form.content"/>
      </el-form-item>
    </el-form>
  </card>
</template>

<script>
  import ImageUploader from '@/components/ImageUploader';
  import ImageUploaderPlus from '@/components/ImageUploaderPlus';
  import ImageUploaderBatch from '@/components/ImageUploaderBatch';
  import VideoUploader from '@/components/VideoUploader';
  import DateTimePicker from '@/components/DateTimePicker';
  import RegionSelect from '@/components/RegionSelect';
  import TreeSelect from '@/components/TreeSelect';
  import InputSearch from '@/components/InputSearch';
  import SearchSelect from '@/components/SearchSelect';
  import CustomEditor from '@/components/CustomEditor';
  import Clipboard from "@/components/Clipboard";
  import {objectEvaluate, resetForm} from "@/utils/common";

  export default {
    name: "Home",
    components: {
      ImageUploader, ImageUploaderPlus, ImageUploaderBatch,
      VideoUploader, DateTimePicker, RegionSelect, TreeSelect,
      InputSearch, SearchSelect, CustomEditor, Clipboard
    },
    data() {
      return {
        tree: [{
          id: 1,
          name: '总部',
          children: [{
            id: 2,
            name: '分部'
          }]
        }],
        obj: {
          image: '/dragon/file/20200702/image/ff932d09-ffe7-4f89-af70-1f04078bd3b8.jpg',
          imagePlus: '/dragon/file/20200702/image/7d242c8a-0db4-4007-a963-bd4550b0c511.jpg',
          moreImage: '/dragon/file/20200702/image/c272eb54-de10-4556-bc67-2ce4bf9e42a9.jpg,/dragon/file/20200702/image/79aa4d21-fc93-4e83-a9cf-2621c4ce97ba.jpg',
          video: '/dragon/file/20200702/video/17fb396f-79b7-42a0-805d-fec097d685f1.mp4',
          start: '2020-07-16 12:01:02',
          end: '2020-08-17 21:02:16',
          province: '广东省',
          city: '广州市',
          area: '花都区',
          dept: 2,
          job: '董事长',
          content: '<p style="text-align: center;"><strong>富文本</strong></p>',
        },
        form: {
          image: '',
          imagePlus: '',
          moreImage: '',
          video: '',
          start: '',
          end: '',
          province: '',
          city: '',
          area: '',
          dept: null,
          job: '',
          jobId: '',
          content: '',
        },
        rules: {
          image: {required: true, message: '请上传图片', trigger: 'change'},
          imagePlus: {required: true, message: '请上传图片', trigger: 'change'},
          moreImage: {required: true, message: '请至少上传一张图片', trigger: 'change'},
          video: {required: true, message: '请上传视频', trigger: 'change'},
          start: {required: true, message: '请选择日期', trigger: 'change'},
          province: {required: true, message: '请选择地区', trigger: 'change'},
          dept: {required: true, message: '请选择部门', trigger: 'change'},
          job: {required: true, message: '请输入职业', trigger: 'change'},
          jobId: {required: true, message: '请选择职业', trigger: 'change'},
          content: {required: true, message: '请输入内容', trigger: 'change'},
        }
      }
    },
    computed: {
      token() {
        return this.$storeGet.token
      }
    },
    methods: {
      start() {
        this.$refs.Card.start();
      },
      stop() {
        this.$refs.Card.stop();
      },
      objectEvaluate() {
        objectEvaluate(this.form, this.obj) // 对象赋值
      },
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            this.$refs.SubmitButton.start();
            setTimeout(() => {
              this.$refs.SubmitButton.stop();
              console.log(this.form);
              this.reset();
              this.$successMsg('提交成功')
            }, 2000)
          } else {
            return false;
          }
        });
      },
      reset() {
        resetForm(this) // 重置表单
      }
    }
  };
</script>
