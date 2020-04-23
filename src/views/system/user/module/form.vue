<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增用户' : '编辑用户'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio v-model="form.status" label="1">激活</el-radio>
        <el-radio v-model="form.status" label="2" >禁用</el-radio>
        <el-radio v-model="form.status" label="3" >删除</el-radio>
      </el-form-item>
      <el-form-item label="角色">
        <treeselect v-model="roleIds" :multiple="true" :options="roles" style="width: 370px;" placeholder="请选择角色" />
      </el-form-item>
      <el-form-item style="margin-bottom: 0px;" label="航班">
        <el-select v-model="flightIds" multiple placeholder="请选择航班" style="width: 370px;">
          <el-option
            v-for="item in flights"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/user'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Form',
  components: { Treeselect },
  props: {
    roles: {
      type: Array,
      required: true
    },
    flights: {
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
      dialog: false, loading: false, form: { username: '', mobile: '', status: '1', roles: [], flights: [] }, roleIds: [], flightIds: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        // mobile: [
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //   { type: 'mobile', message: '请输入正确的手机号', trigger: 'blur' }
        // ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
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
          this.form.roleList = []
          this.form.flights = []
          const _this = this
          this.roleIds.forEach(function(data, index) {
            const role = { id: data }
            _this.form.roleList.push(role)
          })
          this.flightIds.forEach(function(data, index) {
            const flight = { id: data }
            _this.form.flights.push(data)
          })
          _this.form.flights = _this.form.flights.join()
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
          message: '默认密码：123456',
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
      this.roleIds = []
      this.flightIds = []
      this.form = { username: '', mobile: '', status: '1', roles: [], flights: [] }
    }
  }
}
</script>

<style scoped>

</style>
