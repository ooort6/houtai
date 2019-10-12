<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="我的任务">
      <a-list size="large">
        <a-list-item :key="index" v-for="(item, index) in data">
          <div class="list-content">
            <div class="list-content-item" style="width:300px">
             <a-row>
                              <a-col :span="24" v-if="item.type==1">
                              <a-tag color="#1890FF">日常任务：</a-tag>
                              <span>{{ item.task_name }}</span>
                            </a-col>
                            <a-col  v-if="item.type==2">
                              <a-tag color="#f50">补缴任务：</a-tag>
                             <span>{{ item.task_name }}</span>
                            </a-col>
                            <a-col  v-if="item.type==3">
                              <a-tag color="#f00">修改任务：</a-tag>
                             <span>{{ item.task_name }}</span>
                            </a-col>
             </a-row>
            
             
             
            </div>
            <div class="list-content-item" style="width:300px">
              截止日期：<span>{{ item.should_complete_time | formatDate }}</span>
            </div>
            <div v-if="item.isBeOverdue==0" class="list-content-item" style="width:200px">
              状态：<span style="color:red">未完成</span>
            </div>
            <div v-if="item.isBeOverdue==1" class="list-content-item" style="width:200px">
              状态：<span style="color:red">逾期</span>
            </div>
            <div class="list-content-item" style="width:150px">
              <a-button
                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:15px;"
                type="primary"
                @click="showModal(item)"
              >详情</a-button>
             

               
            </div>
          </div>
        </a-list-item>
      </a-list>
 <a-modal v-model="visible2" :title="item.task_name" onOk="handleOk">
                <template slot="footer">
                  <a-button key="back" @click="handleCancel">关闭</a-button>
                  <a-button
                    type="primary"
                    @click="handleUpload"
                    :disabled="fileList.length === 0"
                    :loading="uploading"
                    style="margin-top: 16px"
                    key="submit"
                  >{{uploading ? 'Uploading' : '提交' }}</a-button>
                </template>
                <p>提交人：{{plan.user_name}}</p>
                <p>类型：{{plan.type_name}}</p>
               <p  v-if="item.type==3">修改原因：<span style="color:red">{{item.reason}}</span></p>
               <p  v-if="item.type==2">补缴原因：<span style="color:red">{{item.reason}}</span></p>
                <div v-if="item.isBeOverdue==0">
                 选择文件：
                  <a-upload
                    :fileList="fileList"
                    :remove="handleRemove"
                    :beforeUpload="beforeUpload"
                  >
                    <a-button v-if="fileList.length < 1">
                      <a-icon type="upload"  />Select File
                    </a-button>
                  </a-upload>
                </div>
              </a-modal>

               <a-modal  v-model="visible1" :title="item.task_name" onOk="handleOk1">
                 <template slot="footer">
                  <a-button key="back" @click="handleCancel">关闭</a-button>
                  <a-button
                    type="primary"
                    @click="handleUpload1"
                    :loading="uploading"
                    style="margin-top: 16px"
                    key="submit"
                  >确认</a-button>
                </template>
                <p>提交人：{{plan.user_name}}</p>
                <p>类型：{{plan.type_name}}</p>
                 <p style="color:red">此任务已逾期，请尽快联系老板</p>

              
              </a-modal>
      <!-- <task-form ref="taskForm" /> -->
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { getMytask, comPlete } from '@/api/plan'
// import reqwest from 'reqwest'
// import TaskForm from './modules/TaskForm'

import axios from 'axios'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'StandardList',
  components: {
    HeadInfo
    // TaskForm
  },
  data() {
    return {
      data: [],
      loading: false,
      visible2: false,
       visible1: false,
      item: {},
      fileList: [],
      uploading: false,
      plan:{}
    }
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '-' + MM + '-' + d +" "+ h+':'+m
    }
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload1(){
        this.uploading = false
          this.visible1 = false
    },
    handleUpload() {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        // debugger;
        formData.append('file', file)
      })
      this.uploading = true

      formData.append('taskId', this.item.id)

      // console.log(this.item.id)
      // console.log(formData.get('taskId'))

      axios.interceptors.request.use(
        function(config) {
          let token = Vue.ls.get(ACCESS_TOKEN)
          if (token) {
            config.headers.common['X-TOKEN'] = token
          }
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
      axios
        .post('/api/task/complete', formData, {
          'Content-Type': 'multipart/form-data'
        })
        .then(res => {
          // debugger;
          if (res.data.status == 0) {
            this.fileList = []
            this.uploading = false
            this.$message.success('上传成功')
            getMytask().then(res => {
              // console.log(res)
              this.data = res.data
              // debugger
            })
            this.visible2 = false
          } else {
            this.$message.error(res.message)
          }
        })

      // comPlete(formData).then(res=>{
      //   console.log(res)
      //   // debugger
      // })

      // setTimeout(() => {
      //     this.fileList = []
      //           this.uploading = false
      //           this.$message.success('upload successfully.');
      // }, 2000);

      // You can use any AJAX library you like
      // reqwest({
      //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      //   method: 'post',
      //   processData: false,
      //   data: formData,
      //   success: () => {
      //     this.fileList = []
      //     this.uploading = false
      //     this.$message.success('upload successfully.');
      //   },
      //   error: () => {
      //     this.uploading = false
      //     this.$message.error('upload failed.');
      //   },
      // });
    },
    showModal(e) {
      this.item = e;
      this.plan=e.plan
      // console.log(this.item.plan.id)
      // debugger
    e.isBeOverdue==0?this.visible2 = true:this.visible1 = true
      // this.visible = true
    },
    handleOk(e) {
      this.loading = true
      setTimeout(() => {
        this.visible2 = false
        this.loading = false
      }, 1000)
    },
        handleOk1(e) {
      this.loading = true
      setTimeout(() => {
        this.visible1 = false
        this.loading = false
      }, 1000)
    },
    handleCancel(e) {
      this.visible2 = false
        this.visible1 = false
    }
  },
  created() {
    getMytask().then(res => {
      // console.log(res)
      this.data = res.data
      // debugger
    })
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}
// /deep/ .ant-modal-mask{
//   background-color:none;
// }

.list-content-item {
  color: rgba(0, 0, 0, 0.65);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
