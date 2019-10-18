<template>
  <el-upload
    class="avatar-uploader"
    action="/api/user/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log(res);
      this.imageUrl = "/api/" + res.picUrl;
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isjpeg = file.type === "image/jpeg";
      const issize = file.size / 1024 / 1024 < 3;

      if (!isjpeg) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!issize) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isjpeg && issize;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>