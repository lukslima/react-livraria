import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
// import TratadorErros from './TratadorErros';

export class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = {nome: '', email: '', senha: ''};
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
    }

    setNome(evento) {
        this.setState({nome:evento.target.value});
    }

    setEmail(evento) {
        this.setState({email:evento.target.value});
    }

    setSenha(evento) {
        this.setState({senha:evento.target.value})
    }

    enviaForm(evento) {
        evento.preventDefault();
        console.log("Enviando formulário...");
        $.ajax({
            url:"http://localhost:9091/api/autores",
            type:"post",
            dataType:"json",
            contentType:"application/json",
            data: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
            success: function(resposta) {
                this.props.callbackAtualizaListagem(resposta);
            }.bind(this),
            error: function(resposta) {
                console.log("Deu error");
                console.log(resposta);
            }
        });
    }

    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                    <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
                    
                    <div className="pure-control-group">                                  
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                </form>
            </div>
        );
    }

}

export class TabelaAutores extends Component {

    constructor() {
        super();
        this.state = {lista: []};
    }
    
    render() {
        return(
            <div>            
                <table className="pure-table">
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.props.lista.map(function(autor){
                        return(
                        <tr key={autor.id}>
                            <td>{autor.nome}</td>                
                            <td>{autor.email}</td>                
                        </tr>
                        );
                    })
                    }
                </tbody>
                </table> 
            </div> 
        );
    }

}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = {lista : []};
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    atualizaListagem(novaLista) {
        this.setState({lista: novaLista});
    }

    componentDidMount() {
        console.log("didMount");
        $.ajax({
        url:"http://localhost:9091/api/autores",
        dataType: 'json',
        success: function(resposta){
            this.setState({lista : resposta});
        }.bind(this)
        });
    }

    render() {
        return(
            <div>
                <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/>
                <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }
}