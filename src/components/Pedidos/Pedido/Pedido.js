import React, { Component } from "react";

class Pedido extends Component {
  state = {
    pedidoCargado: null
  };
  render() {
    console.log(this.props.location.state.detalle);
    return (
      <div>
        <h3>Detalle de pedido: {this.props.match.params.id}</h3>
        <p>Nombre: {this.props.location.state.detalle.cliente.nombre}</p>
        <p>CUIL: {this.props.location.state.detalle.cliente.cuil}</p>
        <p>Estado: {this.props.location.state.detalle.estado}</p>
        <p>Fecha: {this.props.location.state.detalle.fechaPedido}</p>
        {/* RESTA MOSTRAR LOS PRODUCTOS - Recorrer el array */}
      </div>
    );
  }
}

export default Pedido;
