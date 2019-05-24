import React, { Component } from "react";
import axios from "axios";

class AgregarProducto extends Component {
  state = {
    rubros: null,
    subRubros: null,
    error: false
  };
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
    console.log("Agregado");
  };
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
                      placeholder="Nombre"
                    />
                  </div>
                  <div className="col-6">
                    <label>Marca</label>
                    <input
                      type="text"
                      className="form-control"
                      id="marca"
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
                      id="codigoBarras"
                      placeholder="Código de Barras"
                    />
                  </div>
                  <div className="col-2">
                    <label>Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      id="precio"
                      placeholder="Precio"
                      min="0"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-6">
                    <label>Rubro</label>
                    <select className="custom-select">
                      <option defaultValue>Seleccionar Rubro</option>
                      {rubros}
                    </select>
                  </div>
                  <div className="col-6">
                    <label>Subrubro</label>
                    <select className="custom-select">
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
                data-dismiss="modal"
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
