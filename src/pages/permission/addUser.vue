<template>
  <a-modal v-model="visible" :title="title" @ok="handleOk" :footer="null">
    <a-form
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="用户名">
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '账户名必填' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="昵称">
        <a-input
          v-decorator="[
            'nickName',
            { rules: [{ required: true, message: '昵称必填' }] },
          ]"
        />
      </a-form-item>

      <a-form-item label="密码">
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '密码必填' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-decorator="['email']" />
      </a-form-item>

      <a-form-item label="手机">
        <a-input v-decorator="['phone']" />
      </a-form-item>

      <a-form-item label="头像">
        <upload-avator
          @getAdvator="setAvatorUrl"
          :avator="imgUrl"
        ></upload-avator>
        <a-input v-show="false" v-decorator="['avator']" />
      </a-form-item>

      <a-form-item label="角色">
        <a-select
          v-decorator="[
            'roleId',
            { rules: [{ required: true, message: '请选择角色' }] },
          ]"
          placeholder="请选择角色"
        >
          <a-select-option v-for="v in roles" :value="v.id" :key="v.id">
            {{ v.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 8, offset: 8 }">
        <a-button type="primary" html-type="submit"> 提交 </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { userInsert, userUpdate } from "@/api/user"
import UploadAvator from '@/components/uploadAvator.vue';
export default {
  data () {
    return {
      formLayout: 'horizontal',
      title: "新增用户",
      visible: false,
      roles: [],
      userData: {},
      userId: null,
      form: this.$form.createForm(this, {}),
      imgUrl: ''
    };
  },
  components: {
    UploadAvator
  },
  mounted () {
    this.$root.Bus.$on('addUser', (json) => {
      this.visible = true
      this.roles = json.roles
      const formVal = json.data
      this.userData = json.data
      if (formVal) {
        this.title = "编辑用户"
        this.$nextTick(() => {
          this.userId = formVal.id
          this.imgUrl = process.env.VUE_APP_SERVICEHOST + formVal.avator
          this.form.setFieldsValue({
            username: formVal.username,
            nickName: formVal.nickName,
            password: "",
            email: formVal.email,
            phone: formVal.phone,
            avator: formVal.avator,
            roleId: formVal.roleId
          })
        })
      } else {
        this.$nextTick(() => {
          this.userId = null
          this.imgUrl = ''
          this.form.setFieldsValue({
            username: "",
            nickName: "",
            password: "",
            email: "",
            phone: "",
            avator: "",
            roleId: ""
          })
        })
      }
    })
  },
  beforeDestroy () {
    this.$root.Bus.$off("addUser")
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let params = { user: {}, userRole: {} }
          params.userRole.roleId = values.roleId
          delete values.roleId
          params.user = values
          if (this.userId === null) {
            userInsert(params).then(() => {
              this.$message.success("保存成功")
              this.$root.Bus.$emit('userListrender')
              this.visible = false

            })
          } else {
            params.user.id = this.userId
            params.userRole.userId = this.userId
            params.userRole.id = this.userData.urId
            userUpdate(params).then(() => {
              this.$message.success("更新成功")
              this.$root.Bus.$emit('userListrender')
              this.visible = false
            })

          }
        }
      });
    },
    handleOk () {
      this.visible = false;
    },
    setAvatorUrl (url) {
      this.imgUrl = process.env.VUE_APP_SERVICEHOST + url
      this.form.setFieldsValue({
        avator: url
      })
    }
  },
};
</script>