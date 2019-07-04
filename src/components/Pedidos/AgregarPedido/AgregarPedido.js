import React, { Component } from "react";
import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class AgregarPedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuit: "",
      resultado: null
    };
    this.setCuitHandler = this.setCuitHandler.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  setCuitHandler(event) {
    this.setState({ cuit: event.target.value });
  }

  agregarPedido = () => {
    axios
      .post(`http://localhost:8080/pedido/${this.state.cuit}`)
      .then(response => {
        this.setState({ resultado: response.data });
        this.agregarEnTabla(response.data);
      })
      .catch(error => {
        this.notificationDOMRef.current.addNotification({
          title: "Error",
          message: `No existe cliente con el CUIT ingresado`,
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "zoomIn"],
          animationOut: ["animated", "zoomOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      });
  };

  agregarEnTabla(pedido) {
    this.setState({ cuit: "" });
    this.props.push(pedido);
    this.notificationDOMRef.current.addNotification({
      title: "Agregado",
      message: `Se agregó el pedido`,
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "zoomIn"],
      animationOut: ["animated", "zoomOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-group row mx-auto">
                <div className="col-12">
                  <label>CUIT</label>
                  <input
                    className="form-control"
                    placeholder="Ingresar CUIT del cliente"
                    type="text"
                    value={this.state.cuit}
                    onChange={this.setCuitHandler}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                // data-dismiss="modal"
                onClick={this.agregarPedido}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AgregarPedido;
