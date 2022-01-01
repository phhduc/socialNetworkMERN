import React, { useEffect } from 'react'

import Status from '../components/home/Status'
import Posts from '../components/home/Posts'
import RightSideBar from '../components/home/RightSideBar'

import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'


let scroll = 0;

const Home = () => {
    const { homePosts } = useSelector(state => state)

    window.addEventListener('scroll', () => {
        if (window.location.pathname === '/') {
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: 'smooth' })
        }, 100)
    }, [])

    return (
        <div className="home row mx-0">
            <div className="col-md-8">
                <Status />

                {
                    homePosts.loading
                        ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                        : (homePosts.result === 0 && homePosts.posts.length === 0)
                            ? <h2 className="text-center">Bạn chưa đăng gì</h2>
                            : <Posts />
                }

            </div>

            <div className="col-md-4">
                <RightSideBar />
            </div>

            <footer className="bd-footer bg-light fixed-bottom" style={{}}>

                <div style={{ opacity: 0.5 }} className="position-absolute bottom-0 end-0" >

                    <small className="d-block">
                        Đây là mạng xã hội Dlu network
                    </small>

                    <small>
                        &copy; 2021 Dlu network
                    </small>
                </div>

            </footer>
        </div>
    )
}

export default Home