const valid = ({ username, password, fullname, email, r_password }) => {
    const err = {}
    if (!fullname) {
        err.fullname = "Vui lòng nhập tên đầy đủ"
    } else if (fullname.length > 25) {
        err.fullname = "Tên quá dài, vui lòng nhập tối đa 25 ký tự"
    }
    if (!username) {
        err.username = "vui lòng nhập tên đăng nhập"
    } else if (username.replace(/ /g, '').length > 25) {
        err.username = "Tên đăng nhập quá dài, vui lòng nhập tối đa 25 ký tự"
    }
    
    if (!email) {
        err.email = "vui lòng nhập email"
    } else if (!ValidateEmail(email)) {
        err.email = "Email không hợp lệ"
    }

    if(!password){
        err.password = "vui lòng nhập mật khẩu"
    } else if(password.length < 6){
        err.password = "Mật khẩu quá ngắn, vui lòng nhập tối thiểu 6 ký tự"
    }
    if(password!==r_password){
        err.r_password = "Mật khẩu không trùng khớp"
    }
    return {
        errMsg:err,
        errLeng: Object.keys(err).length
    }
}
function ValidateEmail(mail) 
{
    // eslint-disable-next-line
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) //no-useless-escape
  {
    return (true)
  }
    return (false)
}
export default valid