import test from 'ava';

/*** test the MemoryStorage.js module itself ***/

test('test memory storage: insert', t => {
    const MS = require('../storage/MemoryStorage.js')
    const ms = new MS()
    let obj = {a: 1, b: '2'}
    let id = ms.insert(obj)

    t.deepEqual(ms.data, new Map([[id, obj]]))
})

test('test memory storage: select', t => {
    const MS = require('../storage/MemoryStorage.js')
    const ms = new MS()
    let obj = {a: 1, b: '2'}
    let id = ms.insert(obj)

    t.deepEqual(ms.select(id), obj)
})

test('test memory storage: select all', t => {
    const MS = require('../storage/MemoryStorage.js')
    const ms = new MS()
    let obj1 = {a: 1, b: '2'}
    let obj2 = {a: 345, b: '678'}
    ms.insert(obj1)
    ms.insert(obj2)

    t.deepEqual(ms.select('*'), [obj1, obj2])
})

test('test memory storage: selectIn', t => {
    const MS = require('../storage/MemoryStorage.js')
    const ms = new MS()
    let obj1 = {a: 1, b: '2'}
    let obj2 = {a: 345, b: '678'}
    let id1 = ms.insert(obj1)
    let id2 = ms.insert(obj2)

    t.deepEqual(ms.selectIn([id1, id2]), [obj1, obj2])
})

/******/


/*** test if DB.js can load providers successfully ***/

test('test db loader', t => {
    let DB = require('../DB.js')
    let providerInstance = new DB().use('memory')
    let MemoryStorage = require('../storage/MemoryStorage.js')

    t.true(providerInstance instanceof MemoryStorage)
})

/******/