const BaseStorage = require('./BaseStorage.js')

class MemoryStorage extends BaseStorage{

    constructor(){
        super()
        this.data = new Map()
    }

    // add a new record
    insert(item){
        if ((!!item) && (item.constructor === Object)) {
            let uuid = require('uuid/v4')
            item.id = uuid()
            this.data.set(item.id, item)
            return item.id
        }
        return false
    }

    // add mutiple records
    bulkInsert(items){
        if (Array.isArray(items)) {
            let uuid = require('uuid/v4')
            for (const item of items) {
                item.id = uuid()
                this.data.set(item.id, item)
            }
            return true
        }
        return false
    }
    
    // select record by given id
    // raw: if ture, return the exact object in data map. by default this function returns a clone
    select(id, raw = false){
        if (id === '*'){
            return raw ? [...this.data.values()] : JSON.parse(JSON.stringify([...this.data.values()]))
        }else if(id){
            return raw ? this.data.get(id) : JSON.parse(JSON.stringify(this.data.get(id)))
        }
        return false
    }

    // select records where id in ids
    // raw: if ture, return the exact object in data map. by default this function returns clones
    selectIn(ids, raw = false){
        let results = []
        this.data.forEach( (value, id) => {
            if (ids.includes(id)) {
                results.push(raw ? value : JSON.parse(JSON.stringify(value)))
            }
        })
        return results
    }

    // does the post with given id exist
    has(id){
        return this.data.has(id)
    }

    // there's only one update action(update votes) in this app
    // type: 'upVotes' or 'downVotes'
    update(id, type){
        this.data.get(id)[type]++
    }

    // delete a certain post
    delete(id){
        return this.data.delete(id)
    }

}

module.exports = MemoryStorage