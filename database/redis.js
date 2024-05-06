const {del} = require('express/lib/application');
const {createClient} = require('redis');
 
const client = createClient();
 
client.connect();
 
async function get(key, defaultValue) {
    const value = await client.get(key);
    return value || defaultValue || null;
}
 
async function set(key, value) {
    if (!value){
        await client.del(key);
    }else
        await client.set(key, value);
}
 
async function setObject(key, value) {
    await client.hSet(key, value);
}
 
async function getObject(key) {
    await client.hGet(key);
}


 
module.exports = {
    get,
    set,
    setObject,
    getObject,
    del: client.del,
}