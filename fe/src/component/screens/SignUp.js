import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvarta] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])
    const uploadAvatar = () => {
        const data = new FormData()
        data.append("file", avatar)
        data.append("upload_preset", "doancoso")
        data.append("cloud_name", "dv4dqguu2")
        fetch("https://api.cloudinary.com/v1_1/dv4dqguu2/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => console.log(err))

    }


    const uploadFields = () => {
        // eslint-disable-next-line
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            M.toast({ html: "Sai email" })
            return
        }
        fetch("/api/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                avatar:url
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    return M.toast({ html: data.error })
                } else {
                    M.toast({ html: "saved success" })
                    navigate('/login')
                }
            })
    }
    const PostData =() => {
        if(avatar){
            uploadAvatar()
        }else{
            uploadFields()
        }
    }
    return (
        <div className="my-card">
            <div className="card auth-card">
                <h2>App name</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload Image</span>
                        <input type="file"
                            onChange={e => setAvarta(e.target.files[0])}
                        />

                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="waves-effect waves-light btn"
                    onClick={e => PostData()}>
                    Sign Up
                </button>
                <h6>
                    <Link to="/login">Already have an account?</Link>
                </h6>
            </div>
        </div>
    )
}
export default SignUp