import React, { Component } from "react";
import "./Pedidos.css";
import axios from "axios";
import Tabla from "../UI/Tabla/Tabla";
import AgregarPedido from "./AgregarPedido/AgregarPedido";

const HEADERS = ["Nro. Pedido", "Cliente", "Estado", "Fecha"];

export class Pedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: [],
      error: false
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:8080/pedidos")
      .then(response => {
        this.setState({
          pedidos: response.data.sort((a, b) => {
            return a.numeroPedido - b.numeroPedido
          })
        });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  agregarPedido = pedido => {
    console.log("Se agrega a la tabla: ", pedido);
    const pedidos = [...this.state.pedidos];
    pedidos.push(pedido);
    this.setState({ pedidos: pedidos });
  };

  verDetalle(pedido) {
    console.log(pedido);
    const detalle = { ...pedido };
    this.props.history.push({
      pathname: "/pedido/" + pedido.numeroPedido,
      state: { detalle: detalle }
    });
  }

  render() {
    let pedidos = this.state.error ? (
      <p>Error al traer los pedidos</p>
    ) : (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
    if (this.state.pedidos) {
      pedidos = this.state.pedidos.map(pedido => {
        return (
          <tbody
            key={pedido.numeroPedido}
            onClick={() => this.verDetalle(pedido)}
          >
            <tr>
              <td>{pedido.numeroPedido}</td>
              <td>{pedido.cliente.nombre}</td>
              <td>{pedido.estado}</td>
              <td>{pedido.fechaPedido}</td>
            </tr>
          </tbody>
        );
      });
    }
    return (
      <div>
        <div className="d-flex justify-content-between mb-3">
          <h2>Lista de Pedidos</h2>
          <button
            type="button"
            className="btn btn-outline-dark"
            data-toggle="modal"
            data-target=".bd-example-modal-lg"
          >
            Agregar pedido
          </button>
          <AgregarPedido push={this.agregarPedido} />
        </div>
        <Tabla headers={HEADERS} contenido={pedidos} />
      </div>
    );
  }
}

export default Pedidos;
