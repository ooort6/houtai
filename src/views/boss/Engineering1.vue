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
                    <a-form-item label="工程名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
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
                
                  <a-col :gutter="16" :span="24">
                    <a-table
                      :columns="columns"
                      rowKey="id"
                      :pagination="pagination"
                      :dataSource="data"
                    >
                    </a-table>
                
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
  getMyEng
} from '@/api/manage'
import { debuglog } from 'util'
import { PageView } from '@/layouts'
import CreateForm from './modules/CreateForm'
import CreateForm_1 from './modules/CreateForm_1'
import StepByStepModal from './modules/StepByStepModal'
import HeadInfo from '@/components/tools/HeadInfo'
const formatterTime = val => {
  return val ? moment(val).format('YYYY-MM-DD') : ''
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
        {
          title: '工程名称',
          width: 200,

          dataIndex: 'name',
          key: 'name'
        },
     

   
        {
          title: '开始时间',
          width: 200,
          dataIndex: 'start_time',
          key: 'start_time',
          customRender: (text, row, index) => {
            return formatterTime(text)
          }
        },
        {
          title: '预计完成时间',
          width: 200,
          dataIndex: 'should_complete_time',
          key: 'should_complete_time',
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
            if (text == 0) {
              return {
                children: <span href="javascript:;">招标中</span>,
                attrs: {}
              }
            } else if (text == 1) {
              return {
                children: <span href="javascript:;">施工中</span>,
                attrs: {}
              }
            } else if (text == 2) {
              return {
                children: <span href="javascript:;">停止</span>,
                attrs: {}
              }
            } else if (text == 3) {
              return {
                children: <span href="javascript:;">完结</span>,
                attrs: {}
              }
            }
          }
        },

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
        // onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize), // 改变每页数量时更新显示
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
      alert(111)
    },
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
        name: this.name,
        // position: this.job
      }
      getMyEng(this.queryParam).then(res => {
     
        this.data = res.data.items
        // debugger;
        this.pagination.total = res.data.totalNum
      
      })
    },
 


    changePage(page, pageSize) {
      this.queryParam = {
        pageNum: page,
        pageSize: this.pageSize,
        name: this.name,
        // position: this.job
      }
      getMyEng(this.queryParam).then(res => {
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
