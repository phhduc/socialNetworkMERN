import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../redux/actions/authAction'
import {useDispatch, useSelector} from 'react-redux'

export default function Login() {
    const initialState = { username: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { username, password } = userData
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch();
    const navigator = useNavigate()
    useEffect(()=>{
        if(auth.token) navigator('/');
    },[auth.token, navigator])
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }
    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">Dlu network</h3>
                <input type="text" placeholder='tên đăng nhập ...' className="form-control" id="username" name="username" value={username} onChange={handleChangeInput} />
                <br />
                <input type="password" placeholder='nhập mật khẩu' autoComplete='on' className="form-control" id="password" name="password" value={password} onChange={handleChangeInput} />
                <br />
                <button type='submit' className="btn btn-dark btn-block w-100"
                    disabled={username&&password?false:true}
                >Đăng nhập</button>
                <p className='my-2'>
                    Bạn chưa có tài khoản? <Link to='/register' style={{color: 'crimson'}}>Đăng ký ngay</Link>
                </p>
            </form>
        </div>
    )
}
