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
          label="姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['realname', {rules: [{required: true, message: '请填写姓名' }]}]" />
        </a-form-item>
        <a-form-item
          label="性别"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-select
        v-decorator="[
          'sex',
          {rules: [{ required: true, message: '请选择性别' }]}
        ]"
        placeholder=""
      >
        <a-select-option value="1">
          男
        </a-select-option>
        <a-select-option value="2">
         女
        </a-select-option>
      </a-select>
        </a-form-item>

          <a-form-item
          label="手机号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['phone', {rules: [{required: true, message: '请填写手机号' }]}]" />
        </a-form-item>
            <a-form-item
          label="职位"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['position', {rules: [{required: true, message: '请填写职位' }]}]" />
        </a-form-item>
            <a-form-item
          label="登录账号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['username', {rules: [{required: true, message: '请填写登录账号' }]}]" />
        </a-form-item>
            <a-form-item
          label="登录密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input  v-decorator="['password', {rules: [{required: true,min: 6, message: '请输入至少六位数密码' }]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { debuglog } from 'util';
export default {
  data () {
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

      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      // debugger;
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
