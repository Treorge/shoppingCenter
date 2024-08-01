import { getCartList, changeCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, value }) {
      const obj = state.cartList.find(item => item.goods_id === goodsId)
      obj.goods_num = value
    }
  },
  actions: {
    // 获取购物车商品列表
    async getCart (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    // 修改购物车商品数量
    async changeCountAction (context, obj) {
      const { goodsId, value, skuId } = obj
      context.commit('changeCount', {
        goodsId,
        value
      })
      await changeCount(goodsId, value, skuId)
    },
    // 删除购物车数据
    async delSelect (context) {
      const selectCart = context.getters.selectCart
      const cartIds = selectCart.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')

      context.dispatch('getCart')
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    selectCart (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    selectCount (state, getters) {
      return getters.selectCart.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    selectPrice (state, getters) {
      return getters.selectCart.reduce((sum, item, index) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    allCheck (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
