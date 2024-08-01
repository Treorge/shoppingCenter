import request from '@/utils/request'

export const getPicCode = () => {
  return request.get('/captcha/image')
}

export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    body: {
      form: {
        captchaCode,
        captchaKey,
        mobile
      }
    }
  })
}

export const checkMsgCode = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {}
    }
  })
}
