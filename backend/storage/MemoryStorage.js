const BaseStorage = require('./BaseStorage.js')

class MemoryStorage extends BaseStorage{

    constructor(){
        super()
        this.data = new Map()
    }

    // add a new record
    insert(item){

    }
    
    // select record by given id
    select(id){

    }

    // select records where id in ids
    selectIn(ids){

    }

    // does the post with given id exist
    has(id){

    }

    // there's only one update action(update votes) in this app
    update(id){

    }

    // delete a certain post
    delete(id){

    }

}

module.exports = MemoryStorage