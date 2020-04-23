<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增角色' : '编辑角色'" width="700px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="名称" prop="roleName">
        <el-input v-model="form.roleName" style="width: 570px;"/>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="描述">
        <el-input v-model="form.roleCode" style="width: 570px;" rows="2" type="textarea"/>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="菜单">
              <el-tree
                :data="menus"
                ref="tree"
                show-checkbox
                check-strictly
                node-key="id"
                :default-checked-keys="menuIds"
              >
              </el-tree>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="权限">
              <el-tree
                :data="permissions"
                ref="perm"
                show-checkbox
                node-key="id"
                :default-checked-keys="permissionIds"
              >
              </el-tree>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/role'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    permissions: {
      type: Array,
      required: true
    },
    menus: {
      type: Array,
      required: true
    },
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: { roleName: '', permissions: [],menus: [],  roleCode: '' }, permissionIds: [],menuIds: [],
      rules: {
        roleName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.permissions = []
          this.form.menus = []
          const _this = this
          this.$refs.perm.getCheckedKeys().forEach(function(data, index) {
            const permission = { id: data }
            _this.form.permissions.push(permission)
          })
          this.$refs.tree.getCheckedKeys().forEach(function(data, index) {
            const menu = { id: data }
            _this.form.menus.push(menu)
          })
          // this.$refs.tree.getHalfCheckedKeys().forEach(function(data, index) {
          //   const menu = { id: data }
          //   _this.form.menus.push(menu)
          // })
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.permissionIds = []
      this.menuIds = []
      this.form = { name: '', permissions: [],menus:[], remark: '' }
    }
  }
}
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 106px;
    height:300px;
    overflow:auto
  }
</style>
