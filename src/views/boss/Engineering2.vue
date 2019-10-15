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
                  <a-col :md="8" :sm="24">
                    <a-form-item label="名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                      <a-input v-model="name" placeholder />
                    </a-form-item>
                  </a-col>
                  <!-- <a-col :md="8" :sm="24">
                    <a-form-item label="职务" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                      <a-input v-model="job" placeholder />
                    </a-form-item>
                  </a-col>-->
                  <a-col :md="8" :sm="24">
                    <span
                      class="table-page-search-submitButtons"
                      :style=" { float: 'left', overflow: 'hidden' } || {} "
                    >
                      <a-button
                        @click="search()"
                        style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));
border-radius:10px;color:#fff;"
                      >查询</a-button>
                    </span>
                  </a-col>
                  <!-- <a-col :span="24" style="margin-bottom:2%">
                    <a-button
                      @click="$refs.createModal.add()"
                      style="margin-left:50px;background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));
border-radius:10px;color:#fff;"
                    >汇总上报</a-button>
                  </a-col> -->
                  <a-col :gutter="16" :span="24">
                    <a-table
                      :columns="columns"
                      rowKey="id"
                      :pagination="pagination"
                      :dataSource="data"
                    >
                      <span slot="action" slot-scope="text, record">
                        <!-- <a href="javascript:;" @click="handleEdit(record)">修改</a>
                        <a-divider type="vertical" />-->
                        <a href="javascript:;" style="color:red" @click="showModal(record.id)">详情</a>
                      </span>
                      <!-- <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.description}}</p> -->
                    </a-table>
                    <a-modal title="删除" v-model="visible" @ok="handleOk1">
                      <p>是否删除此工程？</p>
                    </a-modal>
                    <create-form ref="createModal" @ok="handleOk" />
                    <step-by-step-modal ref="modal" @ok="UpdataEng" />
                    <!-- <step-by-step-modal ref="modal" @ok="handleOk" /> -->
                  </a-col>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>

      <!-- <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" /> -->
    </a-card>
  </page-view>
</template>

<script>
import moment from 'moment'
// import { STable } from '@/components'
// import OrgModal from './modules/OrgModal'
import {
  getOrgTree,
  getServiceList,
  scheduleContent,
  deleteId,
  updateUser,
  getEngList,
  addEngineer,
  deleteEng,
  updateEng,
  getMater,
  getStart,
  getCheckByPage,
  getMyCheckApplicationHistory,
  getMyCheckHistory
} from '@/api/manage'
import { debuglog } from 'util'
import { PageView } from '@/layouts'
import CreateForm from './modules/CreateForm'
import CreateForm_1 from './modules/CreateForm_1'
import StepByStepModal from './modules/StepByStepModal'
import HeadInfo from '@/components/tools/HeadInfo'
const formatterTime = val => {
  return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''
}
export default {
  name: 'Manager',
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
        {
          title: '名称',
          width: 250,

          dataIndex: 'name',
          key: 'name'
        },
      
            {
          title: '上报人',
          width: 200,

          dataIndex: 'report_username',
          key: 'report_username'
        },




        

        // {
        //   title: '性别',
        //   dataIndex: 'sex',
        //   key: 'sex',
        //   customRender: (text, row, index) => {
        //     if (text == 1) {
        //       return {
        //         children: <span href="javascript:;">男</span>,
        //         attrs: {}
        //       }
        //     } else {
        //       return {
        //         children: <span href="javascript:;">女</span>,
        //         attrs: {}
        //       }
        //     }
        //   }
        //   //  filters: [
        //   //   { text: '男', value: '男' },
        //   //   { text: '女', value: '女' },
        //   // ],
        //   //  onFilter: (value, record) => record.name.includes(value),
        // },
        {
          title: '上报时间',
          width: 300,
          dataIndex: 'report_time',
          key: 'report_time',
          customRender: (text, row, index) => {
            return formatterTime(text)
          }
        },

        {
          title: '状态',
          width: 200,
          dataIndex: 'status',
          key: 'status',
          customRender: (text, row, index) => {
            if (text == 1) {
              return {
                children: <span href="javascript:;">待审核</span>,
                attrs: {}
              }
            } else if (text == 2) {
              return {
                children: <span href="javascript:;">通过</span>,
                attrs: {}
              }
            } else if (text == 3) {
              return {
                children: <span href="javascript:;">核价中</span>,
                attrs: {}
              }
            } else if (text == 4) {
              return {
                children: <span href="javascript:;">不通过</span>,
                attrs: {}
              }
            } else if (text == 5) {
              return {
                children: <span href="javascript:;">确认采购</span>,
                attrs: {}
              }
            }
          }
        },

        // { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
      ],

      data: [],
      pageSize: 10,
      pageNum: 1,
      name: '',
      job: '',
      id: {},
      delID: '',
      visible: false,
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
  beforeCreate() {},
  created() {
    this.getData()
  },
  provide() {
    return {
      getData: this.getData
    }
  },
  methods: {
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
      alert(111)
      // return new Date(text).toLocaleDateString()
      // moment(getCurrentData(), 'YYYY-MM-DD')
      // debugger;
    },
    // getCurrentData(){
    //   return new Date().toLocaleDateString();
    // },
    callback(key) {
      // console.log(key)
    },
    search() {
      // console.log(this)
      // debugger;
      this.getData()
    },
    getData() {
      this.queryParam = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        name: this.name
        // position: this.job
      }
      getMyCheckHistory(this.queryParam).then(res => {
        // console.log(moment(this.getCurrentData(res.data.items[0].join_time), 'YYYY-MM-DD'))
        // debugger;
        this.data = res.data.items
        this.pagination.total = res.data.totalNum
        // console.log(res)
        //  debugger;
      })
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
      console.log(11, val)
      getStart(val).then(res => {
        // debugger
        if (res.status == 0) {
          this.$message.info('材料申请成功')
          getMyCheckApplicationHistory(this.queryParam).then(res => {
            this.data = res.data.items
            this.pagination.total = res.data.totalNum
            // console.log(res)
            //  debugger;
          })
        } else {
          this.$message.info(res.message)
        }
      })
    },
    showModal(val) {
      // console.log(val)
      // this.delID = val
      // this.visible = true
    },
    handleOk1(e) {
      // console.log(e,this.delID);
      this.delect(this.delID)
      this.visible = false
    },
    UpdataEng(val) {
      // console.log(22,val)
      updateEng(val).then(res => {
        if (res.status == 0) {
          this.$message.info('修改成功')
          getCheckByPage(this.queryParam).then(res => {
            this.data = res.data.items
            this.pagination.total = res.data.totalNum
            // console.log(res)
            //  debugger;
          })
        } else {
          this.$message.info(res.message)
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
      deleteEng(this.id).then(res => {
        // console.log(res)
        if (res.status == 0) {
          this.$message.info('删除成功')
          getCheckByPage(this.queryParam).then(res => {
            this.data = res.data.items
            this.pagination.total = res.data.totalNum
            // console.log(res)
            //  debugger;
          })
        }
      })
    },
    changePage(page, pageSize) {
      this.queryParam = {
        pageNum: page,
        pageSize: this.pageSize,
        name: this.name
        // position: this.job
      }
      getMyCheckHistory(this.queryParam).then(res => {
        this.data = res.data.items
        this.pagination.total = res.data.totalNum
        // console.log(res)
        //  debugger;
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
