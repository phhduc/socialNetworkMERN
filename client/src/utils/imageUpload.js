export const checkImage = (file) =>{
    let err = '';
    if(!file) return err = 'ảnh không tồn tại'
    if(file.size>1024*1024) err = "ảnh quá lớn, vui lòng chọn ảnh nhỏ hơn 1MB"

    if(file.type !== "image/jpeg" && file.type !== "image/png") err = "ảnh không đúng định dạng"
    return err
}

export const imageUpload = async (images) =>{
    let imgs = [];
    for(const item of images){
        const data = new FormData();
        if(item.camera){
            data.append("file", item.camera)
        } else {
            data.append("file", item)
        }
        data.append("upload_preset", "doancoso")
        data.append("cloud_name", "dv4dqguu2")
        const res = await fetch("https://api.cloudinary.com/v1_1/dv4dqguu2/upload", {
            method: "post",
            body: data
        })
        const resData = await res.json()
        imgs.push({public_id: resData.public_id, url: resData.url})
    }
    return imgs;
}