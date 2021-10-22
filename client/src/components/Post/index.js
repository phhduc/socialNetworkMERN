import React, {Component} from "react";
import "./Post.css";
class Post extends Component{
    render(){
            return <article className="Post" ref="Post">
                <header>
                <div className="Post-user">
                    <div className="Post-user-avatar">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_tabby_and_white_kitten_n01.jpg/300px-Golden_tabby_and_white_kitten_n01.jpg" alt="avatar"/>
                    </div>
                  <div className="Post-user-nickname">
                      <span>user nick name</span>
                    </div>
                </div>
                </header>
                <div className="Post-Image">
                    <div className="Post-image-bg">
                        <img alt="day la anh" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_tabby_and_white_kitten_n01.jpg/300px-Golden_tabby_and_white_kitten_n01.jpg"/>
                    </div>
                </div>
                <div className="Post-cap">
                    <p><strong>user: </strong>caption post</p>
                </div>
            </article>;
    }
}
export default Post;