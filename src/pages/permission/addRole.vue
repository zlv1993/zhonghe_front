<template>
  <a-modal v-model="visible" :title="title" @ok="handleOk" :footer="null">
    <a-form
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item v-show="false" label="用户id">
        <a-input v-decorator="['id']" />
      </a-form-item>
      <a-form-item label="角色名称(中文)">
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '角色名称(中文)必填' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="角色名称(英文)">
        <a-input
          v-decorator="[
            'role',
            { rules: [{ required: true, message: '角色名称(英文)' }] },
          ]"
        />
      </a-form-item>

      <a-form-item label="角色描述">
        <a-input
          v-decorator="[
            'remark',
            { rules: [{ required: true, message: '角色描述必填' }] },
          ]"
        />
      </a-form-item>

      <a-form-item label="权限">
        <a-tree
          v-model="checkedKeys"
          checkable
          :expanded-keys="expandedKeys"
          :selected-keys="selectedKeys"
          :tree-data="treeData"
          @expand="onExpand"
          @select="onSelect"
          :checkStrictly="true"
          :replaceFields="replaceFieldsData"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 8, offset: 8 }">
        <a-button type="primary" html-type="submit"> 提交 </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addRole, updateRole } from "@/api/role"
import { generateMenu } from "@/utils/common"
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex'
import { allPermisson, getByRoleId } from '@/api/permission'


export default {
  data () {
    return {
      formLayout: 'horizontal',
      title: "新增角色",
      visible: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      treeData: [],
      replaceFieldsData: { children: 'children', title: 'name', key: 'id' }

    };
  },
  computed: {
    ...mapState('user', [
      'userInfo'
    ])
  },
  mounted () {
    this.$root.Bus.$on('addRole', async (json) => {
      this.visible = true
      let tokenVal = await getToken();
      this.expandedKeys = []
      this.checkedKeys = []
      this.selectedKeys = []

      allPermisson({ token: tokenVal }).then(res => {
        let permissionUrl = res.data ? res.data : []
        let url = generateMenu(permissionUrl, [], 0)
        this.treeData = url
      })
      if (json.id == undefined) {
        this.form.setFieldsValue({
          id: "",
          name: "",
          role: "",
          remark: "",
        })

      } else {
        let { id, name, role, remark } = json

        this.form.setFieldsValue({
          id,
          name,
          role,
          remark,
        })
        getByRoleId({ roleId: id }).then(res => {
          let checkPermission = []
          res.data.forEach(element => {
            checkPermission.push(element.id)
          });
          this.checkedKeys = checkPermission
          //alert(JSON.stringify(res))
        })
      }



    })


  },
  beforeDestroy () {
    this.$root.Bus.$off("addRole")
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {

          let rolePermissions = []
          this.checkedKeys.checked.forEach(item => {
            rolePermissions.push({ roleId: values.id, permissionId: item })
          })
          values.rolePermissions = rolePermissions
          if (values.id != "") {
            updateRole(values).then(() => {
              this.$message.success("更新成功")
              this.$root.Bus.$emit('roleListrender')
              this.visible = false
            })
          } else {
            addRole(values).then(() => {
              this.$message.success("保存成功")
              this.$root.Bus.$emit('roleListrender')
              this.visible = false
            })
          }

        }
      });
    },
    handleSelectChange (value) {
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    },

    handleOk () {
      this.visible = false;
    },

    ///树事件
    onExpand (expandedKeys) {
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck (checkedKeys) {
      this.checkedKeys = checkedKeys;
    },
    onSelect (selectedKeys) {

      this.selectedKeys = selectedKeys;
    },
  },
};
</script>