<template>
  <page-view>
    <a-card :bordered="false">
      <a-row :gutter="24">
        <!-- @add="handleAdd" -->
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div style="background-color: #fff;border:1px solid #eee; " >
            <a-row :gutter="16">
              <a-col :span="24">
                <a-card :bordered="false">
                  <div class="tab_1">
                    <a-tabs style defaultActiveKey="1" @change="callback">
                      <a-tab-pane style tab="每日报表" key="1">
                        <a-card :bordered="false">
                          <a-date-picker
                            style="float:left"
                            @change="onChange"
                            :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')"
                          />
                          <div
                            style="float:right;cursor: pointer;"
                            @click="allTask()"
                            v-if="isShow==1"
                          >
                            <a-icon type="download" style="color:#1890FF;font-size:18px"></a-icon>
                            <span style="font-size:18px;color:rgba(0,0,0,0.75)">总汇execl下载</span>
                          </div>
                        </a-card>
                        <a-card v-if="data.length==0">
                         <a-row>
                           <a-col >
                           <span style="display:block;text-align:center">
                             暂无内容
                             </span> 
                           </a-col>
                         </a-row>

                        </a-card>
                        <a-card
                          v-for="item in data"
                          :key="item.id"
                          style="background-color: #ececec;margin-bottom:3%"
                        >
                          <a-row style="margin-bottom:1%">
                            <a-col :span="3">
                              <span style="font-size:18px">{{item.name}}</span>
                            </a-col>
                            <a-col :span="3" v-if="item.nextStatus==2">
                              <a-button
                                type="primary"
                                size="small"
                                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                                @click="changeTask(item)"
                              >修改</a-button>
                            </a-col>
                            <a-col :span="3" v-if="item.nextStatus==3">
                              <a-button
                                type="primary"
                                style="margin-right:4%;background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                                size="small"
                                @click="buTask(item)"
                              >补缴</a-button>
                              <a-button
                                type="primary"
                                size="small"
                                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                                @click="canalTask(item)"
                              >取消任务</a-button>
                            </a-col>
                            <a-col :span="3" v-if="item.nextStatus==1">
                              <a-button
                                type="primary"
                                size="small"
                                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                                @click="canalTask(item)"
                              >取消任务</a-button>
                            </a-col>
                            <a-col :span="3" v-if="item.nextStatus==4">
                              <a-button
                                type="primary"
                                size="small"
                                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                                @click="buTask(item)"
                              >补缴</a-button>
                            </a-col>
                          </a-row>
                          <a-row style="margin-bottom:2%">
                            <a-col :span="6">提交人：{{item.user_name}}</a-col>
                            <a-col :span="6">类型：{{item.type_name}}</a-col>
                          </a-row>

                          <a-row
                            style="margin-bottom:2%"
                            v-for="items in item.taskList"
                            :key="items.id"
                          >
                            <a-col :span="5" v-if="items.type==1">
                              <a-tag color="#1890FF">日常任务：</a-tag>
                              {{items.task_name}}
                            </a-col>
                            <a-col :span="5" v-if="items.type==2">
                              <a-tag color="#f50">补缴任务：</a-tag>
                              {{items.task_name}}
                            </a-col>
                            <a-col :span="5" v-if="items.type==3">
                              <a-tag color="#f00">修改任务：</a-tag>
                              {{items.task_name}}
                            </a-col>
                            <a-col :span="5">截止日期：{{items.should_complete_time|formatDate}}</a-col>
                            <a-col
                              :span="4"
                              v-if="items.complete_time"
                            >提交日期：{{items.complete_time|formatDate}}</a-col>
                            <a-col :span="4" v-if="!items.complete_time">
                              <span style="color:red">未提交</span>
                            </a-col>
                              
                            <a-col :span="3">
                              任务状态：
                              <span
                                style="color:red"
                              >{{items.status|getStatus(items.isBeOverdue)}}</span>
                            </a-col>
                        
                          
                            <a-col :span="4" v-if="items.status==2">
                              文件状态：
                              <span style="color:red">{{items.taskFile.is_vaild|getTask}}</span>
                            </a-col>
                            <a-col :span="3" v-if="items.status==2">
                              <a-button
                                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                                @click="download(items.id)"
                              >下载</a-button>
                            </a-col>
                              <br v-if="items.type==2" />
                              <a-row  style="margin-top:1%">
                                <a-col v-if="items.type==2">补缴原因: <span style="color:red">{{items.reason}}</span> </a-col>
                                
                              </a-row>
  <a-row  style="margin-top:1%">
                                <a-col v-if="items.type==3">修改原因: <span style="color:red">{{items.reason}}</span> </a-col>
                                
                              </a-row>
                          </a-row>
                       
                        </a-card>
                      </a-tab-pane>
                      <a-tab-pane tab="历史未完成" key="2" forceRender>
                        <a-card :bordered="false"></a-card>
                        <a-card
                          v-for="item in data1"
                          :key="item.id"
                          style="background-color: #ececec;margin-bottom:3%"
                        >
                          <a-row style="margin-bottom:1%">
                            <a-col :span="3">
                              <span style="font-size:16px;margin-right:6%">{{item.task_name}}</span>
                            </a-col>
                            <a-col :span="3" v-if="item.type==1">
                              <a-tag color="#1890FF">日常任务</a-tag>
                            </a-col>
                            <a-col :span="3" v-if="item.type==2">
                              <a-tag color="#f50">补缴任务</a-tag>
                            </a-col>
                            <a-col :span="3" v-if="item.type==3">
                              <a-tag color="#f00">修改任务</a-tag>
                            </a-col>
                          </a-row>
                          <a-row style="margin-bottom:3%">
                            <a-col :span="6">提交人：{{item.plan.user_name}}</a-col>
                            <a-col :span="6">类型：{{item.plan.type_name}}</a-col>
                          </a-row>
                          <a-row>
                            <a-col :span="5">截止日期：{{item.should_complete_time|formatDate}}</a-col>
                            <a-col :span="5">周期：{{item.plan.cycle_name}}</a-col>
                            <a-col :span="5" v-if="item.isBeOverdue==1">任务状态：<span style="color:red">逾期</span> </a-col>
                            <a-col :span="5" v-if="item.isBeOverdue==0">任务状态：<span style="color:red">未完成</span></a-col>

                            <a-col :span="3" v-if="item.isBeOverdue==1">
                              <a-button
                                type="primary"
                                style="margin-right:4%;background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                                size="small"
                                @click="buTask(item)"
                              >补缴</a-button>
                              <a-button
                                type="primary"
                                size="small"
                                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                                @click="canalTask(item)"
                              >取消任务</a-button>
                            </a-col>
                            <a-col :span="3" v-if="item.isBeOverdue==0">
                              <a-button
                                type="primary"
                                size="small"
                                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                                @click="canalTask(item)"
                              >取消任务</a-button>
                            </a-col>
                          </a-row>
                          <a-row style="margin-bottom:1%">
                            <!-- <a-col :span="5">截止日期：{{items.should_complete_time|formatDate}}</a-col> -->
                            <!-- <a-col :span="4" v-if="items.complete_time">提交日期：{{items.complete_time|formatDate}}</a-col> -->
                            <!-- <a-col :span="4"  v-if="!items.complete_time"><span style="color:red">未提交</span></a-col> -->
                            <!-- <a-col :span="3">
                              任务状态：
                              <span style="color:red">{{items.status|getStatus(items.isBeOverdue)}}</span>
                            </a-col>
                            <a-col :span="4" v-if="items.status==2">
                              文件状态：
                              <span style="color:red">{{items.taskFile.is_vaild|getTask}}</span>
                            </a-col>
                            <a-col :span="3" v-if="items.status==2">
                              <a-button
                                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));border-radius:12px;color:#fff;height:22px"
                              @click="download(items.id)"
                              >下载</a-button>
                            </a-col>-->
                          </a-row>
                        </a-card>
                      </a-tab-pane>
                    </a-tabs>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      <a-modal title="取消任务" v-model="visible" @ok="handleOk()">
        <p>请确认取消此任务</p>
      </a-modal>

      <a-modal title="新建修改任务" v-model="visible1" @ok="handleOk1()">
        <p>提交人：{{this.task_user}}</p>
        <p>任务名称：{{this.task_name}}</p>
        <p>
          <a-date-picker :disabledDate="disabledDate" @change="onChange1" />
          <a-select style="width: 120px;margin-left:2%" placeholder="请填写时间" @change="handleChange">
            <a-select-option v-for="time in timeList" :key="time.time">{{time.time}}</a-select-option>
          </a-select>
        </p>
        <p>
          修改原因：
          <a-textarea v-model="reason"></a-textarea>
        </p>
      </a-modal>

      <a-modal title="补缴任务" v-model="visible2" @ok="handleOk2()">
        <p>提交人：{{this.task_user}}</p>
        <p>任务名称：{{this.task_name}}</p>
        <p>
          <a-date-picker :disabledDate="disabledDate" @change="onChange2" />
          <a-select style="width: 120px;margin-left:2%" placeholder="请填写时间" @change="handleChange">
            <a-select-option v-for="time in timeList" :key="time.time">{{time.time}}</a-select-option>
          </a-select>
        </p>
        <p>
          补缴原因：
          <a-textarea v-model="reason"></a-textarea>
        </p>
      </a-modal>
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
  daysTask,
  cancalTask,
  addTask,
  historyNoComplete
} from '@/api/manage'

import { debuglog } from 'util'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
export default {
  name: 'TreeList',
  components: {
    // STable,
    PageView,
    HeadInfo
    // OrgModal
  },
  data() {
    return {
      openKeys: [],
      display: 1,
      queryParam: {},
      data: [],
      data1: [],
      date: '',
      date1: '',
      date2: '',
      isShow: 1,
      reason: '',
      visible: false,
      visible1: false,
      visible2: false,
      item: {},
      value: '',
      task_name: '',
      task_user: '',
      timeList: [
        {
          id: 12,
          time: '12:00:00'
        },
        {
          id: 18,
          time: '18:00:00'
        },
        {
          id: 22,
          time: '22:00:00'
        }
      ]
      // 查询参数
      // 表头
    }
  },
  filters: {
    formatDate: function(value) {
      if (value != null) {
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
      } else {
        return ''
      }
    },
    getStatus: function(value, isDue) {
      if (value == 2) {
        return '完成'
      } else if (value == 3) {
        return '任务已停止'
      } else if (value == 4) {
        return '逾期已处理'
      } else if (value == 1 && isDue == 1) {
        return '逾期'
      } else if (value == 1 && isDue == 0) {
        return '未完成'
      } else {
        return ''
      }
    },
    getTask: function(value) {
      if (value != null && value == 2) {
        return '文件无效'
      } else {
        return '文件有效'
      }
    }
  },
  beforeCreate() {},
  created() {
    this.init()
  },
  methods: {
    onChange(date, dateString) {
      this.date = dateString
      this.queryParam = {
        strDay: dateString
      }

      daysTask(this.queryParam).then(res => {
        this.data = res.data.planList
        this.isShow = res.data.hasDownButton
       
        // debugger;
      })
    },

    onChange1(date, dateString) {
      // this.date=dateString;
      this.date1 = dateString
    },

    onChange2(date, dateString) {
      // this.date=dateString;
      this.date2 = dateString
    },

    handleChange(value) {
      this.value = value
    },

    moment,
    getCurrentData() {
      return new Date().toLocaleDateString()
      // debugger;
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day')
    },

    // getCurrentData(){
    //   return new Date().toLocaleDateString();
    // },
    canalTask(e) {
      this.visible = true
      this.item = e
    },

    changeTask(e) {
      this.visible1 = true
      this.item = e
      let c = this.item.taskList
      let d = c.slice(-1)
      let f = d[0].task_name
      this.task_name = f
      let ff = d[0].task_user_name
      this.task_user = ff
      // debugger;

      this.reason = ''

      // debugger;
    },
    buTask(e) {
      this.visible2 = true
      this.item = e
      let c = this.item.taskList
      if(!c){
          this.task_name=this.item.task_name
          this.task_user=this.item.task_user_name

      }else{
      let d = c.slice(-1)
      let f = d[0].task_name
      this.task_name = f
      let ff = d[0].task_user_name
      this.task_user = ff
      }
    
      // debugger;

      this.reason = ''

      // debugger;
    },
    handleOk(e) {
      // debugger;
      let c = this.item.taskList
      if (!c) {
        let id = this.item.id
        const query = {
          taskId: id
        }
        cancalTask(query).then(res => {
          if (res.status == 0) {
            this.$message.info('取消任务成功')

            historyNoComplete().then(res => {
              this.data1 = res.data
              // debugger;
              this.visible = false
            })
          }
        })
      } else {
        let d = c.slice(-1)
        let f = d[0].id
        const query = {
          taskId: f
        }
        cancalTask(query).then(res => {
          if (res.status == 0) {
            this.$message.info('取消任务成功')
            this.queryParam = {
              strDay: this.date
            }
            daysTask(this.queryParam).then(res => {
              this.data = res.data.planList
              this.isShow = res.data.hasDownButton
              // debugger;
              this.visible = false
            })
          }
        })
      }
    },
    handleOk1(e) {
      let a = this.date1 + ' ' + this.value
      let c = this.item.taskList
      let d = c.slice(-1)
      let f = d[0].id
      const query = {
        lastTime: a,
        reason: this.reason,
        taskId: f,
        type: 3
      }
      addTask(query).then(res => {
        if (res.status == 0) {
          this.$message.info('修改任务成功')
          this.queryParam = {
            strDay: this.date
          }
          daysTask(this.queryParam).then(res => {
            this.data = res.data.planList
            this.isShow = res.data.hasDownButton
            // debugger;
            this.visible1 = false
          })
        }
      })
    },

    handleOk2(e) {
      let a = this.date2 + ' ' + this.value
      let c = this.item.taskList
      // debugger;
      if(!c){
        let f=this.item.id
         const query = {
        lastTime: a,
        reason: this.reason,
        taskId: f,
        type: 2
      }
      addTask(query).then(res => {
        if (res.status == 0) {
          //  debugger;
          this.$message.info('操作成功')
          historyNoComplete().then(res => {
              this.data1 = res.data
              // debugger;
              this.visible2 = false
            })
  
        }
      })
      }else{
      let d = c.slice(-1)
      let f = d[0].id
       const query = {
        lastTime: a,
        reason: this.reason,
        taskId: f,
        type: 2
      }
      addTask(query).then(res => {
        if (res.status == 0) {
          //  debugger;
          this.$message.info('操作成功')
          this.queryParam = {
            strDay: this.date
          }
          daysTask(this.queryParam).then(res => {
            this.data = res.data.planList
            this.isShow = res.data.hasDownButton
            // debugger;
            this.visible2 = false
          })
        }
      })
      }
     
    },

    init() {
      // alert(1)
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }

      var currentdate = year + seperator1 + month + seperator1 + strDate
      // var currentdate = "2019-09-02"
      this.date = currentdate
      this.queryParam = {
        strDay: currentdate
      }

      daysTask(this.queryParam).then(res => {
        // console.log(res)
        this.data = res.data.planList
        this.isShow = res.data.hasDownButton
     
        // debugger;
      })

      historyNoComplete().then(res => {
        // console.log(res)
        this.data1 = res.data
      })
    },
    download(e) {
      // console.log(e)
      let zt = window.localStorage.getItem('pro__Access-Token')
      // console.log(zt)
      const zt1 = JSON.parse(zt)
      const api = this.$common.getFileUrl() + 'file/downloadTaskFile?taskId='

      // debugger
      let btn = document.createElement('a')
      btn.setAttribute('download', 'filename') // download属性
      btn.setAttribute('href', api + e + '&zt=' + zt1.value) // href链接
      btn.click() // 自执行点击事件
    },
    allTask() {
      console.log(this.date)
      let zt = window.localStorage.getItem('pro__Access-Token')
      // console.log(zt)
      const zt1 = JSON.parse(zt)
      const api = this.$common.getFileUrl() + 'file/dayAllFiles?strDay='

      // debugger
      let btn = document.createElement('a')
      btn.setAttribute('download', 'filename') // download属性
      btn.setAttribute('href', api + this.date + '&zt=' + zt1.value) // href链接
      btn.click() // 自执行点击事件
    },

    callback(key) {
      // console.log(key)
      if(key==1){
          this.init()
      }else{
         this.init()
      }
    }
  }
}
</script>

<style lang="less" scoped>
//  /deep/   .ant-tabs-tab{
// width:192px;
// height:52px;
// background:rgba(232,232,232,1);
// // border-radius:0px 10px 10px 0px;
// color: rgba(71,67,85,1);
// text-align: center;

// font-size: 24px;
// margin-right: 0;
//   //  display: none;

//  }
//  /deep/   .ant-tabs-tab-active{
//  width:192px;
// height:52px;
// background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));
// // border-radius:10px 0px 0px 10px;
// color: #fff;
// text-align: center;
// font-size: 24px;
//   //  display: none;
//  }
//  /deep/ .ant-tabs-ink-bar .ant-tabs-ink-bar-animated {
//    display: none;
//  }

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
