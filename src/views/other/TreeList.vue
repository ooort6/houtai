<template>
  <a-card :bordered="false">
    <a-row>
      <a-col :xl="5" :lg="5" :md="5" :sm="12" :xs="24">
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @titleClick="handleTitleClick"
        ></s-tree>
      </a-col>
      <!-- @add="handleAdd" -->
      <a-col :xl="19" :lg="19" :md="19" :sm="12" :xs="24">
        <div style="background-color: #ececec; padding: 20px;" v-show="display==1">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-card title="Card title" :bordered="false">
                <p>card content</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card title="Card title" :bordered="false">
                <p>card content</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card title="Card title" :bordered="false">
                <p>card content</p>
              </a-card>
            </a-col>
          </a-row>
        </div>

        <div v-show="display==2">233</div>
        <!-- <s-table
          ref="table"
          size="default"
          :columns="columns"
          :data="loadData"
          :alert="false"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="action" slot-scope="text, record">
            <template v-if="$auth('table.update')">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
            </template>
            <a-dropdown>
              <a class="ant-dropdown-link">
                更多 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.disable')">
                  <a href="javascript:;">禁用</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.delete')">
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </s-table>-->
      </a-col>
    </a-row>

    <!-- <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" /> -->
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
// import OrgModal from './modules/OrgModal'
import { getOrgTree, getServiceList, scheduleContent } from '@/api/manage'
import { debuglog } from 'util'

export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    // OrgModal
  },
  data() {
    return {
      openKeys: [],
      display: 1,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: 'no'
        },
        {
          title: '成员名称',
          dataIndex: 'description'
        },
        {
          title: '登录次数',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: text => text + ' 次'
        },
        {
          title: '状态',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          table: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  beforeCreate() {
    getOrgTree().then(res => {
      // debugger;
      this.orgTree = res.data
      this.openKeys = [res.data[0].key]
      console.log(this.openKeys)
      // console.log(this.orgTree[0].key)
      // debugger;
    })
  },
  methods: {
    handleClick(e) {
      console.log('handleClick', e)
      // debugger;
      this.queryParam = {
        path: e.key
      }
      let file = this.queryParam.path.split('.')[1]

      scheduleContent(this.queryParam).then(res => {
        console.log(res)
        if (res.data.fileType == 1) {
          this.display = 1
        }
        if (res.data.fileType == 2) {
          this.display = 2
        } else {
          this.display = 3
        }
        // debugger;
      })
      // debugger;

      // this.$refs.table.refresh(true)
    },
    handleAdd(item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleTitleClick(item) {
      console.log('handleTitleClick', item)
    },
    titleClick(e) {
      console.log('titleClick', e)
    },
    handleSaveOk() {},
    handleSaveClose() {},

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less">
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
