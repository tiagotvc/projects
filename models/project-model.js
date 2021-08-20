/**
 * Arquivo de modelo de projetos 
 * 
 * Determina as propriedades do modelo projeto.
 * 
 * Data de criação:2021/08/19
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
     
 const Project = new Schema(
     {
         _id: { type: String, required: true},
         title: { type: String, required: true },
         tasks: { type: [String], required:false}
     },
     { timestamps: true },
 )
     
 module.exports = mongoose.model('projects', Project)