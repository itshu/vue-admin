<template>
  <div class="div">
    <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="220px" style="width: 100%;">

      <el-form-item label="航空公司名称">
        <el-input style="width:200px;" size="small" v-model="dataForm.airline_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="航空公司二字码">
        <el-input style="width:200px;" size="small" v-model="dataForm.airline_code" clearable></el-input>
      </el-form-item>
      <el-form-item label="系统LOGO">
        <el-upload
          class="avatar-uploader"
          name="files"
          :action="uploadPath"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="系统时间">
        <el-date-picker style="width:200px;" size="small" clearable type="date" value-format="yyyy-MM-dd" v-model="dataForm.sys_date" clearable></el-date-picker>
        <el-button type="primary" @click="nowDate" align="right">当前时间</el-button>
      </el-form-item>
      <el-table
        :data="flightData1"
        style="width: 100%">
        <el-table-column label="" prop="name" sortable="custom"/>
        <el-table-column label="最早起飞时间" prop="early" sortable="custom"/>
        <el-table-column label="最晚起飞时间" prop="longest" sortable="custom"/>
      </el-table>
      <el-table
        :data="flightData2"
        style="width: 100%">
        <el-table-column label="" prop="name" sortable="custom"/>
        <el-table-column label="最早时间" prop="early" sortable="custom"/>
        <el-table-column label="最新时间" prop="longest" sortable="custom"/>
      </el-table>
      <el-button type="primary" @click="saveData" align="right">保存</el-button>
    </el-form>
  </div>
</template>
<script>
  import { saveParameter,detailParameter,uploadResource } from '@/api/rmsparameter'
  import { getToken } from '@/utils/auth'
  export default{
    name: 'Tree',
    data() {
      return {
        activeName: 'first',
        uploadPath: process.env.BASE_API + "/resource",
        imageUrl: '',
        headers: {
          'Authorization': getToken()
        },
        flightData1:[
          {"name":"航班订单","early":"2013-05-30 08:00:00","longest":"2018-07-26 12:00:00"},
          {"name":"离岗时间","early":"0001-05-30 08:00:00","longest":"2018-07-26 12:00:00"}
        ],
        flightData2:[
          {"name":"预测时间","early":"2017-07-01 17:00:00","longest":"2017-07-28 09:04:00"},
          {"name":"优化时间","early":"2017-07-27 11:00:00","longest":"2017-07-26 12:00:00"},
          {"name":"航司数据生成时间","early":"2103-05-30 08:00:00","longest":"2018-07-26 12:00:00"},
          {"name":"系统数据导入时间","early":"2018-09-17 15:25:00","longest":"2018-09-26 12:00:00"}
        ],
        dataForm:{
          airline_name:'',
          airline_code:'',
          logo:'',
          sys_date:''
        },
        rules: {
          airline_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          airline_code: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
            if(list[p].paramKey == 'logo'){
              this.imageUrl = process.env.BASE_API + "/resource/view?filePath="+list[p].paramValue;
              console.log(this.imageUrl)
            }
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.dataForm.logo = res.data[0]
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
      },
      nowDate(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.dataForm.sys_date = currentdate
      }
    }
  }
</script>

<style>
  .div{
    margin-left: 10px;
    margin-top: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 100px;
    display: block;
  }
</style>
