const baseUrl = process.env.BASE_API
const api = {
  state: {
    // 实时控制台
    socketApi: baseUrl + '/websocket?token=kl',
    // 图片上传
    imagesUploadApi: baseUrl + '/api/pictures',
    // 修改头像
    updateAvatarApi: baseUrl + '/resource/avatar',
    // 查看头像
    viewAvatarApi: baseUrl + '/resource/view?filePath=',
    // 上传文件到七牛云
    qiNiuUploadApi: baseUrl + '/api/qiNiuContent'
  }
}

export default api
