class DB{

    constructor(){
        this.provider = null
        // provider classes name and path
        this.bindings = {
            'memory': './storage/MemoryStorage.js'
        }
    }

    use(provider){
        // use provider param to determine which one to create
        if (!provider) {
            throw 'No provider'
        }
        if (!this.bindings[provider]) {
            throw 'No such provider'
        }
        this.provider = provider
        let DBProvider = require(this.bindings[this.provider])
        return new DBProvider
    }
}

module.exports = DB