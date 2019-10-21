<template>
  <page-view>
    <a-card :bordered="false">
      <a-row :gutter="24">
        <!-- @add="handleAdd" -->
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div style="background-color: #fff;border:1px solid #eee; ">
            <a-row :gutter="16">
              <a-col :span="24">
                <a-card :bordered="false">
                  <div class="tab_1">
                    <a-tabs style defaultActiveKey="1" @change="callback">
                      <a-tab-pane style tab="待办任务" key="1">
                        <a-card :bordered="false"></a-card>
                        <a-list size="large">
                          <a-list-item
                            class="aa"
                            :key="index"
                            v-for="(item, index) in data"
                            style="cursor:pointer"
                            @click="aa(item)"
                          >
                            <!-- <a-list-item-meta :description="item.description">
                              <a-avatar
                                slot="avatar"
                                size="large"
                                shape="square"
                                :src="item.avatar"
                              />
                              <a slot="title">{{ item.title }}</a>
                            </a-list-item-meta>-->
                            <div slot="actions">
                              <span>{{item.SysTask.create_time |formatDate }}</span>
                            </div>

                            <div class="list-content">
                              <div class="list-content-item">
                                <p>{{ item.SysTask.task_name }}</p>
                              </div>
                              <!-- <div class="list-content-item" >
                                <span>创建人</span>
                                <p>{{ item.SysTask.create_username }}</p>
                              </div>
                              <div class="list-content-item">
                                <span>任务创建时间</span>
                                <p>{{ item.SysTask.create_time |formatDate }}</p>
                              </div>-->
                            </div>
                          </a-list-item>
                        </a-list>
                      </a-tab-pane>
                      <a-tab-pane tab="在办任务" key="2" forceRender>
                        <a-card :bordered="false"></a-card>
                        <a-list size="large">
                          <a-list-item
                            class="aa"
                            :key="index"
                            v-for="(item, index) in data2"
                            style="cursor:pointer"
                            @click="bb(item)"
                          >
                            <!-- <a-list-item-meta :description="item.description">
                              <a-avatar
                                slot="avatar"
                                size="large"
                                shape="square"
                                :src="item.avatar"
                              />
                              <a slot="title">{{ item.title }}</a>
                            </a-list-item-meta>-->
                            <div slot="actions">
                              <span>{{item.create_time |formatDate }}</span>
                            </div>

                            <div class="list-content">
                              <div class="list-content-item">
                                <p>{{ item.task_name }}</p>
                              </div>
                              <!-- <div class="list-content-item" >
                                <span>创建人</span>
                                <p>{{ item.SysTask.create_username }}</p>
                              </div>
                              <div class="list-content-item">
                                <span>任务创建时间</span>
                                <p>{{ item.SysTask.create_time |formatDate }}</p>
                              </div>-->
                            </div>
                          </a-list-item>
                        </a-list>
                      </a-tab-pane>
                      <a-tab-pane tab="已办任务" key="3" forceRender>
                        <a-card :bordered="false"></a-card>
                        <a-list size="large">
                          <a-list-item
                            class="aa"
                            :key="index"
                            v-for="(item, index) in data1"
                            style="cursor:pointer"
                            @click="cc(item)"
                          >
                            <!-- <a-list-item-meta :description="item.description">
                              <a-avatar
                                slot="avatar"
                                size="large"
                                shape="square"
                                :src="item.avatar"
                              />
                              <a slot="title">{{ item.title }}</a>
                            </a-list-item-meta>-->
                            <div slot="actions">
                              <span>{{item.sysTask.create_time |formatDate }}</span>
                            </div>

                            <div class="list-content">
                              <div class="list-content-item">
                                <p>{{ item.sysTask.task_name }}</p>
                              </div>
                              <!-- <div class="list-content-item" >
                                <span>创建人</span>
                                <p>{{ item.SysTask.create_username }}</p>
                              </div>
                              <div class="list-content-item">
                                <span>任务创建时间</span>
                                <p>{{ item.SysTask.create_time |formatDate }}</p>
                              </div>-->
                            </div>
                          </a-list-item>
                        </a-list>
                      </a-tab-pane>
                    </a-tabs>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </page-view>
</template>

<script>
import moment from 'moment'
import { getmyTask, getHistoryTask, Tasking } from '@/api/plan'
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
      data: [],
      data1: [],
      data2: []
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
    }
  },
  beforeCreate() {},
  watch: {
    $route(to, from) {
      //监听路由是否变化
      // console.log(to,from)
      if (to.name == 'Content') {
        this.init()
        this.init1()
        this.init2()
        // this.$router.go(0);//重新加载数据
      }
    }
  },
  created() {
    this.init()
    this.init1()
    this.init2()
  },

  methods: {
    moment,
    callback(key) {
      // console.log(key)
      if (key == 1) {
        this.init()
      } else if (key == 2) {
        this.init2()
      } else if (key == 3) {
        this.init1()
      }
    },
    aa(e) {
      // console.log(e)
      if (e.SysTask.type == 1 && e.taskDefinitionKey == 'procurementCheck') {
        this.$router.push({ name: 'procurementCheck', query: { taskId: e.taskId } })
      } else if (e.SysTask.type == 1 && e.taskDefinitionKey == 'application') {
        this.$router.push({ name: 'application', query: { taskId: e.taskId } })
      } else if (e.SysTask.type == 2) {
        this.$router.push({ name: 'check', query: { taskId: e.taskId, taskDefinitionKey: e.taskDefinitionKey } })
      }
      // this.$router.push({name:'application',params:{page:'1'}})
    },
    bb(e) {
      if (e.type == 2) {
        this.$router.push({ name: 'check', query: { taskId: e.id, taskDefinitionKey: 'checking1' } })
      } else {
        this.$router.push({ name: 'tasking', query: { sysTaskId: e.id } })
      }
    },
    cc(e) {
      if (e.sysTask.type == 2) {
        this.$router.push({ name: 'check', query: { taskId: e.piId, taskDefinitionKey: 'checking' } })
      } else {
        this.$router.push({ name: 'historyTask', query: { piId: e.piId } })
      }
    },
    init() {
      getmyTask().then(res => {
        this.data = res.data
        // debugger;
      })
    },
    init1() {
      getHistoryTask().then(res => {
        this.data1 = res.data
        // debugger;
      })
    },
    init2() {
      Tasking().then(res => {
        this.data2 = res.data
        // debugger;
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

// .aa{
//   color: red;
//   &hover{
//     color: red;
//   }
// }

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  width: 280px;
  :hover {
    color: #1890ff;
  }
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>