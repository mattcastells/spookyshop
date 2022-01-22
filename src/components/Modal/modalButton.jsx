import React from 'react'

const ModalButton = ({modalId,text}) => {
    return (
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#"+modalId}>
            {text}
        </button>
    )
}

export default ModalButton
