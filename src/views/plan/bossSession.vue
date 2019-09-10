<template>
  <page-view>
    <a-card :bordered="false">
      <a-row>
        <!-- @add="handleAdd" -->
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div style="background-color: #fff;border:1px solid #eee; ">
            <a-row>
              <a-col :span="24">
                <a-card :bordered="false">
                  <a-row>
                    <a-col :span="18"></a-col>
                    <a-col :span="6">
                      <!-- <div style=" cursor: pointer;" >
                        <a-icon
                          type="plus-circle"
                          style="font-size:18px;color:#1890FF;margin-right:1%"
                        />
                        <span style="font-size:18px">发起会话</span>

                      </div>-->
                      <a-button
                        @click="showModal1()"
                        style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));
border-radius:10px;color:#fff;"
                      >
                        <a-icon
                          type="plus-circle"
                          style="font-size:18px;color:#fff;margin-right:1%"
                        />发起会话
                      </a-button>
                    </a-col>
                  </a-row>
                  <div class="tab_1">
                    <a-tabs style defaultActiveKey="1" @change="callback">
                      <a-tab-pane style :tab="count" key="1">
                        <a-col :gutter="16" :span="24">
                          <a-table
                            :columns="columns"
                            rowKey="id"
                            :pagination="false"
                            :dataSource="data"
                          >
                            <span slot="action" slot-scope="text, record">
                              <a href="javascript:;" @click="showModal(record)">详情</a>
                            </span>
                            <!-- <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.description}}</p> -->
                          </a-table>

                          <create-form ref="createModal" @ok="handleOk" />
                          <step-by-step-modal ref="modal" @ok="UpdataUser" />
                          <!-- <step-by-step-modal ref="modal" @ok="handleOk" /> -->
                        </a-col>
                      </a-tab-pane>
                      <a-tab-pane tab="已发送" key="2" forceRender>
                        <a-col :gutter="16" :span="24">
                          <a-table
                            :columns="columns"
                            rowKey="id"
                            :pagination="pagination"
                            :dataSource="data2"
                          >
                            <span slot="action" slot-scope="text, record">
                              <a href="javascript:;" @click="showModal(record)">详情</a>
                            </span>
                            <!-- <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.description}}</p> -->
                          </a-table>

                          <!-- <step-by-step-modal ref="modal" @ok="handleOk" /> -->
                        </a-col>
                      </a-tab-pane>
                      <a-tab-pane tab="已接收" key="3" forceRender>
                        <a-col :gutter="16" :span="24">
                          <a-table
                            :columns="columns"
                            rowKey="id"
                            :pagination="pagination1"
                            :dataSource="data1"
                          >
                            <span slot="action" slot-scope="text, record">
                              <a href="javascript:;" @click="showModal(record)">详情</a>
                            </span>
                            <!-- <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.description}}</p> -->
                          </a-table>

                          <create-form ref="createModal" @ok="handleOk" />
                          <step-by-step-modal ref="modal" @ok="UpdataUser" />
                          <!-- <step-by-step-modal ref="modal" @ok="handleOk" /> -->
                        </a-col>
                      </a-tab-pane>
                    </a-tabs>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      <a-modal :title="item.title" v-model="visible" @ok="handleOk1">
        <template slot="footer">
          <a-button key="back" @click="handleCancel(item)">已查看</a-button>
          <a-button
            type="primary"
            @click="handleUpload(item)"
            style="margin-top: 16px"
            key="submit"
          >回复</a-button>
        </template>
        <p>发起人：{{item.sender_name}}</p>
        <p>接收人：{{item.receiver_name}}</p>
        <p>发起时间：{{item.send_time|formatDate}}</p>
        <p></p>
        <a-card style="margin-bottom:4%;display:block">
          <div style="height: 200px;
    overflow-y: scroll;">
            <p style="font-size:17px">消息记录</p>
            <p v-for="item in item.messageList" :key="item.id">
              <span style="display:block;float:left;margin-left:3%;margin-right:3%;width:90%">
                {{item.message_from_username}}:
                {{item.message}}
              </span>
              <br />
              <span
                style="display:block;float:right;margin-right:3%"
              >{{item.message_time|formatDate}}</span>
            </p>
          </div>
        </a-card>

        <a-textarea v-model="text" placeholder="请输入消息"></a-textarea>
      </a-modal>

      <a-modal
        title="发起会话"
        :visible="visible1"
        :confirmLoading="confirmLoading"
        @ok="handleSubmit"
        @cancel="handleCancel1"
      >
        <a-spin :spinning="confirmLoading">
          <a-form :form="form">
            <a-form-item label="会话主题" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['title', {rules: [{required: true, message: '请填写会话主题' }]}]" />
            </a-form-item>
            <a-form-item label="接收者" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="[
          'receiver',
          {rules: [{ required: true, message: '请选择接收者' }]}
        ]"
                placeholder
              >
                <a-select-option v-for="time in timeList" :key="time.id">{{time.realname}}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="消息内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea
                v-decorator="['message', {rules: [{required: true, message: '请填写消息' }]}]"
              />
            </a-form-item>
          </a-form>
        </a-spin>
      </a-modal>
      <!-- <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" /> -->
    </a-card>
  </page-view>
</template>

<script>
import moment from 'moment'
// import { STable } from '@/components'
// import OrgModal from './modules/OrgModal'
import { getOrgTree, getServiceList, scheduleContent, addUser, updateUser } from '@/api/manage'
import {
  deleteId,
  getByPage,
  addPlan,
  delPlan,
  updatePlan,
  getSession,
  reSponse,
  getMyReceiveSessionMessage,
  getMySendSessionMessage,
  sessionInitUser,
  sessionAdd
} from '@/api/plan'
import { debuglog } from 'util'
import { PageView } from '@/layouts'
import CreateForm from './modules/CreateForm'
import CreateForm_1 from './modules/CreateForm_1'
import StepByStepModal from './modules/StepByStepModal'
import HeadInfo from '@/components/tools/HeadInfo'
import { mapGetters } from 'vuex'
const formatterTime = val => {
  return val ? moment(val).format('YYYY-MM-DD  HH:mm:ss') : ''
}

export default {
  name: 'TreeList',
  components: {
    // STable,
    PageView,
    HeadInfo,
    CreateForm,
    CreateForm_1,
    StepByStepModal
    // OrgModal
  },
  data() {
    return {
      openKeys: [],
      columns: [
        { title: '主题', width: '20%', dataIndex: 'title', key: 'title' },
        { title: '发起人', width: '20%', dataIndex: 'sender_name', key: 'sender_name' },
        { title: '接收人', width: '20%', dataIndex: 'receiver_name', key: 'receiver_name' },

        {
          title: '发起时间',
          width: '20%',
          dataIndex: 'send_time',
          key: 'send_time',
          customRender: (text, row, index) => {
            return formatterTime(text)
          }
        },
        { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
      ],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      timeList: [],
      count: '',
      data: [],
      data1: [],
      data2: [],
      pageSize: 10,
      pageNum: 1,
      name: '',
      form: this.$form.createForm(this),
      job: '',
      text: '',
      confirmLoading: false,
      id: {},
      item: {},
      delID: '',
      visible: false,
      visible1: false,
      queryParam: {},
      pagination: {
        pageNum: 1,
        pageSize: 10, // 默认每页显示数量
        // showSizeChanger: true, // 显示可改变每页数量
        // pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
        showTotal: total => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize), // 改变每页数量时更新显示
        onChange: (page, pageSize) => this.changePage(page, pageSize),
        total: 0
      },
      pagination1: {
        pageNum: 1,
        pageSize: 10, // 默认每页显示数量
        // showSizeChanger: true, // 显示可改变每页数量
        // pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
        showTotal: total => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize), // 改变每页数量时更新显示
        onChange: (page, pageSize) => this.changePage1(page, pageSize),
        total: 0
      }
      // 查询参数
      // 表头
    }
  },
  // filters:{
  //   timeType(value){
  //       console.log(value)
  //       debugger;

  //   }
  // },
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
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m
    }
  },
  beforeCreate() {},
  created() {
    this.getData()
    this.initUser()
    this.getInit()
  },
  methods: {
    ...mapGetters(['rt']),
    onChange(date, dateString) {
      // console.log(date, dateString)
    },
    moment,
    //     renderContent (value, row, index)  {
    //   const obj = {
    //     children: value,
    //     attrs: {}
    //   }
    //   return obj
    // },

    getCurrentData(text) {
      // alert(111)
      // return new Date(text).toLocaleDateString()
      // moment(getCurrentData(), 'YYYY-MM-DD')
      // debugger;
    },
    initUser() {
      sessionInitUser().then(res => {
        // console.log(res)
        this.timeList = res.data
      })
    },
    // getCurrentData(){
    //   return new Date().toLocaleDateString();
    // },
    callback(key) {
      // console.log(key)
    },

    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          // console.log('values', values)
          sessionAdd(values).then(res => {
            if (res.status == 0) {
              setTimeout(() => {
                this.$message.info('发送成功')
                this.visible1 = false
                this.confirmLoading = false
                this.getData()
              }, 1500)
            } else {
              this.confirmLoading = false
            }
          })
        }
      })
    },
    handleCancel1() {
      this.visible1 = false
    },

    search() {
      // console.log(this)
      // debugger;
      this.getData()
    },
    handleCancel(e) {
      const query = {
        
        session_id: e.id,
        status: 1
      }

      reSponse(query).then(res => {
        if (res.status == 0) {
          this.visible = false
          this.getData()
        }
      })
      this.visible = false
    },
    handleUpload(e) {
      // debugger;
      // console.log(e.id, this.text)
      if (this.text != '') {
        const query = {
          message: this.text,
          session_id: e.id,
          status: 2
        }
        reSponse(query).then(res => {
          if (res.status == 0) {
            this.$message.info('回复成功')
            this.visible = false
            this.getData()
          }
        })
      } else {
        this.$message.info('请填写消息回复')
      }
    },
    getData() {
     
      getSession().then(res => {
        // console.log(moment(this.getCurrentData(res.data.items[0].join_time), 'YYYY-MM-DD'))
        // debugger;
        this.data = res.data
        const aa = this.data.length

        window.sessionStorage.setItem('key', aa)
        if (aa != 0) {
          this.count = '未读' + '(' + aa + ')'
          this.$store.commit('SET_RT', aa)
        } else {
          this.count = '未读'
          this.$store.commit('SET_RT', aa)
        }

        // console.log(res)
        //  debugger;
      })
      const query = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }

      getMyReceiveSessionMessage(query).then(res => {
        this.data1 = res.data.items
        this.pagination1.total = res.data.totalNum

        // debugger
      })
      getMySendSessionMessage(query).then(res => {
        this.data2 = res.data.items
        this.pagination.total = res.data.totalNum

        // debugger
      })
    },
    getInit(){
       setInterval(() => {
        this.getData()
      }, 120000);
    },

    //     handleEdit (record) {
    //   console.log(record)
    //   this.$refs.modal.edit(record)
    // },
    handleEdit(record) {
      // console.log(record)
      this.$refs.modal.edit(record)
    },
    handleOk(val) {
      // console.log(11,val)
      addPlan(val).then(res => {
        if (res.status == 0) {
          this.$message.info('任务制定成功')
          getByPage(this.queryParam).then(res => {
            this.data = res.data.items
            this.pagination.total = res.data.totalNum
            // console.log(res)
            //  debugger;
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    showModal(val) {
      // debugger;
      this.item = val
      this.text = ''
      this.visible = true
    },
    showModal1(val) {
      this.form.resetFields()
      this.visible1 = true
    },
    handleOk1(e) {
      // console.log(e,this.delID);
      this.delect(this.delID)
      this.visible = false
    },
    UpdataUser(val) {
      // console.log(22,val)
      updatePlan(val).then(res => {
        if (res.status == 0) {
          this.$message.info('修改成功')
          getByPage(this.queryParam).then(res => {
            this.data = res.data.items
            this.pagination.total = res.data.totalNum
            // console.log(res)
            //  debugger;
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleOk_1(val) {
      // console.log(11,val)
      // addUser(val).then(res=>{
      //      if(res.status==0){
      //     this.$message.info('增加用户成功');
      //     getServiceList(this.queryParam).then(res => {
      //   this.data = res.data.items
      //   this.pagination.total = res.data.totalNum
      //   // console.log(res)
      //   //  debugger;
      // })
      // }
      // else{
      //     this.$message.info(res.message);
      // }
      // })
    },
    delect(e) {
      // debugger;
      this.id = {
        id: e
      }
      delPlan(this.id).then(res => {
        // console.log(res)
        if (res.status == 0) {
          this.$message.info('删除成功')
          getByPage(this.queryParam).then(res => {
            this.data = res.data.items
            this.pagination.total = res.data.totalNum
            // console.log(res)
            //  debugger;
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    changePage(page, pageSize) {
      this.pageNum=page;
      this.queryParam = {
        pageNum: page,
        pageSize: this.pageSize
        // name: this.name
        // position: this.job
      }
      getMySendSessionMessage(this.queryParam).then(res => {
        this.data2 = res.data.items
        this.pagination.total = res.data.totalNum

        // debugger
      })
    },
    changePage1(page, pageSize) {
      this.pageNum=page;
      this.queryParam = {
        pageNum: page,
        pageSize: this.pageSize
        // name: this.name
        // position: this.job
      }

      getMyReceiveSessionMessage(this.queryParam).then(res => {
        this.data1 = res.data.items
        this.pagination1.total = res.data.totalNum
        // debugger
      })
    }
  }
}
</script>

<style lang="less" scoped>
// .tab_1{

//   /deep/ .ant-tabs-ink-bar .ant-tabs-ink-bar-animated {
//   background: red;
// //  display: none;
// //   width:192px;
// // height:52px;
// // background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));
// // border-radius:10px 0px 0px 10px;
// }
// }

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
</style>
