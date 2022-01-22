import React from 'react'

const Modal = ({modalId, title, footer,children}) => {
    return (
        <div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={modalId+"Label"} aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id={`${modalId}Label`}>{title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        {children}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
