/** -- ARQUIVO DE CONEXÃO DO MONGO DB --
 * 
 *  RESPONSÁVEL POR FAZER A CONEXÃO COM O BANCO
 * 
 *  CRIADO POR: TIAGO CARVALHO
 *  DATA: 2021/07/05
*/

const mongoose = require('mongoose');
const dev = "127.0.0.1";
const prod = "mongo";

mongoose
    .connect('mongodb://'+prod+':27017/local', { useUnifiedTopology: true , useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db