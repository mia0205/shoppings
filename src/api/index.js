import request from '@/utils/request'

// 获取短信验证码
export const getTextAPI = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    },
    headers: {
      platform: 'H5'
    }
  })
}

// 登录接口
export const submitAPI = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    },
    headers: {
      platform: 'H5'
    }
  })
}
