<template>
  <div>
    <input type="text" ref="message" />
    <button type="button" @click="sendMessage">提交</button>
  </div>
</template>
<script>

export default {
  data () {
    return {
      websocket: null
    }
  },
  created () {
    this.initWebsocket()
  },
  methods: {
    initWebsocket () {
      this.websocket = new WebSocket(`ws://localhost:7777/websocket/${this.$route.params.room}`)
      //链接发送错误时调用
      this.websocket.onerror = () => {
        console.log('链接错误', 'WebSocket链接错误', 'error')
      }
      //链接成功时调用
      this.websocket.onopen = () => {
        console.log('链接成功', 'WebSocket链接成功', 'success')
      }
      //接收到消息时回调
      this.websocket.onmessage = (event) => {
        console.log(event)
      }
      //链接关闭时调用
      this.websocket.onclose = () => {
        console.log('链接关闭', 'WebSocket链接关闭', 'info')
      }

    },
    sendMessage () {
      let sendMessage = this.$refs.message.value
      this.websocket.send(sendMessage)
    }

  }
}
</script>
<style scoped>
</style>
