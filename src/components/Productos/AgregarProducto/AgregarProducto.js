import React, { Component } from "react";
import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class AgregarProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rubros: null,
      subRubros: null,
      error: false,
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

  agregarProducto = () => {
    const producto = {
      rubro: {
        codigo: this.state.codigoRubro,
        descripcion: "",
        habilitado: true
      },
      subRubro: {
        codigo: this.state.codigoSubRubro,
        descripcion: "",
        rubro: {
          codigo: this.state.codigoRubro,
          descripcion: "",
          habilitado: true
        }
      },
      nombre: this.state.nombre,
      marca: this.state.marca,
      codigoBarras: this.state.codigoBarras,
      precio: this.state.precio
    }
    axios.post("http://localhost:8080/producto", producto)
    .then(response => {
      console.log(response);
      this.agregarEnTabla(response.data);
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

  agregarEnTabla(producto) {
    this.setState({nombre: "", marca: "", codigoBarras: "", precio: 0, codigoSubRubro: 0, codigoRubro: 0});
    this.props.push(producto);
    this.notificationDOMRef.current.addNotification({
      title: "Producto Agregado",
      message: `Se ha agregado el producto`,
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
                      value={this.state.nombre}
                      onChange={event => this.setState({ nombre: event.target.value})}
                    />
                  </div>
                  <div className="col-6">
                    <label>Marca</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.marca}
                      onChange={event => this.setState({ marca: event.target.value})}
                      placeholder="Marca"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-6">
                    <label>Código de Barras</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.codigoBarras}
                      onChange={event => this.setState({ codigoBarras: event.target.value})}
                      placeholder="Código de Barras"
                    />
                  </div>
                  <div className="col-2">
                    <label>Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.precio}
                      onChange={event => this.setState({ precio: event.target.value})}
                      placeholder="Precio"
                      min="0"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-6">
                    <label>Rubro</label>
                    <select className="custom-select"
                      onChange={event => this.setState({ codigoRubro: event.target.value})}>
                      <option defaultValue>Seleccionar Rubro</option>
                      {rubros}
                    </select>
                  </div>
                  <div className="col-6">
                    <label>Subrubro</label>
                    <select className="custom-select"
                    onChange={event => this.setState({ codigoSubRubro: event.target.value})}>>
                      <option defaultValue>Seleccionar Subrubro</option>
                      {subRubros}
                    </select>
                  </div>
                </div>
              </form>
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
                onClick={this.agregarProducto}
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

export default AgregarProducto;
