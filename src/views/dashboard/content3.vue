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
                    <a-button
                      style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));
border-radius:10px;color:#fff;margin-bottom:5%;"
                    >通讯录</a-button>
                  </a-col>
                  <!-- <a-col :md="8" :sm="24">
                    <a-form-item label="类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-select placeholder="请选择" default-value="0" >
                <a-select-option value="0">财务</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
                    </a-form-item>
                  </a-col>-->

                  <!-- <a-col :span="24" style="margin-bottom:2%">
                    <a-button
                      @click="$refs.createModal.add()"
                      style="margin-left:50px;background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));
border-radius:10px;color:#fff;"
                    >制定计划</a-button>
                  </a-col>-->
                  <a-col :gutter="16" :span="24">
                    <a-table
                      :columns="columns"
                      rowKey="idd"
                      :pagination="pagination"
                      :dataSource="data"
                    >
                    
                      <!-- <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.description}}</p> -->
                    </a-table>

                    <!-- <create-form ref="createModal" @ok="handleOk" /> -->
                    <!-- <step-by-step-modal ref="modal" @ok="UpdataUser" /> -->
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
// import { getOrgTree, getServiceList, scheduleContent, addUser, updateUser } from '@/api/manage'
import { deleteId, getByPage, addPlan, delPlan, updatePlan, getFinishTask, downloadTaskFile,getMailList } from '@/api/plan'
import { debuglog } from 'util'
import { PageView } from '@/layouts'
// import CreateForm from './modules/CreateForm'
// import CreateForm_1 from './modules/CreateForm_1'
// import StepByStepModal from './modules/StepByStepModal'
import HeadInfo from '@/components/tools/HeadInfo'

const formatterTime = val => {
  return val ? moment(val).format('YYYY-MM-DD  HH:mm:ss') : ''
}

export default {
  name: 'TreeList',
  components: {
    // STable,
    PageView,
    HeadInfo
    // CreateForm,
    // CreateForm_1,
    // StepByStepModal
    // OrgModal
  },
  data() {
    return {
      openKeys: [],
      columns: [
        { title: '姓名', dataIndex: 'realname', key: 'realname', width: '25%' },
        {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone',
          width: '25%'
        },
        { title: '职业', dataIndex: 'position', key: 'position', width: '25%' },

        { title: '性别', dataIndex: 'sex', key: 'sex', width: '25%',  
            customRender: (text, row, index) => {
            if (text == 1) {
              return {
                children: <span href="javascript:;">男</span>,
                attrs: {}
              }
            } else {
              return {
                children: <span href="javascript:;">女</span>,
                attrs: {}
              }
            }
          }
        }
      ],

      data: [],
      pageSize: 10,
      pageNum: 1,
      task_name: '',
      job: '',
      idd: {},
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
  methods: {
    onChange(date, dateString) {
      // console.log(date, dateString)
    },
    moment,

    getCurrentData(text) {
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
        // task_name: this.task_name
        // position: this.job
      }
      // debugger;
      getMailList(this.queryParam).then(res => {
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
   

    changePage(page, pageSize) {
      this.queryParam = {
        pageNum: page,
        pageSize: this.pageSize,
        // position: this.job
      }
      getMailList(this.queryParam).then(res => {
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
