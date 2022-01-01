import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import NotifyModal from '../NotifyModal'
const Menu = () => {
    const navLinks = [
        { label: 'Trang chủ', icon: 'home', path: '/' },
        { label: 'Tin nhắn', icon: 'near_me', path: '/message' },
        { label: 'Khám phá', icon: 'explore', path: '/discover' }
    ]
    const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive =
        (path) => {
            return path === pathname ? 'active' : ''
        }
    const handleLogout = useCallback(
        () => {
            dispatch(logout())
        }, [dispatch]
    )
    return (


        <div className="menu">
            <ul className="navbar-nav flex-row gap-3">
                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item ${isActive(link.path)} `} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className='material-icons'>{link.icon}</span>
                            </Link>
                        </li>
                    ))
                }
                <li className="nav-item dropdown" style={{ opacity: 1 }} >
                    <span className="nav-link position-relative" id="navbarDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        <span className="material-icons"
                            style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>
                            favorite
                        </span>

                        <span className="notify_length">{notify.data.length}</span>

                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                        style={{ transform: 'translateX(75px)' }}>
                        <NotifyModal />
                    </div>

                </li>
                <li className="nav-item dropdown" style={{ opacity: 1 }}>
                    <span className="nav-link dropdown-toggle" id="navbarDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={auth.user.avatar} alt='avatar' className='avatar'
                            style={{ width: 40, height: 40, filter: `${theme ? 'invert(1)' : 'invert(0)'}` }} />
                    </span>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Hồ sơ</Link></li>
                        <label htmlFor='theme' className='dropdown-item'
                            onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}>
                            {theme ? 'Ban ngày' : 'Ban đêm'}
                        </label>
                        <li><hr className="dropdown-divider" /> </li>
                        <li><Link className="dropdown-item" to={'/'} onClick={handleLogout}>Đăng xuất</Link></li>
                    </ul>
                </li>

            </ul>
        </div>


    )
}

export default Menu
