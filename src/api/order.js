import request from '@/utils/request'

// 获取订单结算信息
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart => obj:{ cartIds } / buyNow => obj:{ goodsId, goodsNum, goodsSkuId }
      delivery: 10, // 10快递配送 20门店自提
      couponId: 0, // 优惠券ID 0不使用
      isUsePoints: 0, // 积分 0不使用
      ...obj
    }
  })
}

// 提交订单
export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 10快递配送 20门店自提
    couponId: 0, // 优惠券ID 0不使用
    isUsePoints: 0, // 积分 0不使用
    ...params
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
