<template>
  <div class="expand">
    <p class="warn-content">
    </p>
    <div class="div">
      <el-button @click="handleAddTop">添加区域</el-button>
      <el-button @click="handleExport">导出EXCEL</el-button>
      <el-tree ref="expandMenuList" class="expand-tree"
         v-if="isLoadingTree"
         :data="setTree"
         :props="defaultProps"
         :expand-on-click-node="true"
         :render-content="renderContent"
         :default-expanded-keys="defaultExpandKeys"
         default-expand-all
         node-key="id"
         highlight-current
         @node-click="handleNodeClick" />
    </div>
  </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
  import TreeRender from '@/components/nx-tree'
  import { treeList,addNode,editNode,deleteNode,exportExcel,exportExceltest } from '@/api/rmsregion'

  export default{
    name: 'Region',
    data() {
      return {
        listLoading: true,
        maxexpandId: 100, // 新增节点开始id
        non_maxexpandId: 100, // 新增节点开始id(不更改)
        isLoadingTree: false, // 是否加载节点树
        setTree: [], // 节点树数据
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [] // 默认展开节点列表
      }
    },
    created() {

    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        const param = {
        }
        this.isLoadingTree = true
        treeList(param).then(response => {
          this.setTree = response.data
          // this.initExpand(this.setTree)
        })
      },
      initExpand(treeList) {
        if (!treeList) {
          return;
        }
        for (var j = 0; j < treeList.length; j++) {
          let a = treeList[j]
          this.defaultExpandKeys.push(a.id)
          if (a.children && a.children.length > 0) {
            this.initExpand(a.children);
          }
        }
        this.isLoadingTree = true
      },

      handleNodeClick(d, n, s) { // 点击节点
        // console.log(d,n)
        d.isEdit = false// 放弃编辑状态
      },
      renderContent(h, { node, data, store }) { // 加载节点
        const that = this
        return h(TreeRender, {
          props: {
            DATA: data,
            NODE: node,
            STORE: store
          },
          on: {
            nodeAdd: (s, d, n) => that.handleAdd(s, d, n),
            nodeEdit: (s, d, n) => that.handleEdit(s, d, n),
            nodeEditPass: (s, d, n) => that.handleEditPass(s, d, n),
            nodeDel: (s, d, n) => that.handleDelete(s, d, n)
          }
        })
      },
      handleAddTop() {
        let Atanisi = Math.floor(Math.random() * 999999)
        const param = {
          name:"新增节点" + Atanisi,
          level: 1,
          pid: 0
        }
        addNode(param).then(response => {
          let newId = response.data
          this.setTree.push({
            id: newId,
            name: '新增节点' + Atanisi,
            pid: '0',
            level: 1,
            isEdit: false,
            children: []
          })
        })
      },
      // 下载文件
      handleExport(s, d, n) { //
        exportExcel({}).then(response => {
          console.log("eeee")
          const content = response
          const blob = new Blob([content])
          const fileName = '预测组.xlsx'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        })
      },
      handleAdd(s, d, n) { // 增加节点
        if (n.level >= 16) {
          this.$message.error('最多只支持五级！')
          return false
        }
        let Atanisi = Math.floor(Math.random() * 999999)
        const param = {
          name:"新增节点" + Atanisi,
          level: d.level - 0 + 1,
          pid: d.id
        }
        addNode(param).then(response => {
          let newId = response.data
          // 添加数据
          d.children.push({
            id: newId,
            name: '新增节点' + Atanisi,
            pid: d.id,
            level: d.level - 0 + 1,
            isEdit: false,
            children: []
          })
          // 展开节点
          if (!n.expanded) {
            n.expanded = true
          }
        })
        console.log(s, d, n)
      },
      handleEdit(s, d, n) { // 编辑节点
        console.log(d.isEdit)
        // console.log(s, d, n)
      },
      handleEditPass(s, d, n) { // 编辑节点
        const param = {
          name:d.name,
          id: d.id
        }
        editNode(param).then(response => {
          // this.$message.error(response.message)
        })
      },
      handleDelete(s, d, n) { // 删除节点
        console.log(s, d, n)
        const that = this
        // 有子级不删除
        if (d.children && d.children.length !== 0) {
          this.$message.error('此节点有子级，不可删除！')
          return false
        } else {
          // 新增节点直接删除，否则要询问是否删除
          const delNode = () => {
            const list = n.parent.data.children || n.parent.data // 节点同级数据
            let _index = 99999// 要删除的index
            /* if(!n.parent.data.children){//删除顶级节点，无children
                list = n.parent.data
              }*/
            list.map((c, i) => {
              if (d.id === c.id) {
                _index = i
              }
            })
            const k = list.splice(_index, 1)
            console.log(_index, k)
            this.$message.success('删除成功！')
          }
          const isDel = () => {
            that.$confirm('是否删除此节点？', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // delNode()
              const param = {
                id: d.id
              }
              deleteNode(param).then(response => {
                // delNode()
                s.remove(d);
              })
            }).catch(() => {
              return false
            })
          }
          // 判断是否新增
          // d.id > this.non_maxexpandId ? delNode() : isDel()
          isDel()
        }
      }
    }
  }
</script>

<style>
  .div{
  }
  .expand{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .expand>div{
    height:85%;
    padding-top:20px;
    width:50%;
    margin:20px auto;
    max-width:400px;
    overflow-y:auto;
  }
  .expand>div::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    border-radius:5px;
  }
  .expand>div::-webkit-scrollbar-thumb{
    background-color:rgba(50, 65, 87, 0.5);
    outline:1px solid slategrey;
    border-radius:5px;
  }
  .expand>div::-webkit-scrollbar{
    width:10px;
  }
  .expand-tree{
    border:none;
    margin-top:10px;
  }
  .expand-tree .el-tree-node.is-current,
  .expand-tree .el-tree-node:hover{
    overflow:hidden;
  }
  .expand-tree .is-current>.el-tree-node__content .tree-btn,
  .expand-tree .el-tree-node__content:hover .tree-btn{
    display:inline-block;
  }
  .expand-tree .is-current>.el-tree-node__content .tree-label{
    font-weight:600;
    white-space:normal;
  }
</style>
