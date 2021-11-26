import React, { useState, useEffect, useContext } from "react";
import { userContext } from '../../App'
import { Link } from "react-router-dom";
const FollowPost = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(userContext);
    useEffect(() => {
        fetch('/api/followpost', {
            method: "get",
            headers: {
                "authorization": localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])
    const showImage = (photo) => {
        if (photo === "no photo") {
            return ""
        } else {
            return <img src={photo} alt="" />
        }
    }
    const likePost = (id) => {
        fetch('/api/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const unlikePost = (id) => {
        fetch('/api/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const makeComment = (text, postId) => {
        fetch('/api/comments', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newComment = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newComment)
            })
            .catch(err => console.log(err))
    }
    const delPost = (postId) =>{
        fetch(`/api/delpost/${postId}`,{
            method: "delete",
            headers:{
                "authorization":localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result =>{
            console.log(result);
            const newData = data.filter(i=>i._id!== result._id)
            setData(newData)
        })
    }
    return (
        <div className="home">
            {
                data.map((item) => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <div style={{margin:"10px"}}>
                            <img 
                                    style={{
                                        margin:"10px",
                                        width: "50px", 
                                        height: "50px", 
                                        borderRadius: "25px",
                                        float:"left",
                                        objectFit:'cover'
                                        }}
                                    src={item.postBy.avatar}
                                    alt="avatar" />
                            <h5 style={{lineHeight:"60px", position:"relative"}}><Link to={ item.postBy._id == state._id?"/profile":"/profile/"+item.postBy._id} >{item.postBy.name} </Link>
                            { 
                                item.postBy._id == state._id
                                && 
                                <i className="material-icons" style={{ float:"right" }}
                                    onClick={()=>delPost(item._id)}
                                >delete</i>
                            } 
                            </h5>

                            <div>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                            </div>

                            </div>
                            <div className="card-image">
                                {
                                    showImage(item.photo)
                                }
                            </div>
                            <div className="card-content">
                                {item.likes.includes(state._id) ?
                                    <i className="material-icons" onClick={() => unlikePost(item._id)}>thumb_down</i>
                                    :
                                    <i className="material-icons" onClick={() => likePost(item._id)}>thumb_up</i>
                                }
                                <h6> {item.likes.length} lượt thích</h6>
                                
                                {
                                    item.comments.map(i =>{
                                        return (
                                            <h6 key={i._id}><span style={{fontWeight:"500"}}>{i.postBy.name} đã bình luận:</span>{i.text}</h6>
                                        )
                                    })
                                }                                
                                <form
                                    onSubmit={e => {
                                        e.preventDefault()
                                        makeComment(e.target[0].value, item._id)
                                        e.target[0].value=""
                                    }} 
                                >
                                    <input
                                        type="text"
                                        placeholder="thêm bình luận"
                                    />
                                </form>
                            </div>
                        </div>

                    )
                })
            }

        </div>
    )
}
export default FollowPost