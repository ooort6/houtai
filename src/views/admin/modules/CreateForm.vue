<template>
  <a-modal
    title="汇总上报"
    :width="940"
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
        :disabled="fileList.length === 0||applicationIds.length===0"
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

        <!-- <a-form-item label="工程名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'project_id',
          {rules: [{ required: true, message: '请选择工程名称' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="Manager in ManagerList" :key="Manager.id">{{Manager.name}}</a-select-option>
          </a-select>
        </a-form-item>-->

        <a-form-item label="老板" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'bossId',
          {rules: [{ required: true, message: '请选择老板' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="Manager in ManagerList1" :key="Manager.id">{{Manager.realname}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上传">
          <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
            <a-button v-if="fileList.length < 1">
              <a-icon type="upload" />上传文件
            </a-button>
          </a-upload>
        </a-form-item>
        <!-- <a-form-item label="选择申请" :labelCol="labelCol" :wrapperCol="wrapperCol"></a-form-item> -->
        <a-table
          rowKey="id"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :dataSource="data"
          :pagination="false"
          :scroll="{ y: 240 }"
        >
         <span slot="action" slot-scope="text, record">
                        <!-- <a href="javascript:;" @click="handleEdit(record)">修改</a>
                        <a-divider type="vertical" />-->
                        <a href="javascript:;" style="color:#1890FF" @click="download(record)">下载</a>
                      </span>
        </a-table>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { debuglog } from 'util'
import { getMyProjectManager, getProcurementManager, getboss, getMyPassApplicationList, startGo } from '@/api/plan'
import { getMater } from '@/api/manage'

import axios from 'axios'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const formatterTime = val => {
  return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''
}
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
      id1: {},
      visible: false,
      confirmLoading: false,
      date: '',
      date1: '',
      fileList: [],
      uploading: false,
      form: this.$form.createForm(this),
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          width: 150
        },
        {
          title: '工程',
          dataIndex: 'project_name',
          width: 150
        },
        {
          title: '申请人',
          dataIndex: 'report_username',
          width: 150
        },
        {
          title: '申请时间',
          dataIndex: 'report_time',
          width: 150,
          customRender: (text, row, index) => {
            return formatterTime(text)
          }
        },
        { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }

      ],
      data: [],
      applicationIds: [],
      loading: false,
    selectedRowKeys:[]
      // file
    }
  },
  inject: ['getData'],
  computed: {
    // rowSelection() {
    //   const { selectedRowKeys } = this
    //   return {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         // selectedRowKeys=[]
    //       this.applicationIds = selectedRowKeys
    //       // this.selectedRowKeys = selectedRowKeys
    //       console.log('selectedRowKeys: ',selectedRowKeys, 'selectedRows: ', selectedRows);
    //     },
    //     getCheckboxProps: record => ({
    //       props: {
    //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //         name: record.name
    //       }
    //     })
    //   }
    // }
  },
  methods: {

      onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
       this.applicationIds = selectedRowKeys
    },
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

      // console.log(this)
      this.form.validateFields((errors, values) => {
        // console.log(this)
        // debugger;
        if (!errors) {
          formData.append('name', values.name)
          formData.append('bossId', values.bossId)
          formData.append('applicationIds ', this.applicationIds)

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
            .post('/api/procurementCheck/start', formData, {
              'Content-Type': 'multipart/form-data'
            })
            .then(res => {
              // debugger;
              if (res.data.status == 0) {
                this.fileList = []
                
                this.uploading = false
                this.$message.success('操作成功')
                this.getData()
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
         
        }
        else{
      this.uploading = false;

        }
      })

      // console.log(this.item.id)
      // console.log(formData.get('taskId'))

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

    // handleRemove(file) {
    //   const index = this.fileList.indexOf(file)
    //   const newFileList = this.fileList.slice()
    //   newFileList.splice(index, 1)
    //   this.fileList = newFileList
    // },
    // beforeUpload(file) {
    //   this.fileList = [...this.fileList, file]
    //   return false
    // },
    // handleUpload1() {
    //   this.uploading = false
    //   this.visible1 = false
    // },
    // handleUpload() {
    //   const {
    //     form: { validateFields }
    //   } = this
    //     const { fileList } = _this
    //     const formData = new FormData()
    //   this.confirmLoading = true
    //   validateFields((errors, values) => {
    //     if (!errors) {
    //       console.log('values', values)
    //       setTimeout(() => {
    //         _this.  fileList.forEach(file => {
    //     // debugger;
    //     formData.append('file', file)
    //   })

    //         this.visible = false
    //         this.confirmLoading = false
    //         this.$emit('ok', values)
    //       }, 1500)
    //     } else {
    //       this.confirmLoading = false
    //     }
    //   })

    //   // const { fileList } = this
    //   // const formData = new FormData()
    //   // fileList.forEach(file => {
    //   //   // debugger;
    //   //   formData.append('file', file)
    //   // })
    //   // this.uploading = true

    //   // // formData.append('taskId', this.item.id)
    //   // console.log(2)
    // },

    onChange(date, dateString) {
      this.date = dateString
    },
    onChange1(date, dateString) {
      this.date1 = dateString
    },
    download(e) {
      // console.log(e.last_file.id)
      // debugger;
      let zt = window.localStorage.getItem('pro__Access-Token')
      // console.log(zt)
      const zt1 = JSON.parse(zt)
      const api = this.$common.getFileUrl() + 'file/downloadTaskFile?fileId='

      // debugger
      let btn = document.createElement('a')
      btn.setAttribute('download', 'filename') // download属性
      btn.setAttribute('href', api + e.last_file.id + '&zt=' + zt1.value) // href链接
      btn.click() // 自执行点击事件
    },

    add() {
      // debugger;
    
      getMyProjectManager().then(res => {
        this.ManagerList = res.data
      })

      getboss().then(res => {
        this.ManagerList1 = res.data
      })

      getMyPassApplicationList().then(res => {
        // debugger;
        this.data = res.data
      })
this.selectedRowKeys=[]
      this.form.resetFields()
      // const index = this.fileList.indexOf(file)
      // const newFileList = this.fileList.slice()
      // newFileList.splice(0, 1)
      // this.fileList = newFileList
      // console.log(this.fileList)
      // debugger;
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
