<template>
  <page-view>
    <a-card :bordered="false">
      <a-row :gutter="24">
        <!-- @add="handleAdd" -->
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div style="background-color: #fff;border:1px solid #eee; ">
            <a-row :gutter="16">
              <a-col :span="24">
                <a-card :bordered="false">
                  <a-row style="margin-bottom:1.5%">
                    <a-col :xl="20" :lg="20" :md="20" :sm="24" :xs="24">
                      <span
                        style="font-size:20px;font-weight:900;text-align:center;display:block"
                      >{{data.sysTask.task_name}}</span>
                    </a-col>
                    <!-- <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">2</a-col> -->
                  </a-row>

                  <a-row style="margin-bottom:1%" v-if="this.taskDefinitionKey!='checking'&&this.taskDefinitionKey!='checking1'">
                    <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
                      <span style="font-size:16px;font-weight:900">当前步骤：</span>
                      {{data.task.taskName}}
                    </a-col>
                    <!-- <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">2</a-col> -->

                    <a-col
                      v-if="taskDefinitionKey=='bossCheck'"
                      :xl="8"
                      :lg="8"
                      :md="8"
                      :sm="24"
                      :xs="24"
                    >
                      <a-button type="primary" @click="showModal">审核</a-button>
                    </a-col>

                    <a-col
                      v-if="taskDefinitionKey=='userCheckMoney'"
                      :xl="8"
                      :lg="8"
                      :md="8"
                      :sm="24"
                      :xs="24"
                    >
                      <a-button type="primary" @click="showModal2">操作</a-button>
                    </a-col>

                    <a-col
                      v-if="taskDefinitionKey=='procurementConfirm'"
                      :xl="8"
                      :lg="8"
                      :md="8"
                      :sm="24"
                      :xs="24"
                    >
                      <a-button type="primary" @click="showModal2">操作</a-button>
                    </a-col>

                    <a-col
                      v-if="taskDefinitionKey=='report'"
                      :xl="8"
                      :lg="8"
                      :md="8"
                      :sm="24"
                      :xs="24"
                    >
                      <a-button type="primary" @click="showModal1">操作</a-button>
                    </a-col>
                  </a-row>

                  <a-row style="margin-bottom:1.5%">
                    <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
                      <span>申请人：{{data.sysTask.create_username}}</span>
                    </a-col>
                    <!-- <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">2</a-col> -->
                  </a-row>

                  <a-row style="margin-bottom:1.5%">
                    <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
                      <span>申请时间：{{data.sysTask.create_time|formatDate}}</span>
                    </a-col>
                    <!-- <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">2</a-col> -->
                  </a-row>

                  <a-row style="margin-bottom:1.5%">
                    <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
                      <span>状态：{{data.materialcheck.status|statusFunc}}</span>
                    </a-col>
                    <!-- <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">2</a-col> -->
                  </a-row>
                  <a-card style="margin-bottom:1.5%">
                    <a-row>
                      <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
                        <span style="font-size:16px;font-weight:900">文件：</span>
                      </a-col>
                      <!-- <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">2</a-col> -->
                    </a-row>

                    <a-row style="margin-bottom:1.5%" v-for="item in data.fileList" :key="item.id">
                      <a-col :offset="1" :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
                        <span style>文件名：{{item.name}}</span>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
                        <span style>上传时间：{{item.create_time|formatDate}}</span>
                      </a-col>
                      <a-col :xl="7" :lg="7" :md="7" :sm="24" :xs="24">
                        <a @click="download(item.id)" style>下载</a>
                      </a-col>
                    </a-row>
                  </a-card>
                  <a-card>
                    <a-row style="margin-bottom:1.5%">
                      <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
                        <span style="font-size:16px;font-weight:900">流程步骤：</span>
                      </a-col>
                      <!-- <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">2</a-col> -->
                    </a-row>

                    <a-row
                      style="margin-bottom:1.5%"
                      v-for="item in data.commentList"
                      :key="item.id"
                    >
                      <a-col :offset="1" :xl="4" :lg="4" :md="4" :sm="24" :xs="24">
                        <span style>{{item.message|messageData}}</span>
                      </a-col>
                      <a-col :xl="11" :lg="11" :md="11" :sm="24" :xs="24">
                        <span style>{{item.message|messageData1}}</span>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
                        <span style>{{item.userId}}/{{item.time|formatDate}}</span>
                      </a-col>
                    </a-row>
                  </a-card>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-modal
      title="审核"
      :width="640"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="请选择" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group
            @change="onChange"
            v-decorator="['flag', {rules: [{required: true, message: '请选择是否通过' }]}]"
          >
            <a-radio value="通过">通过</a-radio>
            <a-radio value="不通过">不通过</a-radio>
            <a-radio value="核价">核价</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="display" label="选择人员" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'checkMoneyUser',
          {rules: [{ required: true, message: '请选择人员' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="Manager in ManagerList" :key="Manager.id">{{Manager.realname}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="批注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['comment', {rules: [{required: true, message: '请填写批注' }]}]" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      title="审核"
      :width="640"
      :visible="visible2"
      @ok="handleOk2"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel2"
    >
      <a-form :form="form">
        <a-form-item label="批注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['comment', {rules: [{required: true, message: '请填写批注' }]}]" />
        </a-form-item>
      </a-form>
    </a-modal>


    <a-modal
      title="操作"
      :width="640"
      :visible="visible1"
      @ok="handleOk1"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel1"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel1">关闭</a-button>
        <a-button
          type="primary"
          @click="handleUpload"
          :disabled="fileList.length === 0&&this.cancle==1"
          :loading="uploading"
          style="margin-top: 16px"
          key="submit"
        >{{uploading ? 'Uploading' : '提交' }}</a-button>
      </template>

      <a-form :form="form">
        <a-form-item label="请选择" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group
            @change="onChange1"
            v-decorator="['application', {rules: [{required: true, message: '请选择是否通过' }]}]"
          >
            <a-radio value="重新上传">重新上传</a-radio>
            <a-radio value="取消">取消</a-radio>
    
          </a-radio-group>
        </a-form-item>

            <a-form-item v-if="display1"  :labelCol="labelCol" :wrapperCol="wrapperCol" label="上传">
          <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
            <a-button v-if="fileList.length < 1">
              <a-icon type="upload" />上传文件
            </a-button>
          </a-upload>
        </a-form-item>


        <a-form-item label="批注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['comment', {rules: [{required: true, message: '请填写批注' }]}]" />
        </a-form-item>

    
      </a-form>
    </a-modal>
  </page-view>
</template>

<script>
import moment from 'moment'
import {
  getmyTask,
  getTaskDetail,
  check,
  preCheck,
  getAllPerson,
  bossCheck,
  procurementConfirm,
  checkMoneyCommit,
  historyCheck,
  checking
} from '@/api/plan'
import { debuglog } from 'util'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'

import axios from 'axios'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'TreeList',
  components: {
    // STable,
    PageView,
    HeadInfo
    // OrgModal
  },
  data() {
    return {
      data: [],
      ManagerList: [],
      taskName: '',
      task_name: '',
      taskId: '',
      taskDefinitionKey: '',
      ModalText: 'Content of the modal',
      visible: false,
      visible1: false,
      visible2: false,
      confirmLoading: false,
      display: false,
      display1: false,
      cancle:1,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      fileList: [],
      uploading: false,
      form: this.$form.createForm(this)
    }
  },
  filters: {
    formatDate: function(value) {
      if (value != null) {
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
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m
      } else {
        return ''
      }
    },
    messageData: function(value) {
      if (value != null) {
        var str = value.split('%')
        return str[0]
      }
    },
    messageData1: function(value) {
      if (value != null) {
        var str = value.split('%')
        return str[1]
      }
    },
    statusFunc: function(value) {
      if (value == 1) {
        return '待审核'
      } else if (value == 2) {
        return '通过'
      } else if (value == 3) {
        return '核价中'
      } else if (value == 4) {
        return '不通过'
      } else if (value == 5) {
        return '确认采购'
      }
    }
  },
  beforeCreate() {},

  watch: {
    $route(to, from) {
      //监听路由是否变化
      // console.log(to,from)
      if (to.name == 'check') {
        this.init()
        // this.$router.go(0);//重新加载数据
      }
    }
  },
  created() {
    this.init()
  },

  methods: {
    moment,
    normFile(e) {
      // this.file=e;
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },

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
    handleUpload1() {
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

      console.log(this)
      this.form.validateFields((errors, values) => {
        // console.log(values)
        // debugger;
        formData.append('application', values.application)
        formData.append('comment', values.comment)
        formData.append('taskId', this.taskId)
      })

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
        .post('/api/procurementApplication/projectCommit', formData, {
          'Content-Type': 'multipart/form-data'
        })
        .then(res => {
          // debugger;
          if (res.data.status == 0) {
            this.fileList = []
            this.uploading = false
            this.$message.success('上传成功')
            this.$router.push({ path: '/dashboard/content' })
            // this.init();
            // getMytask().then(res => {
            //   // console.log(res)
            //   this.data = res.data
            //   // debugger
            // })
            this.visible = false
          } else {
            this.$message.error(res.message)
          }
        })
    },
    onChange(e) {
      if (e.target.value == '核价') {
        this.display = true
      } else {
        this.display = false
      }

      console.log('radio checked', e.target.value, this.display)
    },
        onChange1(e) {
      if (e.target.value == '取消') {
        this.display1 = false
        this.cancle = 0
      } else {
        this.display1 = true
          this.cancle = 1
      }

      console.log('radio checked', e.target.value, this.display)
    },
    showModal() {
      this.display = false
      this.visible = true
      this.form.resetFields()
      getAllPerson().then(res => {
        this.ManagerList = res.data
      })
    },
      showModal1() {
      this.display1 = false
      this.visible1 = true
      this.form.resetFields()
  
    },
    showModal2() {
      this.visible2 = true
      this.form.resetFields()
    },
    handleOk(e) {
      const {
        form: { validateFields }
      } = this
      // this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          setTimeout(() => {
            values.taskId = this.taskId
            console.log(values)

            bossCheck(values).then(res => {
              console.log(res)
              if (res.status == 0) {
                this.visible = false

                this.$message.info('审核成功')
                this.$router.push({ path: '/dashboard/content' })
              } else {
                this.confirmLoading = false
                this.$message.error(res.message)
              }
            })

            // this.confirmLoading = false
          }, 2000)
        }
      })
    },


    handleOk1(e) {
      const {
        form: { validateFields }
      } = this
      // this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          setTimeout(() => {
            values.taskId = this.taskId
            console.log(values)

            bossCheck(values).then(res => {
              console.log(res)
              if (res.status == 0) {
                this.visible = false

                this.$message.info('审核成功')
                this.$router.push({ path: '/dashboard/content' })
              } else {
                this.confirmLoading = false
                this.$message.error(res.message)
              }
            })

            // this.confirmLoading = false
          }, 2000)
        }
      })
    },

    handleOk2(e) {
      const {
        form: { validateFields }
      } = this
      // this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          setTimeout(() => {
            values.taskId = this.taskId
            console.log(values)
            if (this.taskDefinitionKey == 'procurementConfirm') {
              procurementConfirm(values).then(res => {
                console.log(res)
                if (res.status == 0) {
                  this.confirmLoading = false
                  this.visible2 = false
                  //  this.confirmLoading = false
                  this.$message.info('操作成功')
                  this.$router.push({ path: '/dashboard/content' })
                } else {
                  this.confirmLoading = false
                  this.$message.error(res.message)
                }
              })
            } else if (this.taskDefinitionKey == 'userCheckMoney') {
              checkMoneyCommit(values).then(res => {
                console.log(res)
                if (res.status == 0) {
                  this.confirmLoading = false
                  this.visible2 = false
                  //  this.confirmLoading = false
                  this.$message.info('操作成功')
                  this.$router.push({ path: '/dashboard/content' })
                } else {
                  this.confirmLoading = false
                  this.$message.error(res.message)
                }
              })
            }

            // this.confirmLoading = false
          }, 2000)
        }
      })
    },
    download(e) {
      // console.log(e)
      let zt = window.localStorage.getItem('pro__Access-Token')
      // console.log(zt)
      const zt1 = JSON.parse(zt)
      const api = this.$common.getFileUrl() + 'file/downloadTaskFile?fileId='

      // debugger
      let btn = document.createElement('a')
      btn.setAttribute('download', 'filename') // download属性
      btn.setAttribute('href', api + e + '&zt=' + zt1.value) // href链接
      btn.click() // 自执行点击事件
    },

    handleCancel(e) {
      // console.log('Clicked cancel button')
      this.visible = false
    },
        handleCancel1(e) {
      // console.log('Clicked cancel button')
      this.visible1 = false
    },
    handleCancel2(e) {
      // console.log('Clicked cancel button')
      this.visible2 = false
    },

    init() {
      this.taskId = this.$route.query.taskId
      this.taskDefinitionKey = this.$route.query.taskDefinitionKey

      console.log(this.taskId)
      const query = {
        taskId: this.taskId
      }
        const query1 = {
        sysTaskId: this.taskId
      }
        const query2 = {
        piId: this.taskId
      }
    if(this.taskDefinitionKey=="checking"){
        historyCheck(query2).then(res=>{
            this.data = res.data
        })
    }else if(this.taskDefinitionKey=="checking1"){
      checking(query1).then(res => {
        // debugger;

        this.data = res.data
        // this.taskName = this.data.task.taskName
        // this.task_name = this.data.sysTask.task_name

        console.log(this.data)
      })
    }
    else {
       preCheck(query).then(res => {
        // debugger;

        this.data = res.data
        // this.taskName = this.data.task.taskName
        // this.task_name = this.data.sysTask.task_name

        console.log(this.data)
      })
    }

    }
  }
}
</script>

<style lang="less" scoped>
.custom-tree {
  /deep/ .ant-menu-item-group-title {
    position: relative;
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .ant-menu-item {
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .btn {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    width: 20px;
    height: 40px;
    line-height: 40px;
    z-index: 1050;

    &:hover {
      transform: scale(1.2);
      transition: 0.5s all;
    }
  }
}
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

// .aa{
//   color: red;
//   &hover{
//     color: red;
//   }
// }

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  width: 280px;
  :hover {
    color: #1890ff;
  }
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