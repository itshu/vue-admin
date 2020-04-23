<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="异常信息">
              <span>{{ props.row.message }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + (listQuery.pageIndex-1)*listQuery.pageSize + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="日志描述" prop="logDescription"/>
      <el-table-column label="方法参数" prop="actionArgs"/>
      <el-table-column label="用户主键" prop="userNo"/>
      <el-table-column label="IP" prop="ip"/>
      <el-table-column label="类名" prop="className"/>
      <el-table-column label="方法名" prop="methodName"/>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否成功">
        <template slot-scope="props">
          <span v-if="props.row.succeed==1">成功</span>
          <span v-if="props.row.succeed==2" style="color: red">异常</span>
        </template>
      </el-table-column>
      <el-table-column label="模块名称" prop="modelName"/>
      <el-table-column label="操作" prop="action"/>
    </el-table>
    <div style="text-align: right" class="marT20">
      <el-pagination
        :page-size="listQuery.pageSize"
        :page-sizes="[10, 100, 300, 400]"
        :total="listQuery.total"
        :current-page="listQuery.pageIndex"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="currentPageChange"/>
    </div>

  </div>
</template>

<script>
import { getList } from '@/api/log'
import { parseTime } from '@/utils/index'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        sortName: 'operation_log_id',
        sortOrder: 'desc',
        formData: {
        }
      },
    }
  },
  created() {
    // this.fetchData()
  },
  mounted() {
     this.fetchData()
  },
  methods: {
    parseTime,
    handleFilter() {
      this.listQuery.pageIndex = 1
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listQuery.total = response.data.total
        this.listLoading = false
      })
    },
    currentPageChange(e) {
      this.listQuery.pageIndex = e
      this.fetchData()
    },
    handleSizeChange(e) {
      this.listQuery.pageSize = e
      this.listQuery.pageIndex = 1
      this.fetchData()
    },
    sortChange(column) {
      this.listQuery.sortName = column.prop
      this.listQuery.sortOrder = column.order
      this.listQuery.pageIndex = 1
      this.fetchData()
    },

    resetForm() {
      this.dataForm = {
        id: undefined,
        arr: '',
        dep: '',
        distance: ''
      }
    }
  }
}
</script>
