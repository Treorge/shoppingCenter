<template>
  <div class="address">
    <van-nav-bar fixed title="地址列表" left-arrow @click-left="$router.go(-1)" />
    <van-address-list class="list"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { getAddressList } from '@/api/address'
import { Toast } from 'vant'
export default {
  name: 'AddressIndex',
  async created () {
    this.getAddressList()
  },
  data () {
    return {
      chosenAddressId: '1',
      list: []
    }
  },
  methods: {
    onAdd () {
      Toast('新增地址')
      this.$router.push('/addressedit')
    },
    onEdit (item, index) {
      Toast('编辑地址:' + index)
    },
    async getAddressList () {
      if (this.isLogin) {
        const { data: { list } } = await getAddressList()
        this.list = list
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  }
}
</script>

<style lang="less" scoped>
.address {
  padding-top: 46px;
  padding-bottom: 46px;
  ::v-deep {
    .van-nav-bar__arrow {
      color: #333;
    }
  }
}
.list .van-address-list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  background: url(@/assets/border-line.png) bottom repeat-x;
  background-size: 60px auto;
}
</style>
