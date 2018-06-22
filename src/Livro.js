import React, { Component } from 'react';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import $ from 'jquery';

class FormularioLivro extends Component {

    constructor() {
        super();
        this.state = {titulo: '', preco: '', autorId: ''};
        this.setTitulo = this.setTitulo.bind(this);
    }

    setTitulo(evento) {
        this.setState({titulo: evento.target.value});
    }


    setPreco(evento) {
        this.setState({preco: evento.target.value});
    }


    setAutor(evento) {
        this.setState({autorId: evento.target.value});
    }

    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Titulo" />
                    <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preco" />
                    <InputCustomizado id="autor" type="text" name="autor" value={this.state.autor} onChange={this.setAutor} label="Autor" />

                    <div className="pure-control-group">                                  
                            <label></label> 
                            <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                </form>
            </div>
        );
    }
}

class TabelaLivros extends Component {
    render() {
        return(
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function(livro) {
                                return(
                                    <tr>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = {lista : []};
    }

    componentDidMount() {
        $.ajax({
            url:"http://localhost:9091/api/livros",
            dataType: 'json',
            success: function(resposta){
                this.setState({lista : resposta});
            }.bind(this)
        });

        PubSub.subscribe('atualiza-lista-livros', function(topico, novaListagem) {
            console.log("recupera lista publicada...")
            this.setState({lista: novaListagem});
        }.bind(this));
    }

    render() {
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro />
                    <TabelaLivros lista={this.state.lista}/>
                </div>    
            </div>
        );
    }
}