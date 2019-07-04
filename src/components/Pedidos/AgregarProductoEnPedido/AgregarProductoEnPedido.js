import React, { Component } from "react";
import axios from "axios";

class AgregarProductoEnPedido extends Component {
  state = {
    rubros: [],
    subRubros: [],
    productos: [],
    cantidad: 0,
    idProducto: null
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/rubros")
      .then(response => {
        this.setState({ rubros: response.data });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:8080/subRubros")
      .then(response => {
        this.setState({ subRubros: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  getProductosByRubro(event) {
    console.log(event.target.value);
  }
  getProductosBySubRubro(event) {
    console.log(event.target.value);
    axios
      .get(`http://localhost:8080/productosBySubRubro/${event.target.value}`)
      .then(response => {
        this.setState({ productos: response.data });
      })
      .catch(error => console.log(error));
  }
  agregarProducto = () => {
    console.log(
      this.props.numeroPedido,
      this.state.idProducto,
      this.state.cantidad
    );
    axios
      .post(
        `http://localhost:8080/agregarProductoEnPedido/${
          this.props.numeroPedido
        }/${this.state.idProducto}/${this.state.cantidad}`
      )
      .then(response => {
        console.log("Item response: ", response);
        // this.setState({ resultado: response.data });
        this.agregarEnTabla(response.data);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  };

  agregarEnTabla(producto) {
    // this.setState({ cuit: "" });
    this.props.metodo(producto);
  }
  render() {
    let rubros = this.state.rubros ? null : <option>Cargando...</option>;
    if (this.state.rubros) {
      rubros = this.state.rubros.map(rubro => {
        return (
          <option key={rubro.codigo} value={rubro.codigo}>
            {rubro.descripcion}
          </option>
        );
      });
    }
    let subRubros = this.state.subRubros ? null : <option>Cargando...</option>;
    if (this.state.subRubros) {
      subRubros = this.state.subRubros.map(subRubro => {
        return (
          <option key={subRubro.codigo} value={subRubro.codigo}>
            {subRubro.descripcion}
          </option>
        );
      });
    }
    let productos = this.state.productos ? null : <option>Cargando...</option>;
    if (this.state.productos) {
      productos = this.state.productos.map(producto => {
        return (
          <option key={producto.identificador} value={producto.identificador}>
            {producto.nombre}
          </option>
        );
      });
    }
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
              <div className="form-group row">
                <div className="col-6">
                  <label>Subrubro</label>
                  <select
                    className="custom-select"
                    onChange={event => this.getProductosBySubRubro(event)}
                  >
                    <option defaultValue>Seleccionar Subrubro</option>
                    {subRubros}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-6">
                  <label>Producto</label>
                  <select
                    className="custom-select"
                    onChange={event =>
                      this.setState({ idProducto: event.target.value })
                    }
                  >
                    <option defaultValue>Seleccionar Producto</option>
                    {productos}
                  </select>
                </div>
                <div className="col-6">
                  <label>Cantidad</label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    placeholder="Cantidad"
                    onChange={event =>
                      this.setState({ cantidad: event.target.value })
                    }
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
                data-dismiss="modal"
                onClick={this.agregarProducto}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AgregarProductoEnPedido;
