<template>
  <a-modal
    title="修改工程信息"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- <a-form-item label="工程名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['name', {initialValue: this.record.name ,rules: [{required: true, message: '请填写工程名称' }]}]"
          />
        </a-form-item> -->

        <a-form-item label="项目经理" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'duty_user',
          {initialValue:this.record.duty_user ,rules: [ {required: true, message: '请选择项目经理' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="Manager in ManagerList" :key="Manager.id">{{Manager.realname}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label="开始时间">
          <a-date-picker
          @change="onChange"
            v-decorator="['start_time',{initialValue: moment(this.date,'YYYY-MM-DD') , rules: [{required: true, message: '请选择开始时间' }]}]"
          />
        </a-form-item>

        <a-form-item
       
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预计完成时间"
        >
          <a-date-picker
             @change="onChange1"
            v-decorator="['should_complete_time',{initialValue: moment(this.date1,'YYYY-MM-DD') , rules: [{required: true, message: '请选择开始时间' }]}]"
          />
        </a-form-item>
        <!-- <a-form-item
          label="状态"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
  <a-select
        v-decorator="[
          'status',
          {initialValue:this.record.status ,rules: [{ required: true, message: '请选择状态' }]}
        ]"
        placeholder=""
      >
      <a-select-option v-for="(status,index) in provinceData" :key="index+1"  >{{status}}</a-select-option>
      
      </a-select>
        </a-form-item>-->

        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'status',
          {initialValue:this.record.status ,rules: [ {required: true, message: '请选择状态' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="(status,index) in provinceData" :key="index">{{status}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { getProjectManager } from '@/api/plan'

export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      realname: '',
      form: this.$form.createForm(this),
      id: '',
      date: '',
      date1: '',
      date2: '',
      date3: '',
      record: {},
      provinceData: ['招标中', '施工中', '停止', '完结'],
      ManagerList: []
    }
  },
  methods: {
    moment,
    onChange(date, dateString) {
      // debugger;
      this.date2 = dateString
    },
    onChange1(date, dateString) {
      this.date3 = dateString
    },
    edit(record) {
      console.log(record.id)
      this.id = record.id
      this.record = record
      this.date = this.formatDate(new Date(this.record.start_time))
      this.date1 = this.formatDate(new Date(this.record.should_complete_time))
      getProjectManager().then(res => {
        this.ManagerList = res.data
      })

      this.form.resetFields()
      this.visible = true
    },

    formatDate(now) {
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      var hour = now.getHours()
      var minute = now.getMinutes()
      var second = now.getSeconds()
      return year + '-' + month + '-' + date
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          values.id=this.id;
          // if(values.sex=='男'){
          //       values.sex=1
          //   }else{
          //     values.sex=2
          //   }
          setTimeout(() => {
            //  console.log(this.id)
            // debugger;
            // values.id = this.id
            values.start_time = this.date2
            values.should_complete_time = this.date3

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
