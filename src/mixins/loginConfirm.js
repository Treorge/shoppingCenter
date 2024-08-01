export default {
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '请登录账号',
          confirmButtonText: '去登录',
          cancelButton: '再逛逛'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(err => {
          console.log(err)
        })
        return true
      }
      return false
    }
  }
}
