<template>
  <a-modal
    title="开通账户"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="工程名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules: [{required: true, message: '请填写工程名称' }]}]" />
        </a-form-item>
    

     <a-form-item
          label="项目经理"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-select
        v-decorator="[
          'duty_user',
          {rules: [{ required: true, message: '请选择项目经理' }]}
        ]"
        placeholder=""
      >
         <a-select-option v-for="Manager in ManagerList" :key="Manager.id">{{Manager.realname}}</a-select-option>
      </a-select>
        </a-form-item>



      <a-form-item
            v-bind="formItemLayout"
            label="开始时间"
          >
            <a-date-picker 
             @change="onChange"
            v-decorator="['start_time',{rules: [{required: true, message: '请选择开始时间' }]}]" />
          </a-form-item>


      <a-form-item
            v-bind="formItemLayout"
            label="预计完成时间"
          >
            <a-date-picker 
             @change="onChange1"
            v-decorator="['should_complete_time',{rules: [{required: true, message: '请选择预计完成时间' }]}]" />
          </a-form-item>

         <a-form-item
          label="状态"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
  <a-select
        v-decorator="[
          'status',
          {rules: [{ required: true, message: '请选择状态' }]}
        ]"
        placeholder=""
      >
        <a-select-option value="0">
          招标中
        </a-select-option>
        <a-select-option value="1">
        施工中
        </a-select-option>
           <a-select-option value="2">
        停止
        </a-select-option>
           <a-select-option value="3">
        完结
        </a-select-option>
      </a-select>
         </a-form-item>





       
        
         
           
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { debuglog } from 'util';
import {getProjectManager} from '@/api/plan'
export default {
  data () {
    return {
      ManagerList: [],
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
      },
      },
      visible: false,
      confirmLoading: false,
date:'',
date1:'',
      form: this.$form.createForm(this)
    }
  },
  methods: {
      onChange(date, dateString) {
      this.date = dateString
      },
          onChange1(date, dateString) {
      this.date1 = dateString
      },
    add () {
      // debugger;
      getProjectManager().then(res=>{
        // debugger;
          this.ManagerList=res.data;
      })
       this.form.resetFields();
      this.visible = true
      
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          // console.log('values', values)
          setTimeout(() => {
            values.start_time=this.date;
             values.should_complete_time=this.date1;
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
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
