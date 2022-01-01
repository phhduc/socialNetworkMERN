import React from 'react';
import { useParams, Navigate } from 'react-router-dom'
import NotFound from '../components/NotFound';
import { useSelector } from 'react-redux';
const generatePage = (pageName) => {
    const component = () => require(`../pages/${pageName}`).default;
    try {
        return React.createElement(component());
    } catch (err) {
        return <NotFound />
    }
}
export default function PageRender() {
    const { page, id } = useParams();
    const { auth } = useSelector(state => state);
    let pageName = "";
    if (auth.token) {
        if (id) {
            pageName = `${page}/[id]`;
        } else {
            pageName = `${page}`;
        }
    }
    else {
        return <Navigate to='/login'/>
    }
    return generatePage(pageName);
}
