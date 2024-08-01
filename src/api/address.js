import request from '@/utils/request'

// 获取地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 添加收货地址
export const addAddress = (name, phone, region) => {
  return request.post('/address/add', {
    form: {
      name,
      phone,
      region
    }
  })
}
