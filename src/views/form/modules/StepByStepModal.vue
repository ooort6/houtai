<template>
  <a-modal
    title="修改用户信息"
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
          <a-input  v-decorator="['realname', {initialValue: this.record.realname ,rules: [{required: true, message: '请填写姓名' }]}]" />
        </a-form-item>
        <a-form-item
          label="性别"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-select
  
            v-decorator="[
          'sex',
          {initialValue:this.record.sex ,rules: [ {required: true, message: '请选择性别' }]}
        ]"
        placeholder=""
      >
      <a-select-option v-for="(sex,index) in provinceData" :key="index+1"  >{{sex}}</a-select-option>
      </a-select>
        </a-form-item>

          <a-form-item
          label="手机号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['phone', {initialValue: this.record.phone ,rules: [{required: true, message: '请填写手机号' }]}]" />
        </a-form-item>
            <a-form-item
          label="职位"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['position', {initialValue: this.record.position ,rules: [{required: true, message: '请填写职位' }]}]" />
        </a-form-item>
            <!-- <a-form-item
          label="登录账号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['username', {rules: [{required: true, message: '请填写登录账号' }]}]" />
        </a-form-item> -->
            <a-form-item
          label="登录密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input   placeholder="如需修改，请填写新密码" v-decorator="['password', {rules: [{min: 6, message: '请输入至少六位数密码' }]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
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
realname:'',
      form: this.$form.createForm(this),
      id:'',
      record:{},
      provinceData : ['男', '女']
    }
  },
  methods: {
    edit (record) {
      console.log(record.id)
      this.id=record.id
      
      this.record=record;
      // if(this.record.sex==1){
      //   this.record.sexs="男"
      // }else{
      //   this.record.sexs="女"

      // }
        // debugger;
      // this.realname=record.realname;
      // console.log(this.form)
      // this.form.setFieldsValue({realname: record.realname});
      // debugger;
      // debugger

       this.form.resetFields();
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {

        if (!errors) {
          console.log('values', values)
          // values.id=this.id;
          // if(values.sex=='男'){
          //       values.sex=1
          //   }else{
          //     values.sex=2
          //   }
          setTimeout(() => {
            //  console.log(this.id)
// debugger;
            values.id=this.id
           
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
