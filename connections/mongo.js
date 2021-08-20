/** -- ARQUIVO DE CONEXÃO DO MONGO DB --
 * 
 *  RESPONSÁVEL POR FAZER A CONEXÃO COM O BANCO
 * 
 *  CRIADO POR: TIAGO CARVALHO
 *  DATA: 2021/07/05
*/

const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/local', { useUnifiedTopology: true , useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db