import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { userContext } from '../../App'
import '../../App.css'
const Profile = () => {
    const [post, setPost] = useState([]);
    const { state, dispatch } = useContext(userContext);
    const [avatar, setAvatar] = useState();
    const [url, setUrl] = useState("")
    console.log(state)
    useEffect(() => {
        fetch('/api/mypost', {
            headers: {
                "authorization": localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setPost(result.myPost)
            })
            .catch(err => console.log(err))
    }, [])
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
    const UpdateAvatar=()=>{

    }
    return (
        <div style={{ maxWidth: "80%", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: "flex-start",
                margin: "10px 10px",
                gap: "0 20px",
                borderBottom: "1px solid grey"
            }}>
                <div style={{position:"relative"}} className="div-avatar">
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px", zIndex:"0" }}
                        src={state ? state.avatar : ""}
                        alt="avatar" />
                    <button className="btn waves-effect waves-light edit-avatar" type="submit" name="action" 
                    style={{
                        zIndex:"1",
                        opacity:"0",
                        position:"absolute",
                        left:"50%",
                        top:"50%",
                        transform:"translate(-50%, -50%)"
                        }}
                        onClick={()=>UpdateAvatar()} 
                        > Đổi ảnh đại diện
                    </button>
                </div>
                <div>
                    <div>
                        <h4>{state ? state.name : "loadding"}</h4>
                    </div>
                    <div style={{
                        display: "flex",
                        gap: "0 20px",
                        justifyContent: "space-between"
                    }}>
                        <div>
                            <h6>{post.length} bài đăng </h6>
                        </div>
                        <div>
                            <h6>{state ? state.followers.length : "0"} người theo dõi </h6>
                        </div>
                        <div>
                            <h6>{state ? state.following.length : "0"} đang theo dõi</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    post.filter(i => i.photo !== "no photo").map(item => {
                        return (
                            <img src={item.photo} className="item" alt={item.title} key={item._id} />
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Profile