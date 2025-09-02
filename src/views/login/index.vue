<template>
  <div class="container">
    <div class="footer">
      <van-nav-bar
  title="登录"
  left-text="返回"

  left-arrow
  @click-left="$router.go(-1)"

/>
    </div>
    <div class="content">
      <van-form @submit="onSubmit" class="content1">
      <van-field
        v-model="form.mobile"
        name="手机号"
        label="手机号"
        placeholder="手机号"

        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
       v-model="num"
       type="passma"
       name="验证码"
       label="验证码"
       placeholder="图行验证码"
       :rules="[{ required: true, message: '请输入图行验证码' }]"
      />
      <img :src="base" alt="" @click="changeImgFn">
      <div class="textword">
        <van-field
       v-model="form.captchaCode"
       type="textword"
       name="短信验证码"
       label="短信验证码"
       placeholder="短信验证码"
       :rules="[{ required: true, message: '请填写短信验证码' }]"
      />
      <button @click="getTextFn">{{ totalSecond === second ? '获取验证码': second+'秒后获取' }}</button>
      </div>
       <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click="submitFn"> 登录</van-button>
       </div>
    </van-form>

    </div>

  </div>
</template>

<script>
import request from '@/utils/request'
import { getTextAPI, submitAPI } from '@/api/index'
export default {
  name: 'login-index',
  data () {
    return {
      num: '',
      base: '',
      textword: '',
      totalSecond: 60,
      second: 60, // 当前秒数
      timer: null,
      suscode: '246810',

      form: {
        captchaKey: '',
        captchaCode: '',
        mobile: ''

      }

    }
  },
  methods: {
    onSubmit () {

    },
    async changeImgFn () {
      const res = await request.get('/captcha/image')

      this.form.captchaKey = res.data.key
      this.base = res.data.base64
    },
    async getTextFn () {
      // 校验
      if (!this.validFn()) {
        return false
      } else {
        // 开启倒计时,如果有定时器开着就不需要再开
        if (!this.timer && this.totalSecond === this.second) {
          this.timer = setInterval(() => {
            this.second--
            if (this.second <= 0) {
              clearInterval(this.timer)
              this.timer = null
              this.second = this.totalSecond
            }
          }, 1000)
        }

        const res = await getTextAPI(this.form)
        if (res.status === 200) {
          this.$toast('发送成功')
        } else {
          this.$toast('发送失败')
        }
        console.log(res)
      }
    },
    // 校验方法
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.form.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.num)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 登录
    async submitFn () {
      // 校验
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.form.captchaCode)) {
        return
      }
      const res = await submitAPI(this.suscode, this.form.captchaCode)
      console.log(res)
      this.$router.push('/')
    }

  },
  async created () {
    const res = await request.get('/captcha/image')
    console.log(res)
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }

}

</script>

<style scoped lang="less">
.container{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footer{
  width: 100%;
  height: 120px;
  text-align: center;
}
.content{

  width: 100%;
  height: 80%;
  margin-bottom: 0px;
  display: flex;
  justify-content: center;

}
.textword{
  display: flex;
button{
  width: 100px;
  height: 20px;

}
}
img{
  width: 100px;
  height: 20px;
}
</style>
