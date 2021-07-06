<template>
  <div class="expand-container">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">
          <a-avatar :src="logoImg" alt="图表无法展示" class="mr10" />管理系统
        </div>
        <Menu :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <head-layout
          :collapsed="collapsed"
          @CollapseFunc="collpaseStatus"
        ></head-layout>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="true"
      :visible="visible"
      @close="onClose"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>
<script>
import Menu from '@/components/layout/Menu.vue';

import HeadLayout from '@/components/layout/HeadLayout.vue'
export default {
  data () {
    return {
      logoImg: require('@/assets/img/logo.png'),
      collapsed: false,
      visible: true
    };
  },
  components: {
    Menu,
    HeadLayout
  },
  methods: {
    onClose () {
      this.visible = false;
    },
    collpaseStatus (toggle) {
      this.collapsed = toggle
    }
  }

};
</script>
<style>
.expand-container {
  height: 100vh;
  width: 100vw;
}
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  font-size: 14px;
  margin: 16px;
  color: #fff;
  text-align: center;
  overflow: hidden;
}
.mr10 {
  margin-right: 10px;
}
</style>
