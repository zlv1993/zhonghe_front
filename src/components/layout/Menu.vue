<template>
  <a-layout-sider v-model="collapsed">
    <a-menu
      theme="dark"
      :selectedKeys="[$route.path]"
      :openKeys.sync="openKeys"
      mode="inline"
      @click="handleClick"
    >
      <template v-for="v in menuList">
        <template v-if="!v.children">
          <a-menu-item
            :key="v.redirect ? v.redirect : v.url"
            :attr-jump="v.jump"
          >
            <a-icon :type="v.icon" /><span>{{ v.name }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <a-sub-menu :key="v.url">
            <span slot="title"
              ><a-icon :type="v.icon" /><span>{{ v.name }}</span></span
            >
            <template v-for="val in v.children">
              <a-menu-item :key="val.url" :attr-jump="val.jump">
                {{ val.name }}
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      openKeys: [''],
    };
  },
  created () {
    this.$route.matched.forEach(item => {
      this.openKeys.push(item.path)
    });


  },
  props: ["collapsed"],
  watch: {
  },
  computed: {
    ...mapState('user', {
      menuList: 'menuList'
    })
  },
  methods: {
    handleClick (e) {
      this.openKeys = e.keyPath
      this.$router.push(e.key)
    },

  },
};
</script>
