<template>
  <div>
    <a-page-header
      class="mb16"
      style="border-bottom: 1px solid rgb(235, 237, 240)"
      title="角色管理"
    />
    <a-button icon="user-add" @click="addRole()">新增</a-button>
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
        <a @click="editRole(record)">编辑</a>
      </span>
    </a-table>
    <add-role></add-role>
  </div>
</template>
<script>
import { roleList, roleDel } from '@/api/role'

import addRole from "@/pages/permission/addRole"

const columns = [
  {
    title: "角色(英文)",
    dataIndex: "role",
    width: "25%",
  },
  {
    title: "角色（中文)",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "age" },
  },
  {
    title: "描述",
    dataIndex: "remark",
    width: "25%",
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
    this.getrolelist()
    this.$root.Bus.$on('roleListrender', () => {
      this.getrolelist()
    })

  },
  beforeDestroy () {
    this.$root.Bus.$off("roleListrender")
  },
  methods: {
    addRole () {//新增用户
      this.$root.Bus.$emit('addRole', {})
    },
    editRole (data) {
      this.$root.Bus.$emit('addRole', data)
    },
    getrolelist () {
      this.loading = true
      roleList({
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current,
      }).then((res) => {
        this.loading = false
        this.pagination.total = res.count
        this.data = res.data
      })
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager
      this.getuserlist()
    },
    del (id) {
      roleDel({ id }).then(() => {
        this.getrolelist()
      })
    },

  },
  components: {
    addRole
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
