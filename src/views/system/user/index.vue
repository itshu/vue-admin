<template>
  <div class="app-container">
    <eHeader :roles="roles" :flights="flights" :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="username" label="用户名"/>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="viewAvatarApi + scope.row.avatar" class="el-avatar">
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号"/>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1">激活</span>
          <span v-if="scope.row.status==2">禁用</span>
          <span v-if="scope.row.status==3">删除</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN','USER_ALL','USER_EDIT'])" :data="scope.row" :roles="roles" :flights="flights" :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['ADMIN','USER_ALL','USER_DELETE'])"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/user'
import { getRoleTree } from '@/api/role'
import { tree } from '@/api/rmsregion'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import store from '@/store'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      roles: [], delLoading: false, sup_this: this,flights: []
    }
  },
  computed: {
    ...mapGetters([
      'viewAvatarApi'
    ])
  },
  created() {
    this.getRoles()
    this.getFlights()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'user/users'
      const sort = 'id,desc'
      const query = this.query
      const type = query.type
      const value = query.value
      const status = query.status
      this.params = { page: this.page, size: this.size, sort: sort }
      if (type && value) { this.params[type] = value }
      if (status !== '' && status !== null) { this.params['status'] = status }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    getRoles() {
      getRoleTree().then(res => {
        this.roles = res
      })
    },
    getFlights() {
      tree({level:4}).then(res => {
        this.flights = res.data
      })
    },
  }
}
</script>

<style scoped>

</style>
