/**
 * Arquivo de middleware de requisições 
 * 
 * Conta quantas requisições foram feitas na api.
 * 
 * Data de criação:2021/08/19
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */

 const Request = require('../models/requests-model');
 let numberOfRequests = 0;
 let message = "";
 
 
 async function updateRequest(){
 
     /**Procura se já existem dados de requisição no banco */
 
     await Request.find({}, async (err, reqs) =>{
         if(err){
             message = "error"
 
             return message;
        }
 
         if(reqs.length > 0){
 
             /** Se existirem dados será feito um update no banco  */
 
             let old = {
                 requests : reqs[0].requests
             };
 
             let now = { 
                 $set: {
                     requests: reqs[0].requests + 1
                 } 
             };
 
             /** Altera o valor da variável de retorno  */
 
             let value = reqs[0].requests + 1;
             numberOfRequests =  value;
 
         /**Update */
 
         await Request.updateOne(old,now, async (err,res) => {
             if(err){
                 message = "error"
                 return message;
             }
             return;
         });
         }
 
         /** Caso ainda não haja nenhum dado no banco é criado o dado de request */
 
         else {
 
             let body = {_id:1, requests:1};
             const requests = new Request(body);
             numberOfRequests = 1;
 
             requests
                 .save()
                 .then(()=> {
                     return ;
             });
         }
     });   
 }
 
 requestCount = async (req, res, next) => {
 
     await updateRequest();
 
     if(message === "error"){
 
         res.json({message: "Mongo error"})
     }
   
     console.log("Essa é a requisição número " + numberOfRequests + " feita nessa API");
 
     return next();
 
 }
 
 
 module.exports = requestCount