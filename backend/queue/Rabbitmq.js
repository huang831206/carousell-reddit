const BaseQueue = require('./BaseQueue.js')
const amqp = require('amqplib')

class Rabbitmq extends BaseQueue{
    constructor() {
        super()
        this.config = require('../config.json') || {}
        this.host = this.config.queues.rabbitmq.host || 'amqp://localhost'
        this.name = this.config.queues.rabbitmq.name || 'vote_queue'
    }

    send(item){
        if (!item) {
            return false
        }
        let self = this
        // sends the message to rabbitmq
        amqp.connect(this.host)
            .then( conn => {
                return conn.createChannel()
            })
            .then( ch => {
                let q = self.name
                return ch.assertQueue(q, { durable: false })
                         .then( ok => {
                             let data = JSON.stringify(item)
                             return ch.sendToQueue(q, Buffer.from(data))
                         })
                         .catch( err => {
                             console.warn(err);
                         })
                
            }).catch( err => {
                console.warn(err)
            })
    }

    // storrage: the app storage instance for storing a newly created vote messsage
    // ranker  : the ranker instance for determining if a post should go into trending 
    onReceive(storage, ranker){
        amqp.connect(this.host)
            .then( conn => {
                return conn.createChannel()
            })
            .then( ch => {
                let q = this.name;

                return ch.assertQueue(q, { durable: false })
                        .then( ok => {
                            return ch.consume(q, function(msg) {
                                if (msg !== null) {
                                    let data = JSON.parse(msg.content.toString())
                                    // update upVotes/downVotes for the post
                                    storage.update(data.id, data.type)
                                    
                                    let p = storage.select(data.id)
                                    // if this post is now more popular than the last of trending posts
                                    if (p.upVotes > ranker.last().upVotes) {
                                        // save it to trending list
                                        ranker.set(data.id, {upVotes: p.upVotes})
                                    }
                                    
                                    ch.ack(msg)
                                }
                            })
                        })
                
            }).catch( err => {
                console.warn(err);
            })
    }

}

module.exports = Rabbitmq