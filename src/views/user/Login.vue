<template>
  <div class="bg">
    <span class="span_1">日常商务办公系统</span>
    <span class="span_2">—— Daily business office system ——</span>
    <div class="main">
      <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
      >
        <span class="span_3">用户登录</span>
        <span class="span_4">——The user login——</span>
        <!-- <a-tabs
          :activeKey="customActiveKey"
          :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
          @change="handleTabClick"
        >
        <a-tab-pane key="tab1" tab="账号密码登录">-->
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="请输入账户"
            style="margin-bottom:5%;"
            v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="请输入密码"
            style="margin-bottom:5%"
            v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>
        <!--  </a-tab-pane> -->
        <!-- <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input size="large" type="text" placeholder="手机号" v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>-->
        <!-- </a-tabs> -->

        <a-form-item>
          <!-- <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox> -->
          <!-- <a class="forge-password" style="float: right;color:#EAB822" @click="RePassword">重置密码</a> -->
        </a-form-item>

        <a-form-item>
          <a-button
            size="large"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
            style="
height:50px;color:#fff;background:linear-gradient(-90deg,rgba(95,178,255,1),rgba(87,99,255,1));
border-radius:34px;"
          >登录</a-button>
        </a-form-item>

        <!-- <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
        </div>-->
      </a-form>

      <two-step-captcha
        v-if="requiredTwoStepCaptcha"
        :visible="stepCaptchaVisible"
        @success="stepCaptchaSuccess"
        @cancel="stepCaptchaCancel"
      ></two-step-captcha>
    </div>

    <div
      id="copyright"
      style="  
   display:flex;
   justify-content: center;
   width:100%;
    position:absolute;
    bottom:4%;
    height:17px;
    font-size:16px;
    font-family:zihun58hao-chuangzhonghei;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:30px;
   "
    >Copyright &copy; 2019 ShangHai YueWu Information Technology Co., Ltd.</div>
  </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { debuglog } from 'util'
// import { getSmsCaptcha, get2step } from '@/api/login'

export default {
  components: {
    TwoStepCaptcha
  },
  data() {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created() {
    // get2step({})
    //   .then(res => {
    //     this.requiredTwoStepCaptcha = res.result.stepCode
    //   })
    //   .catch(() => {
    //     this.requiredTwoStepCaptcha = false
    //   })
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    ...mapActions(['Login', 'Reset']),
    // handler
    RePassword() {
      alert('5')
      this.Reset()
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => {
          alert('6')
        })
    },
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick(key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this
      // const _this=this;
      // _this.form.validateFields((err,value)=>{
      //    if (!err) {
      //      debugger;
      //      console.log(value)
      //    }
      // })
      // debugger;
      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

      validateFields(['username', 'password'], { force: true }, (err, values) => {
        if (!err) {
          // console.log('login form', values)
          // const loginParams = { ...values }
          // delete loginParams.username
          // loginParams[!state.loginType ? 'email' : 'username'] = values.username
          // loginParams.password =values.password
          let loginParams = new URLSearchParams()
          // debugger;
          loginParams.append('username', values.username)
          loginParams.append('password', values.password)

          // console.log(loginParams)
          //  debugger;
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    // getCaptcha(e) {
    //   e.preventDefault()
    //   const {
    //     form: { validateFields },
    //     state
    //   } = this

    //   validateFields(['mobile'], { force: true }, (err, values) => {
    //     if (!err) {
    //       state.smsSendBtn = true

    //       const interval = window.setInterval(() => {
    //         if (state.time-- <= 0) {
    //           state.time = 60
    //           state.smsSendBtn = false
    //           window.clearInterval(interval)
    //         }
    //       }, 1000)

    //       const hide = this.$message.loading('验证码发送中..', 0)
    //       getSmsCaptcha({ mobile: values.mobile })
    //         .then(res => {
    //           setTimeout(hide, 2500)
    //           this.$notification['success']({
    //             message: '提示',
    //             description: '验证码获取成功，您的验证码为：' + res.result.captcha,
    //             duration: 8
    //           })
    //         })
    //         .catch(err => {
    //           setTimeout(hide, 1)
    //           clearInterval(interval)
    //           state.time = 60
    //           state.smsSendBtn = false
    //           this.requestFailed(err)
    //         })
    //     }
    //   })
    // },
    stepCaptchaSuccess() {
      this.loginSuccess()
    },
    stepCaptchaCancel() {
      // this.Logout().then(() => {
      //   this.loginBtn = false
      //   this.stepCaptchaVisible = false
      // })
    },
    loginSuccess(res) {
      // debugger;
      // console.log(res)
      // let user = window.localStorage.getItem('user')
      // const users = JSON.parse(user)
      // users.type == 1 ? this.$router.push({ name: 'Content' }) : this.$router.push({ name: 'Content1' })
      // 延迟 1 秒显示欢迎信息
      this.$router.push({ name: 'Content' })
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  height: 100%;
  background: url('../../assets/images/03.png') no-repeat;
  .span_1 {
    display: flex;
    justify-content: center;
    padding-top: 5%;
    // width: 376px;
    height: 30px;
    font-size: 48px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(93, 87, 114, 1);
    line-height: 30px;
    margin-bottom: 3%;
  }
  .span_2 {
    display: flex;
    justify-content: center;
    // margin: 0 auto;
    //  width:437px;
    height: 20px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(119, 111, 145, 1);
    line-height: 30px;
  }
}
.main {
  // background: red;
  // display: none;
  width: 20%;
  float: right;
  margin-right: 28%;
  margin-top: 10%;
}
.user-layout-login {
  // height: 100%;
  // background: red;
  .span_3 {
    display: flex;
    justify-content: center;
    font-size: 36px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(102, 96, 121, 1);
  }
  .span_4 {
    display: flex;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 15%;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(156, 156, 156, 1);
  }

  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  /deep/.ant-tabs-ink-bar {
    background-color: #eab822;
  }
  /deep/.ant-tabs-nav .ant-tabs-tab-active {
    color: #eab822;
  }
  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
    #copyright {
    }

    .register {
      float: right;
    }
  }
}
</style>
