import React, { useState, useContext, useEffect } from "react";
import { userContext } from '../../App'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
    const [userProfile, setProfile] = useState(null)
    const { state, dispatch } = useContext(userContext);
    const { userid } = useParams();
    const [showFollow, setFollow] = useState(state?!state.following.includes(userid):true)
    const userLogin = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        fetch(`/api/user/${userid}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setFollow(result.user.followers.includes(userLogin._id)) 
            setProfile(result)
        })
        .catch(err => console.log(err))
    }, [])

    const followUser = () => {
        fetch('/api/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({ followid: userid })
        }).then(res => res.json())
            .then(result => {
                dispatch({ type: "UPDATE", payload: { following: result.following, followers: result.followers } })
                localStorage.setItem("user", JSON.stringify(result))
                setProfile(prevState => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, result._id]
                        }
                    }
                })
                setFollow(false)
            }).catch(err => console.log(err))
    }
    const unfollowUser = () => {
        fetch('/api/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({ followid: userid })
        }).then(res => res.json())
            .then(result => {
                dispatch({ type: "UPDATE", payload: { following: result.following, followers: result.followers } })
                localStorage.setItem("user", JSON.stringify(result))
                setProfile(prevState => {
                    const newFollow = prevState.user.followers.filter(item => item!=result._id)
                    return {
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers: newFollow
                        }
                    }
                })
                setFollow(true)
            }).catch(err => console.log(err))
    }
    return (
        <>
            {userProfile ?

                <div style={{ maxWidth: "80%", margin: "0px auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap:"0 20px",
                        margin: "10px 10px",
                        borderBottom: "1px solid grey"
                    }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px", objectFit:"cover" }}
                                src={userProfile.user.avatar}
                                alt="avatar" />
                        </div>
                        <div>
                            <div>
                                <h4>{userProfile.user.name}</h4>
                            </div>
                            <div style={{
                                display: "flex",
                                gap: "0 20px",
                                justifyContent: "space-between"
                            }}>
                                <div>
                                    <h6>{userProfile.posts.length} bài đăng</h6>
                                </div>
                                <div>
                                    <h6>{userProfile.user.followers.length} người theo dõi </h6>
                                </div>
                                <div>
                                    <h6>{userProfile.user.following.length} đang theo dõi </h6>
                                </div>
                            </div>
                            {showFollow ?
                                <button className="waves-effect waves-light btn"
                                    onClick={e => followUser()}>
                                    Theo dõi
                                </button>
                                :
                                <button className="waves-effect waves-light btn"
                                    onClick={e => unfollowUser()}>
                                    Bỏ theo dõi
                                </button>
                            }
                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userProfile.posts.filter(i => i.photo !== "no photo").map(item => {
                                return (
                                    <img src={item.photo} className="item" alt={item.title} key={item._id} />
                                )
                            })
                        }
                    </div>
                </div>
                :
                <h2>Loading ...</h2>
            }
        </>
    )
}


export default UserProfile