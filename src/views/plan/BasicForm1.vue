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
                    <a-form-item label="任务名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                      <a-input v-model="task_name" placeholder />
                    </a-form-item>
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
                    >制定计划</a-button>
                  </a-col>-->
                  <a-col :gutter="16" :span="24">
                    <a-table
                      :columns="columns"
                      rowKey="id"
                      :pagination="pagination"
                      :dataSource="data"
                    >
                      <span slot="action" slot-scope="text, record">
                        <div @click="handleEdit(record)">
                          <a-icon style="color:#1890FF;cursor:pointer" type="download"></a-icon>
                          <a href="javascript:;">下载</a>
                        </div>
                      </span>
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
import { deleteId, getByPage, addPlan, delPlan, updatePlan, getFinishTask, downloadTaskFile } from '@/api/plan'
import { debuglog } from 'util'
import { PageView } from '@/layouts'
import CreateForm from './modules/CreateForm'
import CreateForm_1 from './modules/CreateForm_1'
import StepByStepModal from './modules/StepByStepModal'
import HeadInfo from '@/components/tools/HeadInfo'

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
        { title: '任务名称', dataIndex: 'task_name', key: 'task_name', width: '20%' },
        {
          title: '截止时间',
          dataIndex: 'should_complete_time',
          key: 'should_complete_time',
          width: '20%',
          customRender: (text, row, index) => {
            return formatterTime(text)
          }
        },
        {
          title: '提交时间',
          dataIndex: 'complete_time',
          key: 'complete_time',
          width: '20%',
          customRender: (text, row, index) => {
            return formatterTime(text)
          }
        },
        { title: '类型', dataIndex: 'plan.type_name', key: 'plan.type_name', width: '20%' },

        { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, width: '20%' }
      ],

      data: [],
      pageSize: 10,
      pageNum: 1,
      task_name: '',
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
  watch: {
    $route(to, from) {
      //监听路由是否变化
      // console.log(to,from)
      if (to != from) {
        this.getData()
        // this.$router.go(0);//重新加载数据
      }
    }
  },
  created() {
    this.getData()
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
      // alert(111)
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
        task_name: this.task_name
        // position: this.job
      }
      // debugger;
      getFinishTask(this.queryParam).then(res => {
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
      // console.log(record.id)
      // window.location="http://192.168.1.8:8082/task/downloadTaskFile?taskId=253"
      //    let zt = window.localStorage.getItem('pro__Access-Token')
      //   // console.log(zt)
      //   const zt1 = JSON.parse(zt)
      // this.queryParam = {
      //   taskId: record.id,
      //   zt:zt1.value
      //   // position: this.job
      // }
      // downloadTaskFile(this.queryParam).then(res => {
      // debugger;
      let zt = window.localStorage.getItem('pro__Access-Token')
      // console.log(zt)
      const zt1 = JSON.parse(zt)
      const api = this.$common.getFileUrl() + 'file/downloadTaskFile?taskId='

      // debugger
      let btn = document.createElement('a')
      btn.setAttribute('download', 'filename') // download属性
      btn.setAttribute('href', api + record.id + '&zt=' + zt1.value) // href链接
      btn.click() // 自执行点击事件
      // })
      //   let a = document.createElement("a");
      //    let blob = new Blob([res],{
      //          type:'application/vnd.ms-excel'
      //    })
      //    let objectUrl = URL.createObjectURL(blob);  //生成一个url
      //        window.location.href = objectUrl;

      //  .catch(err => {
      //        console.log(err);
      //      })
      // debugger;
      // this.$refs.modal.edit(record)
    },

    changePage(page, pageSize) {
      this.queryParam = {
        pageNum: page,
        pageSize: this.pageSize,
        task_name: this.task_name
        // position: this.job
      }
      getFinishTask(this.queryParam).then(res => {
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
