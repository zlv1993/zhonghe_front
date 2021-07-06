<template>
  <a-modal v-model="visible" :title="title" :footer="null">
    <a-form
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="名称">
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '名称必填' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="页面路径">
        <a-input
          v-decorator="[
            'url',
            { rules: [{ required: true, message: '页面路径必填' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="路径重定向">
        <a-input v-decorator="['redirect']" />
      </a-form-item>

      <a-form-item label="Component">
        <a-input
          v-decorator="[
            'component',
            { rules: [{ required: true, message: 'Component必填' }] },
          ]"
        />
      </a-form-item>

      <a-form-item label="Icon">
        <a-input v-decorator="['icon']" />
      </a-form-item>

      <a-form-item label="类型">
        <a-select
          v-decorator="[
            'type',
            { rules: [{ required: true, message: '类型必填' }] },
          ]"
          placeholder="请选择权限类型"
        >
          <a-select-option value="0"> 目录 </a-select-option>
          <a-select-option value="1"> 接口 </a-select-option>
          <a-select-option value="2"> 按钮 </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="父级">
        <a-tree-select
          v-decorator="[
            'pid',
            { rules: [{ required: true, message: '父级元素必选' }] },
          ]"
          show-search
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择"
          allow-clear
          tree-default-expand-all
        >
          <a-tree-select-node
            key="0"
            value="0"
            title="根节点"
          ></a-tree-select-node>
          <a-tree-select-node
            v-for="val in url"
            :key="val.id"
            :value="val.id"
            :title="val.name"
          >
            <a-tree-select-node
              v-for="v in val.children"
              :key="v.id"
              :value="v.id"
              :title="v.name"
            >
            </a-tree-select-node>
          </a-tree-select-node>
        </a-tree-select>
      </a-form-item>

      <a-form-item label="展示">
        <a-radio-group v-decorator="['display']">
          <a-radio-button value="1"> 是 </a-radio-button>
          <a-radio-button value="0"> 否 </a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="弹窗">
        <a-radio-group v-decorator="['jump']">
          <a-radio-button value="1"> 是 </a-radio-button>
          <a-radio-button value="0"> 否 </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 8, offset: 8 }">
        <a-button type="primary" html-type="submit"> 提交 </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addPermisson, updatePermisson } from '@/api/permission'
export default {
  data () {
    return {
      formLayout: 'horizontal',
      title: "新增权限",
      UrlId: null,
      visible: false,
      url: [],
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  mounted () {
    this.$root.Bus.$on('addUrl', (json) => {
      this.visible = true
      this.url = json.url
      const formVal = json.data
      if (formVal) {
        this.title = "编辑权限"
        this.$nextTick(() => {
          this.UrlId = formVal.id
          this.form.setFieldsValue({
            name: formVal.name,
            url: formVal.url,
            redirect: formVal.redirect,
            component: formVal.component,
            icon: formVal.icon,
            type: formVal.type + '',
            jump: formVal.jump + '',
            display: formVal.display + '',
            pid: formVal.pid + ''
          })
        })
      } else {
        this.$nextTick(() => {
          this.UrlId = null
          this.form.setFieldsValue({
            name: "",
            url: "",
            redirect: "",
            component: "",
            icon: "",
            type: "1",
            display: "1",
            pid: "0",
            jump: "0"
          })
        })
      }

    })
  },
  beforeDestroy () {
    this.$root.Bus.$off("addUrl")
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {


          if (this.UrlId === null) {
            addPermisson(values).then(() => {
              this.$message.success("保存成功")
              this.$root.Bus.$emit('urlListrender')
              this.visible = false

            })
          } else {
            values.id = this.UrlId
            updatePermisson(values).then(() => {
              this.$message.success("更新成功")
              this.$root.Bus.$emit('urlListrender')
              this.visible = false
            })

          }


        }
      });
    },
  },
};
</script>