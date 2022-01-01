import React from 'react'
const Toast = ({ msg, handleShow, bgColor }) => {
    
    return (
        <div className={`toast show position-absolute text-light ${bgColor}`}
            style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}
            data-bs-autohide="true"
        >
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="me-auto text-light">{msg.title}</strong>
                <button className="btn-close"
                    aria-label='Close'
                    data-bs-dismiss="toast"
                    style={{ outline: "none" }}
                    onClick={handleShow}>

                </button>
            </div>
            <div className="toast-body">
                {msg.body}
            </div>
        </div>
    )
}

export default Toast
