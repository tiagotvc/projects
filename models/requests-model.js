/**
 * Arquivo de modelo de requests 
 * 
 * Determina as propriedades do modelo requests.
 * 
 * Data de criação:2021/08/19
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
     
 const Request = new Schema(
     {
         _id: { type: Number, required: true},
         requests: { type: Number, required: true }
     },
     { timestamps: true },
 )
     
 module.exports = mongoose.model('requests', Request)