import request from '@/utils/request'

// 获取商品列表
export const getGoodsList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

// 获取商品详情数据
export const getGoodsDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getGoodsComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
