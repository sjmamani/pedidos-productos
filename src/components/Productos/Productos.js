import React, { Component } from "react";
import axios from "axios";
import AgregarProducto from "./AgregarProducto/AgregarProducto";
import Tabla from "../UI/Tabla/Tabla";

const HEADERS = ["Nombre", "Marca", "Código", "Precio"];

export class Productos extends Component {
  state = {
    productos: [],
    producto: {},
    rubros: [],
    subRubros: [],
    error: false,
    modal: false
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
    axios
      .get("http://localhost:8080/rubros")
      .then(response => {
        this.setState({ rubros: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
    axios
      .get("http://localhost:8080/subRubros")
      .then(response => {
        this.setState({ subRubros: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  eliminarProducto(id) {
    console.log("Se eliminó el producto con id: " + id);
  }

  verDetalle(producto) {
    console.log(producto);
    const p = { ...producto };
    this.setState({ producto: p, modal: true });
  }

  agregarProducto = producto => {
    console.log("Se agrega a la tabla: ", producto);
    const productos = [...this.state.productos];
    productos.push(producto);
    this.setState({ productos: productos });
  };

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
          <tbody
            key={producto.identificador}
            onClick={() => this.verDetalle(producto)}
            data-toggle="modal"
            data-target="#detalleProductoModal"
          >
            <tr>
              <td>{producto.nombre}</td>
              <td>{producto.marca}</td>
              <td>{producto.codigoBarras}</td>
              <td>${producto.precio}</td>
            </tr>
          </tbody>
        );
      });
    }
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

    let modal = this.state.modal ? (
      <div
        className="modal fade bd-example-modal-lg"
        id="detalleProductoModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="detalleProductoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <div className="col-6">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      value={this.state.producto.nombre}
                    />
                  </div>
                  <div className="col-6">
                    <label>Marca</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Marca"
                      value={this.state.producto.marca}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-6">
                    <label>Código de Barras</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Código de Barras"
                      value={this.state.producto.codigoBarras}
                    />
                  </div>
                  <div className="col-2">
                    <label>Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.producto.precio}
                      placeholder="Precio"
                      min="0"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-6">
                    <label>Rubro</label>
                    <select className="custom-select">
                      <option defaultValue>
                        {this.state.producto.rubro.descripcion}
                      </option>
                      {rubros}
                    </select>
                  </div>
                  <div className="col-6">
                    <label>Subrubro</label>
                    <select className="custom-select">
                      <option defaultValue>
                        {this.state.producto.subRubro.descripcion}
                      </option>
                      {subRubros}
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Eliminar
              </button>
              <button type="button" className="btn btn-success">
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;

    return (
      <div>
        <div className="d-flex justify-content-between mb-3">
          <h2>Lista de productos</h2>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-toggle="modal"
            data-target=".bd-example-modal-lg"
          >
            Agregar producto
          </button>
          <AgregarProducto push={this.agregarProducto}/>
        </div>
        <Tabla headers={HEADERS} contenido={productos} />
        {modal}
      </div>
    );
  }
}

export default Productos;
