import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AgregarProductoEnPedido from "../AgregarProductoEnPedido/AgregarProductoEnPedido";
import Navbar from "../../UI/Navbar/Navbar";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Pedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.location.state.detalle.items,
      estado: this.props.location.state.detalle.estado,
      disabled: "disabled"
    }
    this.notificationDOMRef = React.createRef();
  }

 

  eliminarPedido(numeroPedido) {
    axios
      .delete(`http://localhost:8080/pedido/${numeroPedido}`)
      .then(response => {
        console.log(response);
        // this.notificationDOMRef.current.addNotification({
        //   title: "Eliminado",
        //   message: `Se ha eliminado el pedido`,
        //   type: "success",
        //   insert: "top",
        //   container: "top-center",
        //   animationIn: ["animated", "zoomIn"],
        //   animationOut: ["animated", "zoomOut"],
        //   dismiss: { duration: 2000 },
        //   dismissable: { click: true }
        // });
        this.props.history.push({
          pathname: "/pedidos"
        });
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
  }

  facturarPedido(numeroPedido) {
    axios
      .put(`http://localhost:8080/facturarPedido/${numeroPedido}`)
      .then(response => {
        this.setState({ estado: "facturado" });
        this.notificationDOMRef.current.addNotification({
          title: "Pedido facturado",
          message: `Se ha facturado el pedido`,
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
          type: "error",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "zoomIn"],
          animationOut: ["animated", "zoomOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
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
              <td>${item.producto.precio * item.cantidad}</td>
            </tr>
          </tbody>
        );
      });
    }
    return (
      <div>
        <Navbar />
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="container mt-3">
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
      </div>
    );
  }
}

export default Pedido;
