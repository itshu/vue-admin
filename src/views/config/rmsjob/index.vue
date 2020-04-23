<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.formData.flightNo" clearable class="filter-item" style="width: 200px;" placeholder="请输入航班号"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @sort-change="sortChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-steps align-center>
            <el-step v-for="node in props.row.nodes" :title="node.nodeName" :description="node.endTime" :key="node.id" :status="node.status"></el-step>
          </el-steps>
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + (listQuery.pageIndex-1)*listQuery.pageSize + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="航班号" prop="flightNo" sortable="custom"/>
      <el-table-column label="日期" prop="invDate" sortable="custom"/>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleStart(scope.row)">开始</el-button>
        </template>
      </el-table-column>
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
import { getList,createData,updateData,deleteData,exportCsv } from '@/api/rmsjob'

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
        sortName: '',
        sortOrder: '',
        formData: {
          flightNo:''
        }
      },
      dataForm: {
        id: undefined,
        arr: '',
        dep: '',
        distance: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        arr: [{ required: true, message: '不能为空', trigger: 'blur' }],
        dep: [{ required: true, message: '不能为空', trigger: 'blur' }],
        distance: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
    },
    handleStart(row) {
      let param = {
        "carr":"CZ",
        "fltn":"3104",
        "inv_date": "2017-03-01",
        "origin":"PEK",
        "destination":"CAN",
        "ccls":"('F','Y','J')",
        "start_date":"20160727",
        "end_date":"20161027"
      }
      exportCsv(param)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '任务开始'
          })
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
  }
}
</script>
