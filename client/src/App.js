import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import PageRender from './utils/PageRender'

import {refreshToken} from './redux/actions/authAction'
import { getSuggestions } from './redux/actions/suggestionsAction';

import { GLOBALTYPES } from './redux/actions/globalTypes';
import io from 'socket.io-client'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

import Notify from './components/alert/Alert';
import Header from './components/Header/Header'
import StatusModal from './components/StatusModal';
import { getPosts } from './redux/actions/postAction';



function App() {
  const {auth, status} = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return ()=> socket.close()
   }, [dispatch])

  useEffect(() => {
    if(!("Notification" in window)) {
      alert("This browser does not support desktop notification")
    }
    else if(Notification.permission === "granted") {}
    else if(Notification.permission!=="denied"){
      Notification.requestPermission().then(function(p){
        if(p==="granted"){}
      })
    }
  }, [])

  useEffect(() => {
    if(auth.token){
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])
  
  return (
    <BrowserRouter>
      <Notify />
      <input type="checkbox" id="theme" title='theme-checkbox'/>
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          { auth.token && <SocketClient />
          }
          
          <Routes>
            <Route path="/" element={auth.token?<Home />: <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:page" element={<PageRender />} />
            <Route path="/:page/:id" element={<PageRender />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
