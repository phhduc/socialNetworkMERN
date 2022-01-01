import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {register} from '../redux/actions/authAction'
import { useNavigate, Link } from 'react-router-dom'
export default function Register() {
    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialState = { username: '', password: '', fullname: '', email: '' , gender: 'male', r_password:''}
    const [userData, setUserData] = useState(initialState)
    const {  username , password, fullname, email, r_password } = userData
    useEffect(() => {
        if (auth.token) navigate('/')
    }, [auth.token, navigate])
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }
    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">Dlu network</h3>
                <div className="form-group">
                    <label htmlFor='fullname'>Tên đầy đủ: </label>
                    <input type="text" className="form-control" id="fullname" name="fullname" value={fullname} onChange={handleChangeInput}
                        style={{background: `${alert.fullname?'#fd2d6a14':''}`}}
                        />
                    <small className='form-text text-danger'>
                        {alert.fullname? alert.fullname:''}
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor='username'>Tên đăng nhập: </label>
                    <input type="text" className="form-control" id="username" name="username" value={username.toLowerCase().replace(/ /g, '')} onChange={handleChangeInput} 
                    style={{background: `${alert.username?'#fd2d6a14':''}`}}
                        />
                    <small className='form-text text-danger'>
                        {alert.username? alert.username:''}
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email: </label>
                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleChangeInput} 
                    style={{background: `${alert.email?'#fd2d6a14':''}`}}
                        />
                    <small className='form-text text-danger'>
                        {alert.email? alert.email:''}
                    </small>

                </div>
                <div className="form-group">
                    <label htmlFor='password'>Mật khẩu: </label>
                    <input type="password" autoComplete='on' className="form-control" id="password" name="password" value={password} onChange={handleChangeInput} 
                    style={{background: `${alert.password?'#fd2d6a14':''}`}}
                        />
                    <small className='form-text text-danger'>
                        {alert.password? alert.password:''}
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor='r_password'>Nhập lại mật khẩu: </label>
                    <input type="password" autoComplete='on' className="form-control" id="r_password" name="r_password" value={r_password} onChange={handleChangeInput} 
                    style={{background: `${alert.r_password?'#fd2d6a14':''}`}}
                        />
                        <small className='form-text text-danger'>
                        {alert.r_password? alert.r_password:''}
                    </small>
                </div>
                <div className='row justify-content-between mx-0 mb-1'>
                    <label htmlFor='male' className='col-sm'>
                        Nam: <input type='radio' id='male' name='gender'
                        value='male' defaultChecked onChange={handleChangeInput}/>
                    </label>
                    <label htmlFor='female' className='col-sm'>
                        Nữ: <input type='radio' id='female' name='gender'
                        value='female'  onChange={handleChangeInput}/>
                    </label>
                    <label htmlFor='other' className='col-sm'>
                        Khác: <input type='radio' id='other' name='gender'
                        value='other'  onChange={handleChangeInput}/>
                    </label>
                </div>
                <br/>
                <button type='submit' className="btn btn-dark btn-block w-100">Đăng ký</button>
                <p className='my-2'>
                    Bạn đã có tài khoản? <Link to='/login' style={{ color: 'crimson' }}>Đăng nhập ngay</Link>
                </p>
            </form>
        </div>
    )
}
