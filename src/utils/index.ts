export const guid = () => {
  return "xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * @desc
 * @param { File } 文件file
 * @return { Boolean } 是图片 true 不是 false
 */
export function isImage(file: any) {
  // 检查文件MIME类型
  return file.type.startsWith("image/");
}

/**
 * 文件上传的方法
 * @param uploadApi 上传文件的api
 */
export const uploadImage = (uploadApi: (params: any) => any) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("multiple", "multiple");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async function (event: any) {
    // 判断是否是图片格式文件
    const file = event.target.files[0];
    if (!isImage(file)) {
      return;
    }
    // TODO:判断文件大小
    const formData = new FormData();
    formData.append("file", file);
    uploadApi(formData);
  };
  input.remove();
};
