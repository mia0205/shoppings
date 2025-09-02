import request from '@/utils/request'

// 获取短信验证码
export const getTextAPI = ({ captchaCode, captchaKey, mobile }) => {
  return request({
    url: '/captcha/sendSmsCaptcha',
    method: 'POST',
    data: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录接口
export const submitAPI = (mobile, smsCode) => {
  return request({
    url: '/passport/login',
    method: 'POST',
    data: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
