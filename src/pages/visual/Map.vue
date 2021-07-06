<template>
  <el-amap vid="amapDemo" :zoom="zoom" :center="center">
    <el-amap-marker
      v-for="marker in markers"
      :key="marker.title"
      :title="marker.title"
      :position="marker.position"
      :events="marker.events"
      :visible="marker.visible"
    ></el-amap-marker
  ></el-amap>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '1579f0bcc71cc4b47a95c14c7d3422a0',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
export default {
  name: "map",
  data () {
    return {
      zoom: 10,
      center: [115.933256, 39.888159],
      markers: [
        {
          position: [116.397026, 39.918058],
          events: {
            click: () => {
              this.center = [116.397026, 39.918058];
              self.zoom = 18;
            },
          },
          visible: true,
          title: "bejing",
        },
        {
          position: [104.067571, 30.639665],
          events: {
            click: () => {
              this.center = [104.067571, 30.639665];
              this.zoom = 15;
              console.log(this.center, this.zoom);
            },
          },
          visible: true,
          title: "tiyuguan",
        },
        {
          position: [104.07332, 30.665513],
          events: {
            click: () => {
              this.center = [104.07332, 30.665513];
              this.zoom = 15;
              console.log(this.center, this.zoom);
            },
          },
          visible: true,
          title: "这是哪里",
        },
      ]
    }

  },
  computed: {

  },
  methods: {

  },
}
</script>

<style >
.basic-layout {
  height: 100%;
  width: 100%;
}
</style>