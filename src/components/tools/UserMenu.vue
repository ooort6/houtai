<template>
  <div class="user-wrapper">
    
    <div class="content-box">
      <!-- <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>-->
        <div style="float:left;">
              欢迎      &nbsp; &nbsp;{{username}}&nbsp; &nbsp;&nbsp; 
      </div>
    
      <!-- <notice-icon class="action"  /> -->
 <!-- <a-badge :count="2">
    <a-icon type="bell" style="font-size:18px; cursor: pointer;">
    </a-icon>
       </a-badge> -->
      <span class="action ant-dropdown-link user-dropdown-menu">
        <span @click="add()">
          <a-icon type="lock"></a-icon>修改密码
        </span>
      </span>
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <!-- <a-avatar class="avatar" size="small" :src="avatar()"/> -->
          <span @click="handleLogout">
            <a-icon type="logout"></a-icon>退出
          </span>
        </span>
        <!-- <a-menu slot="overlay" class="user-dropdown-menu-wrapper"> -->
        <!-- <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <a-icon type="setting"/>
            <span>测试</span>
          </a-menu-item>
        <a-menu-divider/>-->
        <!-- <a-menu-item key="3">
            <a href="javascript:;" >
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
        </a-menu-item>-->
        <!-- </a-menu> -->
      </a-dropdown>
    </div>
    <a-modal
      title="修改密码"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="原始密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
             type="password"
              v-decorator="['oldPassword', {rules: [{required: true,min: 6, message: '请输入至少六位数密码'  }]}]"
            />
          </a-form-item>
          <a-form-item label="新密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input 
             type="password"
              v-decorator="['newPassword', {rules: [{required: true,min: 6, message: '请输入至少六位数密码'  }]}]"
            />
          </a-form-item>
          <a-form-item label="请再次输入新密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input 
             type="password"
              v-decorator="['newsPassword', {rules: [{required: true,min: 6, message: '请输入至少六位数密码'  }]}]"
            />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import { changeSelect } from '@/api/manage'
import {getSession} from '@/api/plan'

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
        count: 0,
      confirmLoading: false,
      username:'',
      form: this.$form.createForm(this)
    }
  },
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  created(){
    this.init();
    // this.getCount();
  },
  watch:{
      count:function(newVal,oldVal){
        //console.log('监视到了firstname的变化');
        //this.fullname = this.firstname + "-" + this.lastname
        // console.log(newVal +"---"+oldVal)
        // this.fullname = newVal + "-" + this.lastname
      },
     
    },

  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar','rt']),

    add() {
      // debugger;
      this.form.resetFields()
      this.visible = true
    },
    // getCount(){
    //        getSession().then(res => {
    //     // console.log(moment(this.getCurrentData(res.data.items[0].join_time), 'YYYY-MM-DD'))
    //     // debugger;
    //     this.data = res.data
    //     const aa = this.data.length
    //     this.$store.commit('SET_RT',aa)
    //     // console.log(res)
    //     //  debugger;
    //   })
    // },
    init(){
      
       
    //  let count=window.sessionStorage.getItem("key");

    //   this.count=count;
       let user = window.localStorage.getItem("user");
       const users = JSON.parse(user)
  //  debugger;
            this.username=users.realname
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          // console.log('values', values)
          if (values.newsPassword != values.newPassword) {
            // debugger;
            this.$message.error('您好 两次输入密码不一致 请重新输入')

            this.form.resetFields()
            this.confirmLoading = false
          } else {
            changeSelect(values).then(res => {
              // console.log(res)
              if (res.status == 0) {
                this.$message.info('修改成功')
              } else {
                this.$message.error(res.message)
              }
            })

            setTimeout(() => {
              this.visible = false
              this.confirmLoading = false
            }, 1500)
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    handleLogout() {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              // debugger;
              that.$router.push({ path: '/user/login' })
              // window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  }
}
</script>
