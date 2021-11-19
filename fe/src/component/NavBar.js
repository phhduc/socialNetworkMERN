import React, { useContext, } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { userContext } from "../App";
const NavBar = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(userContext)
    const renderList = () => {
        if (state) {
            return [
                <li key="3"><a href="/profile">Profile</a></li>,
                <li key="4"><a href="/createpost">Create Post</a></li>,
                <li key="6"><a href="/followpost">Following Post</a></li>,
                <li key="5">
                    <button className="btn"
                    onClick={()=>{
                        localStorage.clear();
                        dispatch({type:"CLEAR"})
                        navigate("/login")
                    }} >
                        Logout
                    </button>
                </li>
            ]

        } else {
            return [
                <li key="1"><a href="/login">Login</a></li>,
                <li key="2"><a href="/signup">Sign Up</a></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state?"/":"/login"} className="brand-logo left">App name</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}
export default NavBar;