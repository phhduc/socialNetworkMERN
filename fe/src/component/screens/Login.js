import React, {useState, useContext} from "react";
import {Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import {userContext} from '../../App'
const Login=()=>{
    const {state, dispatch} = useContext(userContext)
    const navigate= useNavigate();
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const PostData=()=>{
        // eslint-disable-next-line
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            M.toast({html:"Sai email"})
            return
        }
        fetch("/api/signin",{
            method:"post",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html: "đăng nhập thành công"})
                navigate("/")
            }
        })
    }
    return (
        <div className="my-card">
            <div className="card auth-card">
                <h2>App name</h2>
                <input
                type="text"
                placeholder="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="mật khẩu"
                value={password}
                onChange={e=>setPassword(e.target.value)}/>
                <button className="waves-effect waves-light btn"
                onClick={e => PostData()}>
                    Đăng Nhập
                </button>
                <h6>
                    <Link to="/signup"> Bạn chưa có tài khoản?</Link>
                </h6>

            </div>
        </div>
    )
}
export default Login