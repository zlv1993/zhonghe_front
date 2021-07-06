<template>
  <a-result
    status="404"
    title="404"
    sub-title="啊哦，您访问的当前页面不存在"
  >
    <template #extra>
      <a-button type="primary" @click="goHome()"> 主页 </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    goHome(){
      this.$router.replace('/dashboard')
    }
  }
};
</script>