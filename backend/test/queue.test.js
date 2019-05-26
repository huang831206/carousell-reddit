import test from 'ava';

test('test rabbitmq', async t => {
    const amqp = require('amqplib')
    let config = require('../config.json') || {}
    let host = config.queues.rabbitmq.host || 'amqp://localhost'
    let name = config.queues.rabbitmq.name || 'vote_queue'

    let testMsg = {id:'abc', type:'upVotes'}
    let receivedMsg;

    let MQ = require('../queue/Rabbitmq.js')
    let mq = new MQ()
    
    // send data
    mq.send(testMsg)
    
    // listen for data
    amqp.connect(host)
        .then( conn => {
            return conn.createChannel()
        })
        .then( ch => {
            let q = name;
            return ch.assertQueue(q, { durable: false })
                    .then( ok => {
                        return ch.consume(q, function(msg) {
                            if (msg !== null) {
                                let data = JSON.parse(msg.content.toString())
                                receivedMsg = data
                                ch.ack(msg)
                            }
                        })
                    })
        }).catch( err => {
            console.warn(err);
        })
    
    // give the mq a delay
    // see if we get the correcct answer within 1 second
    await new Promise( (resolve, reject) => {
        setTimeout(() => {
            t.deepEqual(receivedMsg, testMsg)
            resolve()
        }, 1000);
    })

})
