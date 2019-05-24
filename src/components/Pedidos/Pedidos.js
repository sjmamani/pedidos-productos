import React, { Component } from 'react'
import axios from "axios";

export class Pedidos extends Component {

    constructor(props){
        super(props);
        this.state =  {
            pedido : null,
            error : false,
            cuit : '',
            loading : false
        };

        this.handleChange = this.handleChange.bind(this);
        
    }

    /*buscarPedido(){
        
    }*/
    
    handleChange(event) {
        this.setState({cuit : event.target.value});
    }
    render() {

        const buscarPedido = () => {
            this.setState({loading : true});
          axios
          .get("http://localhost:8080/pedido/"+ this.state.cuit)
          .then(response => {
            this.setState({ pedido: response.data,loading:false});
            console.log(response.data);
          })
          .catch(error => {
            this.setState({ error: true,loading:false });
          });
          console.log("buscando");
        };

        let pedido = null;
        
          if(this.state.error){
            pedido = <p>No se encontro el pedido</p>
          }
          else{
            if (this.state.loading){
              pedido =(
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>)
            }
          }
        

          if (this.state.pedido) {
            pedido = (
                <table className = "table table-bordered">
                    <tbody key={this.state.pedido.numeroPedido}>
                    <tr>
                        <td >Numero de pedido:</td>
                        <td>{this.state.pedido.numeroPedido}</td>
                    </tr>   
                    <tr>
                        <td >Cliente:</td>
                        <td>{this.state.pedido.cliente.nombre}</td>
                    </tr>
                    <tr>
                        <td>Estado:</td>
                        <td>{this.state.pedido.estado}</td>
                    </tr>
                    <tr>
                        <td>Fecha:</td>
                        <td>{this.state.pedido.fechaPedido}</td>                                       
                    </tr>
                    </tbody>
                </table>
            );
            const i = this.state.pedido.items.map(producto => {
                return(
                    <h1></h1>
                );
            })
            let items = (
                <div>
                    <p>Tus pedidos:</p>
                    <table>
                        <thead> 
                            <tr> 
                                <th>Nombre producto</th>
                                <th>Precio unitario</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {i}
                        </tbody>
                    </table>
                </div>

              ); 

          
        return (
            
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
                        value = {this.state.cuit}
                        onChange={this.handleChange}
                        />
                        <button type="button" className="btn btn-primary" onClick={buscarPedido}>
                         Buscar
                        </button>
                    </div>
               </div>
               <div>                    
                    {pedido}
                    {items}
                </div>
            </form>
        )
    }
}

export default Pedidos
