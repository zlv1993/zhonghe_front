<template>
  <a-upload
    name="file"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    action="/api/upload"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="avator" :src="avator" alt="avator" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
    };
  },
  props: ['avator'],
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        this.$emit('getAdvator', info.file.response.data)
      }
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isLt2M;
    },
  }
};
</script>
<style scoped>
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
