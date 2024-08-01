<template>
  <div class="login">
    <van-nav-bar
      title="用户登录"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicData" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{ currentSecond === totalSecond ? '获取验证码' : currentSecond + '秒后重新发送' }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { checkMsgCode, getMsgCode, getPicCode } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picUrl: '',
      picKey: '',
      currentSecond: 60,
      totalSecond: 60,
      timer: null,
      picCode: '',
      mobile: '',
      msgCode: ''
    }
  },
  async created () {
    this.getPicData()
  },
  methods: {
    async getPicData () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
      this.$toast.success('成功获取图形验证码')
    },
    checkVali () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.checkVali()) {
        return
      }
      if (!this.timer && this.currentSecond === this.totalSecond) {
        await getMsgCode(this.picCode, this.picKey, this.mobile).then(() => {
          this.$toast.success('发送成功')
          this.timer = setInterval(() => {
            this.currentSecond--
            if (this.currentSecond < 1) {
              clearInterval(this.timer)
              this.timer = null
              this.currentSecond = this.totalSecond
            }
          }, 1000)
        })
      }
    },
    // 登录
    async login () {
      if (!this.checkVali()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的验证码')
        return
      }
      const res = await checkMsgCode(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
      this.$toast.success('登录成功')
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
