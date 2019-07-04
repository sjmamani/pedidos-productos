import React, { Component } from "react";
import axios from "axios";
import AgregarProducto from "./AgregarProducto/AgregarProducto";
import Tabla from "../UI/Tabla/Tabla";
import Navbar from "../UI/Navbar/Navbar";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const HEADERS = ["Nombre", "Marca", "Código", "Precio"];

export class Productos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      producto: {},
      productoAModificar: {},
      rubros: [],
      subRubros: [],
      error: false,
      modal: false,
      identificador: 0,
      nombre: "",
      marca: "",
      codigoBarras: "",
      precio: 0,
      codigoRubro: 0,
      codigoSubRubro: 0
    };
    this.notificationDOMRef = React.createRef();
  }
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
    axios
      .delete(`http://localhost:8080/producto/${id}`)
      .then(response => {
        let productos = [...this.state.productos];
        // get index of object with the wished id
        let removeIndex = productos
          .map(producto => producto.identificador)
          .indexOf(id);
        // remove object
        productos.splice(removeIndex, 1);
        this.setState({ productos: productos });
        this.notificationDOMRef.current.addNotification({
          title: "Eliminado",
          message: `${response.data}`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "zoomIn"],
          animationOut: ["animated", "zoomOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      })
      .catch(error => {
        this.notificationDOMRef.current.addNotification({
          title: "Error",
          message: `${error.message}`,
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "zoomIn"],
          animationOut: ["animated", "zoomOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      });
  }

  verDetalle(producto) {
    const p = { ...producto };
    this.setState({
      producto: p,
      identificador: p.identificador,
      nombre: p.nombre,
      marca: p.marca,
      codigoBarras: p.codigoBarras,
      precio: p.precio,
      codigoRubro: p.rubro.codigo,
      codigoSubRubro: p.subRubro.codigo,
      modal: true
    });
  }

  agregarProducto = producto => {
    const productos = [...this.state.productos];
    productos.push(producto);
    this.setState({ productos: productos });
  };

  editarProducto = () => {
    let p = { ...this.state.productoAModificar };
    p.identificador = this.state.identificador;
    p.nombre = this.state.nombre;
    p.marca = this.state.marca;
    p.codigoBarras = this.state.codigoBarras;
    p.precio = this.state.precio;
    p.codigoRubro = this.state.codigoRubro;
    p.codigoSubRubro = this.state.codigoSubRubro;
    axios
      .put("http://localhost:8080/producto", p)
      .then(response => {
        this.notificationDOMRef.current.addNotification({
          title: "Modificado",
          message: `Producto modificado con éxito`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "zoomIn"],
          animationOut: ["animated", "zoomOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      })
      .then(() => {
        let productos = [...this.state.productos];
        // get producto to be update
        const getProducto = productos.find(
          producto => producto.identificador === p.identificador
        );
        getProducto.precio = p.precio;
        // update object
        productos.map(obj => p );
        this.setState({ productos: productos });
      })
      .catch(error => {
        this.notificationDOMRef.current.addNotification({
          title: "Error",
          message: `${error.message}`,
          type: "error",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "zoomIn"],
          animationOut: ["animated", "zoomOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      });
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
                      id="nombre"
                      value={this.state.nombre}
                      onChange={event =>
                        this.setState({ nombre: event.target.value })
                      }
                    />
                  </div>
                  <div className="col-6">
                    <label>Marca</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Marca"
                      value={this.state.marca}
                      onChange={event =>
                        this.setState({ marca: event.target.value })
                      }
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
                      value={this.state.codigoBarras}
                      onChange={event =>
                        this.setState({ codigoBarras: event.target.value })
                      }
                    />
                  </div>
                  <div className="col-2">
                    <label>Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.precio}
                      onChange={event =>
                        this.setState({ precio: event.target.value })
                      }
                      placeholder="Precio"
                      min="0"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-6">
                    <label>Rubro</label>
                    <select
                      className="custom-select"
                      onChange={event =>
                        this.setState({ codigoRubro: event.target.value })
                      }
                    >
                      <option defaultValue>
                        {this.state.producto.rubro.descripcion}
                      </option>
                      {rubros}
                    </select>
                  </div>
                  <div className="col-6">
                    <label>Subrubro</label>
                    <select
                      className="custom-select"
                      onChange={event =>
                        this.setState({ codigoSubRubro: event.target.value })
                      }
                    >
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
                onClick={() =>
                  this.eliminarProducto(this.state.producto.identificador)
                }
              >
                Eliminar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.editarProducto}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;

    return (
      <div>
        <Navbar />
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="container mt-3">
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
            <AgregarProducto push={this.agregarProducto} />
          </div>
          <Tabla headers={HEADERS} contenido={productos} />
          {modal}
        </div>
      </div>
    );
  }
}

export default Productos;
