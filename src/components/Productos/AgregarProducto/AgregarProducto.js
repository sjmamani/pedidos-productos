import React, { Component } from "react";
import axios from "axios";

export class AgregarProducto extends Component {
  state = {
    rubros: null,
    subRubros: null,
    error: false
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/rubros")
      .then(response => {
        console.log(response);
        this.setState({ rubros: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
    axios
      .get("http://localhost:8080/subRubros")
      .then(response => {
        console.log(response);
        this.setState({ subRubros: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
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
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6">
            <label>Rubro</label>
            <select className="custom-select">
              <option selected>Seleccionar Rubro</option>
              {rubros}
            </select>
          </div>
          <div className="col-6">
            <label>Subrubro</label>
            <select className="custom-select">
              <option selected>Seleccionar Subrubro</option>
              {subRubros}
            </select>
          </div>
        </div>
      </form>
    );
  }
}

export default AgregarProducto;
