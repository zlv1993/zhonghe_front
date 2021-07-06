<template>
  <div id="login-content">
    <a-form-model
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-model-item>
        <a-input size="large" v-model="form.username" placeholder="用户名">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          size="large"
          type="text"
          v-model="form.password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-checkbox> 记住我 </a-checkbox>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  data () {
    return {
      form: {
        username: '张三',
        password: '张三'
      }
    }
  },

  created () {
    let that = this;
    document.onkeypress = function (e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.submitForm();
        return false;
      }
    };
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.submitForm()
    },
    submitForm () {
      login(this.form).then(res => {
        setToken(res.data.token)
        let redirect = this.$route.query.redirect
        if (redirect) {
          this.$router.push({ path: redirect })
        } else {
          this.$router.push({ path: '/dashboard' })
        }

      });
    },

  },
};
</script>
<style scoped>
#login-content {
  background-image: url("../assets/img/login2.jpg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}
#components-form-demo-normal-login {
  width: 460px;
  padding: 20px;
  margin: 0px auto;
  position: relative;
  top: 200px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>