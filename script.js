/**
 * Arquivo de script do Mongo
 * Criado para inserir os dados contidos no catalog.json
 * para dentro do banco de dados.
 * 
 * Data:2021/08/17
 * Criador: Tiago Machado Carvalho
 * 
 * Como utilizar:
 * Estando na pasta raiz do projeto
 * No prompt de commando do vscode 
 * Digite:
 * 
 * cd scripts
 * node script.js
 */


 const Project = require('./models/project-model');
 let dbData = require('./data.json');
 const db = require('./connections/mongo')
 
 db.on('error', console.error.bind(console, 'MongoDB connection error:'))
 
 async function databaseInitialize(){
 
 
     await dbData.forEach(async function (doc, i) {
        
         let itens = { _id:doc._id , title:doc.title, tasks:doc.tasks};
 
         const product = new Project(itens);
 
         product
             .save()
             .then(() => {
                 console.log("document inserted " + product._id);
             })
             .catch((error) => {
                 console.log("document not inserted " + error);
             })
       });
 }
 
 databaseInitialize();