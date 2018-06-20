import PubSub from 'pubsub-js';

export default class TratadorErros {
    publicaErrors(erros) {
        for(var i=0; i< erros.errors.length; i++) {
            var erro = erros.errors[i];
            console.log("publicando erro: " + erro);
            PubSub.publish('erro-validacao', erro);
        }
    }
}