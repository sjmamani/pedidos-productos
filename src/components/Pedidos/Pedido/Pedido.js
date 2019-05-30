import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AgregarProductoEnPedido from "../AgregarProductoEnPedido/AgregarProductoEnPedido";

class Pedido extends Component {
  state = {
    items: this.props.location.state.detalle.items,
    estado: this.props.location.state.detalle.estado,
    disabled: "disabled"
  };

  eliminarPedido(numeroPedido) {
    axios
      .delete(`http://localhost:8080/pedido/${numeroPedido}`)
      .then(response => {
        console.log(response);
        alert("Se ha eliminado el pedido");
        this.props.history.push({
          pathname: "/pedidos"
        });
      })
      .catch(error => console.log(error));
  }

  facturarPedido(numeroPedido) {
    axios
      .put(`http://localhost:8080/facturarPedido/${numeroPedido}`)
      .then(response => {
        console.log(response);
        this.setState({ estado: "facturado" });
        alert("Pedido facturado");
      })
      .catch(error => {
        console.log(error);
      });
  }

  agregarProducto = producto => {
    console.log("Se agrega a la tabla: ", producto);
    const items = [...this.state.items];
    items.push(producto);
    this.setState({ items: items });
  };

  render() {
    // console.log(this.props.location.state, this.props.match.params.id);
    let facturar = null;
    let agregar = null;
    if (this.state.estado === "pendiente") {
      facturar = (
        <button
          className="btn btn-outline-dark align-self-center"
          onClick={() => this.facturarPedido(this.props.match.params.id)}
        >
          Facturar
        </button>
      );
      agregar = (
        <button
          type="button"
          className="btn btn-outline-dark"
          data-toggle="modal"
          data-target=".bd-example-modal-lg"
        >
          Agregar producto
        </button>
      );
    }
    let items = null;
    if (this.state.items.length > 0) {
      items = this.state.items.map((item, index) => {
        return (
          <tbody key={index}>
            <tr>
              <td>{item.producto.nombre}</td>
              <td>${item.producto.precio.toFixed(2)}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio.toFixed(2)}</td>
            </tr>
          </tbody>
        );
      });
    }
    return (
      <div>
        <Link
          style={{ color: "#001932", fontWeight: "bold", fontSize: "1.5rem" }}
          to="/pedidos"
        >
          Atrás
        </Link>
        <div className="d-flex mb-3">
          <h3 className="mr-auto p-2">Detalle pedido</h3>
          <button
            className="btn btn-outline-danger align-self-center mr-2"
            onClick={() => this.eliminarPedido(this.props.match.params.id)}
          >
            Eliminar
          </button>
          {facturar}
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>Nro. de pedido</td>
              <td>{this.props.match.params.id}</td>
            </tr>
            <tr>
              <td>Nombre</td>
              <td>{this.props.location.state.detalle.cliente.nombre}</td>
            </tr>
            <tr>
              <td>CUIL</td>
              <td>{this.props.location.state.detalle.cliente.cuil}</td>
            </tr>
            <tr>
              <td>Estado</td>
              <td>{this.state.estado}</td>
            </tr>
            <tr>
              <td>Fecha</td>
              <td>{this.props.location.state.detalle.fechaPedido}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-between mb-3">
          <h3>Lista de productos</h3>
          {agregar}
          <AgregarProductoEnPedido
            numeroPedido={this.props.match.params.id}
            metodo={this.agregarProducto}
          />
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Precio unitario</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio total</th>
            </tr>
          </thead>
          {items}
        </table>
      </div>
    );
  }
}

export default Pedido;
