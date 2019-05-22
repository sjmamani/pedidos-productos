import React from "react";
import AgregarProducto from "../AgregarProducto/AgregarProducto";

const Modal = () => {
  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <AgregarProducto />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" className="btn btn-primary">
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
