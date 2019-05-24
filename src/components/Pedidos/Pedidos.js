import React, { Component } from "react";
import axios from "axios";

export class Pedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: null,
      error: false,
      cuit: "",
      loading: false,
      pedidos: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/pedidos")
      .then(response => {
        this.setState({ pedidos: response.data });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({ cuit: event.target.value });
  }
  render() {
    let pedidos1 = this.state.error ? (
      <p>Error al traer los pedidos</p>
    ) : (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
    if (this.state.pedidos) {
      pedidos1 = this.state.pedidos.map(pedido => {
        return (
          <tbody key={pedido.numeroPedido}>
            <tr>
              <th scope="row">{pedido.numeroPedido}</th>
              <td>{pedido.cliente.nombre}</td>
              <td>{pedido.estado}</td>
              <td>{pedido.fechaPedido}</td>
            </tr>
          </tbody>
        );
      });
    }
    const buscarPedido = () => {
      this.setState({ loading: true });
      axios
        .get("http://localhost:8080/pedido/" + this.state.cuit)
        .then(response => {
          this.setState({ pedido: response.data, loading: false });
          console.log(response.data);
        })
        .catch(error => {
          this.setState({ error: true, loading: false });
        });
    };

    let pedido = null;
    let items = null;

    if (this.state.error) {
      pedido = <p>No se encontro el pedido</p>;
    } else {
      if (this.state.loading) {
        pedido = (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        );
      }
    }

    if (this.state.pedido) {
      pedido = (
        <table className="table table-bordered">
          <tbody key={this.state.pedido.numeroPedido}>
            <tr>
              <td>Numero de pedido</td>
              <td>{this.state.pedido.numeroPedido}</td>
            </tr>
            <tr>
              <td>Cliente</td>
              <td>{this.state.pedido.cliente.nombre}</td>
            </tr>
            <tr>
              <td>Estado</td>
              <td>{this.state.pedido.estado}</td>
            </tr>
            <tr>
              <td>Fecha</td>
              <td>{this.state.pedido.fechaPedido}</td>
            </tr>
          </tbody>
        </table>
      );
      const i = this.state.pedido.items.map((i, index) => {
        return (
          <tbody key={index}>
            <tr>
              <td>{i.producto.nombre}</td>
              <td>${i.producto.precio.toFixed(2)}</td>
              <td>{i.cantidad}</td>
            </tr>
          </tbody>
        );
      });
      items = (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            {i}
          </table>
        </div>
      );
    }
    return (
      <div>
        <form>
          <div className="form-group row">
            <div className="col-6">
              <label>Numero de pedido:</label>
              <input
                type="number"
                className="form-control"
                id="nroPedido"
                placeholder="Numero de pedido"
                min="0"
                value={this.state.cuit}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={buscarPedido}
              >
                Buscar
              </button>
            </div>
          </div>
        </form>
        <div>
          {pedido}
          {items}
        </div>
        <table className="table">
          <thead style={{ backgroundColor: "#001932", color: "#fff" }}>
            <tr>
              <th scope="col">Nro. Pedido</th>
              <th scope="col">Cliente</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          {pedidos1}
        </table>
      </div>
    );
  }
}

export default Pedidos;
