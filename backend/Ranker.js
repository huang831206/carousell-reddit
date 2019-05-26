class Ranker{
    constructor(name, maxRank){
        this.name = name
        this.dataMap = new Map()
        this.maxRank = maxRank
        this.smallestId = null
    }

    // value: {id:'', upVotes:1}
    set(key, value){
        // add a new record
        this.dataMap.set(key, value)
        // sort current ranks
        this.sort()

        // if the map if already full
        if (this.dataMap.size > this.maxRank) {
            // remove last
            this.dataMap.delete(this.smallestId)
        }
    }

    get(key){
        return JSON.parse(JSON.stringify(this.dataMap.get(key)))
    }
    
    // sort the data map by upVotes, and updates this.smallestId
    sort(){
        // o1[1], o2[1] refer to the value of a key
        // sort by upVotes in value object
        let sorted = [...this.dataMap].sort((o1, o2) => o2[1].upVotes - o1[1].upVotes)
        this.dataMap = new Map(sorted)
        this.smallestId = sorted[sorted.length - 1][0]
    }

    trendings(){
        // convert map to object for easier usage
        return [...this.dataMap].reduce((pre, cur) => {pre[cur[0]] = cur[1]; return pre}, {})
    }

    last(){
        return JSON.parse(JSON.stringify(this.dataMap.get(this.smallestId)))
    }

    full(){
        return this.dataMap.size >= this.maxRank
    }

    getName(){
        return this.name
    }
}

module.exports = Ranker