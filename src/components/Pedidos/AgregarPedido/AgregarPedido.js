import React, { Component } from "react";
import axios from "axios";

class AgregarPedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuit: "",
      resultado: null,
      error: false
    };

    this.setCuitHandler = this.setCuitHandler.bind(this);
  }

  setCuitHandler(event) {
    this.setState({ cuit: event.target.value });
  }

  agregarPedido = () => {
    axios
      .post(`http://localhost:8080/pedido/${this.state.cuit}`)
      .then(response => {
        console.log(response);
        this.setState({ resultado: response.data });
        this.agregarEnTabla(response.data);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  };

  agregarEnTabla(pedido) {
    this.props.push(pedido);
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
