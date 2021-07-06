<template>
  <div>
    <a-page-header
      class="mb16"
      style="border-bottom: 1px solid rgb(235, 237, 240)"
      title="用户管理"
    />
    <a-form-model layout="inline" class="mb16" :model="form">
      <a-form-item label="用户名">
        <a-input v-model="form.username" />
      </a-form-item>
      <a-form-item label="角色">
        <a-select
          v-model="form.roleId"
          style="width: 205px"
          placeholder="请选择"
        >
          <a-select-option value=""> 全部 </a-select-option>
          <a-select-option v-for="v in roles" :value="v.id" :key="v.id">
            {{ v.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-space size="middle">
          <a-button type="primary" icon="search" @click="getuserlist"
            >搜索</a-button
          >
          <a-button icon="user-add" @click="addUser()">新增</a-button>
        </a-space>
      </a-form-item>
    </a-form-model>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :rowKey="
        (record, index) => {
          return index;
        }
      "
    >
      <span slot="tag" slot-scope="tag">
        <a-tag color="volcano">
          {{ tag }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-popconfirm
          cancelText="取消"
          okText="确定"
          v-if="data.length"
          title="您确要删除?"
          @confirm="() => del(record.id)"
        >
          <a> 删除</a>
        </a-popconfirm>

        <a-divider type="vertical" />
        <a @click="editUser(record)">编辑</a>
      </span>
    </a-table>
    <add-user></add-user>
  </div>
</template>
<script>
import addUser from "@/pages/permission/addUser"
import { userList, userDel } from '@/api/user'
import { roleAll } from '@/api/role'
// 列表头部信息
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',

  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    key: 'nickName',

  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'phone',

  },
  {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
    scopedSlots: { customRender: 'tag' },
  },
  {
    title: ' 操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },

];



export default {
  data () {
    return {
      data: [],
      roles: [],
      form: {},
      columns,
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      }

    };
  },
  mounted () {
    this.getuserlist()
    roleAll().then(res => {//获取角色
      this.roles = res.data
    })
    this.$root.Bus.$on('userListrender', () => {
      this.getuserlist()
    })
  },
  methods: {
    addUser () {//新增用户
      this.$root.Bus.$emit('addUser', { roles: this.roles })
    },
    editUser (data) {
      this.$root.Bus.$emit('addUser', { roles: this.roles, data: data })
    },
    getuserlist () {//获取用户列表
      this.loading = true
      userList({
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current,
        ...this.form
      }).then((res) => {
        this.loading = false
        this.pagination.total = res.count
        this.data = res.data
      })
    },
    del (id) {
      userDel(id).then(() => {
        this.getuserlist()
      })
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager
      this.getuserlist()
    }
  },
  components: {
    addUser
  },
  beforeDestroy () {
    this.$root.Bus.$off("userListrender")
  }
};
</script>
