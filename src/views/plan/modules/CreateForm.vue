<template>
  <a-modal
    title="制定计划"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="任务名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', {rules: [{required: true, message: '请填写姓名' }]}]" />
        </a-form-item>
        <a-form-item label="周期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'cycle',
          {rules: [ {required: true, message: '请选择周期' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="cycle in cycleList" :key="cycle.id">{{cycle.cycle_name}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'type',
          {rules: [ {required: true, message: '请选择类型' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="type in typeList" :key="type.id">{{type.type_name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="提交人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'complete_user',
          {rules: [ {required: true, message: '请选择提交人' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="user in userList" :key="user.id">{{user.realName}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="完成时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'complete_time',
          {rules: [ {required: true, message: '请选择完成时间' }]}
        ]"
            placeholder
          >
            <a-select-option v-for="time in timeList" :key="time.id">{{time.time}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { debuglog } from 'util'
import {getInitData} from '@/api/plan'
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

      form: this.$form.createForm(this),
      timeList: [ {
        "id": 12,
        "time": "12:00"
      },
      {
        "id": 18,
        "time": "18:00"
      },
      {
        "id": 22,
          "time": "22:00"
      },],
      userList: [],
      typeList: [],
      cycleList: []
    }
  },
  methods: {
    add() {
      getInitData().then(res=>{
      this.userList=res.data.userList;
      this.typeList=res.data.typeList;
      this.cycleList=res.data.cycleList;
      })
      // debugger;
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
