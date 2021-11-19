import './App.css';
import React, {useState, createContext, useReducer, useEffect, useContext} from 'react';
import NavBar from './component/NavBar';
import {BrowserRouter,Route,Routes, useNavigate, useLocation} from 'react-router-dom'
import Home from './component/screens/Home';
import SignUp from './component/screens/SignUp';
import Profile from './component/screens/Profile';
import Login from './component/screens/Login';
import CreatePost from './component/screens/CreatePost';
import UserProfile from './component/screens/UserProfile';
import {reducer, initialState} from './reducers/userReducer'
import FollowPost from './component/screens/FollowPost';

export const userContext = createContext();
const Routing = ()=>{
  const navigative = useNavigate()
  const {state, dispatch} = useContext(userContext)
  const userLocaltion = useLocation()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
    } 
    else {
      if(userLocaltion.pathname !== "/signup")
      navigative('/login')
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  return(
    <Routes>
      <Route path="/*" element={<Home />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile/*" element={<Profile />} />
      <Route path="/createpost" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/followpost" element={<FollowPost />} />
      </Routes>
  )
}

function App() {
  const [state, dispatch]= useReducer(reducer, initialState)
  return (
    <userContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <NavBar/>
      <Routing /> 
    </BrowserRouter>

    </userContext.Provider>
  )
}

export default App;
