<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="我的任务">
      <a-list size="large">
        <a-list-item :key="index" v-for="(item, index) in data">
          <div class="list-content">
            <div class="list-content-item" style="width:200px">
              <p>{{ item.task_name }}</p>
            </div>
            <div class="list-content-item" style="width:150px">
              <p>{{ item.should_complete_time | formatDate }}</p>
            </div>
            <div v-if="item.isBeOverdue==0" class="list-content-item" style="width:200px">
              <p style="color:red">未完成</p>
            </div>
            <div v-if="item.isBeOverdue==1" class="list-content-item" style="width:200px">
              <p style="color:red">逾期</p>
            </div>
            <div class="list-content-item" style="width:150px">
              <a-button
                style="background:linear-gradient(-75deg,rgba(45,192,253,1),rgba(87,99,255,1));
border-radius:15px;"
                type="primary"
                @click="showModal(item)"
              >详情</a-button>
              <a-modal v-model="visible" title="Title" onOk="handleOk">
                <!-- <template slot="footer">
        <a-button key="back" @click="handleCancel">关闭</a-button>
        <a-button   type="primary"
      @click="handleUpload"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px" key="submit"  >
          {{uploading ? 'Uploading' : '提交' }}
        </a-button>
                </template>-->
                <p>提交人：{{item.plan.user_name}}</p>
                <!-- <p >类型：{{item.plan.type_name}}</p> -->

                <!-- <div style="">
      提交任务： <a-upload
      :fileList="fileList"

      :remove="handleRemove"
      :beforeUpload="beforeUpload"
    >
      <a-button>
        <a-icon type="upload" /> Select File
      </a-button>
    </a-upload>
                </div>-->
              </a-modal>
            </div>
          </div>
        </a-list-item>
      </a-list>

      <!-- <task-form ref="taskForm" /> -->
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { getMytask, comPlete } from '@/api/plan'
// import reqwest from 'reqwest'
// import TaskForm from './modules/TaskForm'

export default {
  name: 'StandardList',
  components: {
    HeadInfo
    // TaskForm
  },
  data() {
    return {
      data: [],
      loading: false,
      visible: false,
      item: {},
      fileList: [],
      uploading: false
    }
  },
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
      return y + '-' + MM + '-' + d
    }
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload() {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        // debugger;
        formData.append('file', file)
      })
      this.uploading = true

      // formData.append("taskId",this.item.id)

      // console.log(this.item.id)
      // console.log(formData.get('taskId'))

      // debugger

      comPlete(formData).then(res => {
        // console.log(res)
        // debugger
      })

      // setTimeout(() => {
      //     this.fileList = []
      //           this.uploading = false
      //           this.$message.success('upload successfully.');
      // }, 2000);

      // You can use any AJAX library you like
      // reqwest({
      //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      //   method: 'post',
      //   processData: false,
      //   data: formData,
      //   success: () => {
      //     this.fileList = []
      //     this.uploading = false
      //     this.$message.success('upload successfully.');
      //   },
      //   error: () => {
      //     this.uploading = false
      //     this.$message.error('upload failed.');
      //   },
      // });
    },
    showModal(e) {
      this.item = e
      // debugger
      this.visible = true
    },
    handleOk(e) {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        this.loading = false
      }, 1000)
    },
    handleCancel(e) {
      this.visible = false
    }
  },
  created() {
    getMytask().then(res => {
      // console.log(res)
      this.data = res.data
      // debugger
    })
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
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
