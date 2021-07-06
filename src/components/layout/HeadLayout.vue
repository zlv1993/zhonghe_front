<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="changeCollapse(!collapsed)"
    />
    <a-dropdown class="ant-dropdown-content">
      <span class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        <a-avatar :src="logoImg" alt="图表无法展示" class="mr10" />{{
          userInfo.username
        }}
        <a-icon type="down" />
      </span>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;" @click="logout">退出</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </a-layout-header>
</template>
<script>
import { mapState } from 'vuex'
import { removeToken } from '@/utils/auth'
export default {
  data () {
    return {
    };
  },
  created () {


  },
  props: ["collapsed"],
  watch: {
  },
  computed: {
    ...mapState('user', {
      userInfo: 'userInfo'
    }),
    logoImg () {
      return process.env.VUE_APP_SERVICEHOST + this.userInfo.avator
    }
  },
  methods: {
    logout () {

      removeToken()
      this.$router.push('/login')

    },
    changeCollapse (toggle) {
      this.$emit('CollapseFunc', toggle)
    }
  },
};
</script>
<style>
.ant-dropdown-content {
  float: right;
  margin-right: 40px;
  min-width: 100px;
}
.ant-dropdown-link {
  height: 100%;
  font-size: 16px;
}
</style>
