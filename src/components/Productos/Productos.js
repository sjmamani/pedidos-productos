import React, { Component } from "react";
import axios from "axios";
import AgregarProducto from "./AgregarProducto/AgregarProducto";
import Tabla from "../UI/Tabla/Tabla";

const HEADERS = ["Nombre", "Marca", "Código", "Precio", "", ""];

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

  eliminarProducto(id) {
    console.log("Se eliminó el producto con id: " + id);
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
      productos = this.state.productos.map(producto => {
        return (
          <tbody key={producto.identificador}>
            <tr>
              <td>{producto.nombre}</td>
              <td>{producto.marca}</td>
              <td>{producto.codigoBarras}</td>
              <td>${producto.precio}</td>
              {/* Para editar seguro se necesite un <Link> */}
              <td>
                <button
                  className="btn btn-dark"
                  style={{ background: "#001932" }}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  className="btn btn-dark"
                  style={{ background: "#001932" }}
                  onClick={this.eliminarProducto.bind(this, producto.identificador)}
                >
                  Eliminar
                </button>
              </td>
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
          <AgregarProducto />
        </div>
        <Tabla headers={HEADERS} contenido={productos} />
      </div>
    );
  }
}

export default Productos;
