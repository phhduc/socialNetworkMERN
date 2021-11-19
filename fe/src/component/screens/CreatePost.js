import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import M from 'materialize-css'
const CreatePost = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (url) {
            fetch("/api/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        M.toast({ html: data.error })
                    }
                    else {
                        M.toast({ html: "created post" })
                        navigate("/")
                    }
                })
        }
    }, [url]) // eslint-disable-line react-hooks/exhaustive-deps
    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
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

    return (
        <div className="card input-field"
            style={{
                margin: "50px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}
        >
            <input type="text" placeholder="title"
                value={title} onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="body"
                value={body} onChange={e => setBody(e.target.value)} />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file"
                        onChange={e => setImage(e.target.files[0])}
                    />

                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="waves-effect waves-light btn"
                onClick={() => postDetails()}
            >
                Submit post
            </button>

        </div>
    )
}
export default CreatePost