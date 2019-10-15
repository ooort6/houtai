<template>
  <a-modal
    title="材料申请"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
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
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', {rules: [{required: true, message: '请填写名称' }]}]" />
        </a-form-item>

        <a-form-item label="工程名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'project_id',
          {rules: [{ required: true, message: '请选择工程名称' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="Manager in ManagerList" :key="Manager.id">{{Manager.name}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="采购管理员" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'procurementManagerId',
          {rules: [{ required: true, message: '请选择采购管理员' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="Manager in ManagerList1" :key="Manager.id">{{Manager.realname}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上传">
          <a-upload
                    :fileList="fileList"
                    :remove="handleRemove"
                    :beforeUpload="beforeUpload"
                  >
                    <a-button v-if="fileList.length < 1">
                      <a-icon type="upload"  />上传文件
                    </a-button>
                  </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { debuglog } from 'util'
import { getMyProjectManager, getProcurementManager, } from '@/api/plan'
import {getMater} from '@/api/manage'


import axios from 'axios'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  data() {
    return {
      ManagerList: [],
      ManagerList1: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        }
      },
      visible: false,
      confirmLoading: false,
      date: '',
      date1: '',
      fileList: [],
      uploading: false,
      form: this.$form.createForm(this)
      // file
    }
  },
   inject:['getData'],
  methods: {
    normFile(e) {
      // this.file=e;
      // console.log('Upload event:', e)
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

      // console.log(this)
      this.form.validateFields((errors,values)=>{
        // console.log(values)
      // debugger;
        formData.append('name', values.name)
        formData.append('project_id', values.project_id)
        formData.append('procurementManagerId', values.procurementManagerId)

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
        .post('/api/procurementApplication/start', formData, {
          'Content-Type': 'multipart/form-data'
        })
        .then(res => {
          // debugger;
          if (res.data.status == 0) {
            this.fileList = []
            this.uploading = false
            this.$message.success('操作成功')
            this.getData();
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


    onChange(date, dateString) {
      this.date = dateString
    },
    onChange1(date, dateString) {
      this.date1 = dateString
    },
    add() {
      // debugger;
      getMyProjectManager().then(res => {
        this.ManagerList = res.data
      })

      getProcurementManager().then(res => {
        this.ManagerList1 = res.data
      })
      this.form.resetFields()
      this.visible = true
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          // console.log('values', values)
          setTimeout(() => {
            values.start_time = this.date
            values.should_complete_time = this.date1
            // debugger;

            //  const aa=values.start_time.valueOf();
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
