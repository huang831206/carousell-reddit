
class MessageQueue{

    constructor(){
        this.provider = null
        this.bindings = {
            'rabbitmq': './queue/Rabbitmq.js'
        }
    }

    use(provider){
        if (!provider) {
            throw 'No provider'
        }
        if (!this.bindings[provider]) {
            throw 'No such provider'
        }
        this.provider = provider
        let MQProvider = require(this.bindings[this.provider])
        return new MQProvider
    }
}

module.exports = MessageQueue