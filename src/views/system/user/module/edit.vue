<template>
  <div>
    <el-button :disabled="data.id === 1" size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :roles="roles" :flights="flights" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    roles: {
      type: Array,
      required: true
    },
    flights: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    // index.vue 的this 可用于刷新数据
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.roleIds = []
      _this.flightIds = []
      _this.form = { id: this.data.id, username: this.data.username, mobile: this.data.mobile, status: this.data.status.toString(), roles: [], flights: [] }
      this.data.roleList.forEach(function(data, index) {
        _this.roleIds.push(data.id)
      })
      this.data.flightList.forEach(function(data, index) {
        _this.flightIds.push(data)
      })
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
