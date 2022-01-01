import React from 'react'

const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
            style={{background: "#0008", zIndex: 9999}}
        >
        <div className="loader"></div>
        </div>
    )
}

export default Loading
