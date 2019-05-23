import React, { Component } from 'react'
import axios from "axios";

export class Pedidos extends Component {

    constructor(props){
        super(props);
        this.state =  {
            pedido : null,
            error : false,
            cuit : ''
        };

        this.handleChange = this.handleChange.bind(this);
        
    }

    
    handleChange(event) {
        this.setState({cuit : event.target.value});
    }
    render() {

        const buscarPedido = () => {

          axios
          .get("http://localhost:8080/pedido/"+ this.state.cuit)
          .then(response => {
            this.setState({ pedido: response.data });
            console.log(response.data);
          })
          .catch(error => {
            this.setState({ error: true });
          });
          console.log("buscando");
        };

        
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
                    
                </div>
            </form>
        )
    }
}

export default Pedidos
