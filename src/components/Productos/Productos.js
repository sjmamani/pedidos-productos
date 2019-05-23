import React, { Component } from "react";
import axios from "axios";
import Modal from "./Modal/Modal";

export class Productos extends Component {
  state = {
    productos: null,
    error: false
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/productos")
      .then(response => {
        this.setState({ productos: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  render() {
    let productos = this.state.error ? (
      <p>Error al traer los productos</p>
    ) : (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
    if (this.state.productos) {
      productos = this.state.productos.map((producto, index) => {
        return (
          <tbody key={index}>
            <tr>
              <td>{producto.nombre}</td>
              <td>{producto.marca}</td>
              <td>{producto.codigoBarras}</td>
              <td>${producto.precio}</td>
              <td><button className="btn btn-dark" style={{background: "#001932"}}>Editar</button></td>
              <td><button className="btn btn-dark" style={{background: "#001932"}}>Eliminar</button></td>
            </tr>
          </tbody>
        );
      });
    }
    return (
      <div>
        <div className="d-flex justify-content-between mb-3">
          <h2>Lista de productos</h2>
          <button
            type="button"
            className="btn btn-outline-dark"
            data-toggle="modal"
            data-target=".bd-example-modal-lg"
          >
            Agregar producto
          </button>
          <Modal />
        </div>
        <table className="table">
          <thead style={{backgroundColor: "#001932", color: "#fff"}}>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Marca</th>
              <th scope="col">Código</th>
              <th scope="col">Precio</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          {productos}
        </table>
      </div>
    );
  }
}

export default Productos;
