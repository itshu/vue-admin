<template>
  <div>
    <el-button :disabled="data.id === 1" size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :permissions="permissions" :menus="menus" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    menus: {
      type: Array,
      required: true
    },
    permissions: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.permissionIds = []
      _this.menuIds = []
      _this.form = { id: this.data.id, roleName: this.data.roleName, roleCode: this.data.roleCode, permissions: [],menus:[] }
      this.data.permissions.forEach(function(data, index) {
        _this.permissionIds.push(data.id)
      })
      this.data.menus.forEach(function(data, index) {
        _this.menuIds.push(data.id)
      })
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
