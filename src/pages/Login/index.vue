<!--
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2021-12-16 16:18:40
-->
<template>
  <div class="loginPage">
    <header>宗教治理管理平台</header>
    <main>
      <p class="title">
        <span>账号密码登录</span>
      </p>
      <a-form
        :form="form"
        @submit="_handleSubmit"
      >
        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input
            v-decorator="[
              'userAccount',
              { rules: [{ required: true, message: '请输入用户名！' }] },
            ]"
            placeholder="用户名"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input-password
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码！' }] },
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            block
            :disabled="hasErrors(form.getFieldsError())"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </main>
  </div>
</template>

<script>
// import MD5 from 'crypto-js/md5'
// import api from '@api'
// const { login } = api.login
function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
  data () {
    return {
      hasErrors,
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    // Only show error after a field is touched.
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userAccount') && getFieldError('userAccount')
    },
    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    _handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // TODO:调登录接口，存token，跳转home主界面
          Promise.resolve().then(() => {
            localStorage.setItem('token', '1111111')
            this.$router.push('/home')
          })
          // const { userAccount, password } = values
          // login({ userAccount, password: MD5(password).toString() }).then(msg => {
          //   this.$globalStore.setGlobalState({ token: msg.data.access_token })
          //   this.$router.push('/home')
          // })
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
@import "./index.less";
</style>
