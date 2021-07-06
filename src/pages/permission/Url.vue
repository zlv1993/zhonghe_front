<template>
  <div>
    <a-page-header
      class="mb16"
      style="border-bottom: 1px solid rgb(235, 237, 240)"
      title="角色管理"
    />
    <a-button icon="user-add" @click="addUrl()">新增</a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :rowKey="
        (record, index) => {
          return record.id;
        }
      "
    >
      <span slot="type" slot-scope="text, record">
        {{ record.type | convert(["页面", "接口", "按钮"]) }}
      </span>
      <span slot="display" slot-scope="text, record">
        {{ record.display | convert }}
      </span>
      <span slot="jump" slot-scope="text, record">
        {{ record.jump | convert }}
      </span>

      <span slot="action" slot-scope="text, record">
        <a-popconfirm
          cancelText="取消"
          okText="确定"
          v-if="data.length"
          title="您确要删除?"
          @confirm="() => del(record)"
        >
          <a> 删除</a>
        </a-popconfirm>

        <a-divider type="vertical" />
        <a @click="editUrl(record)">编辑</a>
      </span>
    </a-table>
    <add-url></add-url>
  </div>
</template>
<script>
import { allPermisson, delBatch } from '@/api/permission'
import { getToken } from '@/utils/auth'
import addUrl from "@/pages/permission/addUrl"
import { generateMenu } from "@/utils/common"
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'component',
    dataIndex: 'component',
    key: 'component',
  },
  {
    title: 'redirect',
    dataIndex: 'redirect',
    key: 'redirect',
  },
  {
    title: 'icon',
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    title: '类型',
    scopedSlots: { customRender: 'type' },
    key: 'type',
  },
  {
    title: '是否展示',
    scopedSlots: { customRender: 'display' },
    key: 'dispaly',
  },
  {
    title: '是否跳转',
    scopedSlots: { customRender: 'jump' },
    key: 'jump',
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
      pagination: false,

    };
  },
  mounted () {
    this.init()
    this.$root.Bus.$on('urlListrender', () => {
      this.init()
    })
  },
  beforeDestroy () {
    this.$root.Bus.$off("urlListrender")
  },
  components: {
    addUrl
  },
  methods: {
    async init () {
      let tokenVal = await getToken();
      allPermisson({ token: tokenVal }).then(res => {
        let permissionUrl = res.data ? res.data : []
        let url = generateMenu(permissionUrl, [], 0)

        this.data = url
      })
    },
    addUrl () {
      this.$root.Bus.$emit('addUrl', { url: this.data })
    },
    editUrl (data) {
      this.$root.Bus.$emit('addUrl', { url: this.data, data: data })
    },

    del (record) {
      let delIdArray = []
      this.delIdList(record, delIdArray)
      delBatch({ ids: delIdArray.join(',') }).then(() => {
        this.$message.success("删除成功")
        this.init()
      })


    },
    delIdList (record, ids) {
      ids.push(record.id)
      if (record.children) {
        record.children.forEach(res => {
          ids.push(res.id)
          if (res.children) {
            this.delIdList(res.children, ids)
          }
        })

      }


    }


  }
};
</script>
