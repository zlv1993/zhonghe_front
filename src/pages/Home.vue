<template>
  <line-echart :data="data"></line-echart>
</template>
<script>
import LineEchart from '@/components/echarts/LineEchart.vue'
export default {
  data () {
    return {
      data: [5, 20, 36, 10, 10, 20]
    };
  },
  components: {
    LineEchart
  },
  created () {
    setTimeout(() => {
      this.data = [20, 36, 100, 30, 40]
    }, 5000)
  },
  methods: {

  },
};
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
