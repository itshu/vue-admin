<template>
  <div class="div">
    <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="420px" style="width: 100%;">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="优化" name="first">
          <el-form-item label="cut off percent">
            <el-input style="width:200px;" size="small" v-model="dataForm.cut_off_percent" clearable></el-input>
          </el-form-item>
          <el-form-item label="faremix max loop">
            <el-input style="width:200px;" size="small" v-model="dataForm.faremix_max_loop" clearable></el-input>
          </el-form-item>
          <el-form-item label="seat parking method">
            <el-select placeholder="请选择" v-model="dataForm.seat_parking_method">
              <el-option label="All_Classes_Equally" value="All_Classes_Equally"/>
              <el-option label="Bottom_Class" value="Bottom_Class"/>
            </el-select>
          </el-form-item>
          <el-form-item label="ued">
            <el-input style="width:200px;" size="small" v-model="dataForm.ued" clearable></el-input>
          </el-form-item>
          <el-form-item label="ues">
            <el-input style="width:200px;" size="small" v-model="dataForm.ues" clearable></el-input>
          </el-form-item>
          <el-form-item label="overbook model">
            <el-select placeholder="请选择" v-model="dataForm.overbook_model">
              <el-option label="max_revenue" value="max_revenue"/>
              <el-option label="min_cost" value="min_cost"/>
            </el-select>
          </el-form-item>
            <el-button type="primary" @click="saveData" align="right">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="配置2" name="second">配置2</el-tab-pane>
        <el-tab-pane label="配置3" name="third">配置3</el-tab-pane>
        <el-tab-pane label="配置4" name="fourth">配置4</el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
  import { saveParameter,detailParameter } from '@/api/rmsparameter'
  export default{
    name: 'Tree',
    data() {
      return {
        activeName: 'first',
        dataForm:{
          cut_off_percent:'',
          faremix_max_loop:'',
          seat_parking_method:'',
          overbook_model:'',
          ued:'',
          ues:'',
        },
        rules: {
          influenceName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          influenceType: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
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
        detailParameter(param).then(response => {
          let list = response.data
          for (var p in list){
            this.dataForm[list[p].paramKey] = list[p].paramValue
          }
        })
      },
      saveData() {
        let datas = []
        let keys = Object.keys(this.dataForm)
        for (var p in keys){
          let data = {param_key:keys[p],param_value:this.dataForm[keys[p]]}
          datas.push(data)
        }
        console.log(datas)
        saveParameter(datas)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '保存成功'
            })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
        })
      }
    }
  }
</script>

<style>
  .div{
    margin-left: 10px;
    margin-top: 10px;
  }
</style>
