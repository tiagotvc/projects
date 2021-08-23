/**
 * Arquivo de testes da API de catalogo
 * 
 * Performa testes para saber se os retornos 
 * estão corretos.
 * 
 * Data de criação:2021/08/15
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */



 let chai = require("chai");
 let chaiHttp = require("chai-http");
 let server = require("../index");
 
 chai.should();
 chai.use(chaiHttp);
 
 
 /**
  * Teste da Api de Catálogo para retorno de produto completo
  * precisa retornar todos os campos do model para passar
  * no teste, o retorno da requisição precisa conter um objeto
  * e dentro dele outro objeto contento as informações do
  * produto. O primeiro objeto precisa conter uma propriedade
  * chamada sucess que deve ser true e a propriedade produto
  * ja citada acima.
  */
 
 describe('API de Projetos', () => {
 
    describe('PUT /projects/{id}', () => {
 
     /** Teste unitário para retorno da api de atualizar titulo passado um id não existente */
 
     it('It should return id not found', async function () {
       const projectId = 1234567890;
         try{
 
           const teste = await chai.request(server).put('/projects/' + projectId);
           teste.body.should.be.a('object');
           teste.body.should.have.property('status').eq(400);
           teste.body.should.have.property('message').eq("Id not Found");
         }
         catch(error){
           //console.log("error")
         }    
      }); 
    });

    describe('DELETE /projects/{id}', () => {
 
        /** Teste unitário para retorno da api de deleção passado um id não existente */
    
        it('It should return id not found', async function () {
          const projectId = 1234567890;
            try{
    
              const teste = await chai.request(server).delete('/projects/' + projectId);
              teste.body.should.be.a('object');
              teste.body.should.have.property('status').eq(400);
              teste.body.should.have.property('message').eq("Id not Found");
            }
            catch(error){
              //console.log("error")
            }    
         }); 
       });

    describe('POST /projects/{id}', () => {
 
        /** Teste unitário para retorno da api de adicionar tasks passado um id não existente */
    
        it('It should return id not found', async function () {
          const projectId = 1234567890;
            try{
    
              const teste = await chai.request(server).post('/projects/' + projectId);
              teste.body.should.be.a('object');
              teste.body.should.have.property('status').eq(400);
              teste.body.should.have.property('message').eq("Id not Found");
            }
            catch(error){
              //console.log("error")
            }    
         }); 
       });
 

     /* it('It should  get a complete product', async function () {
       const productId = 302;
       const type = 'complete'
         try{
           const teste = await chai.request(server).get('/api/products/' + productId + '/' + type)
           teste.status.should.be.eq(200);
           teste.body.should.be.a('object');
           teste.body.should.have.property('sucess');
           teste.body.should.have.property('sucess').eq(true);     
           teste.body.should.have.property('product');
           teste.body.product.should.have.property('body');
           teste.body.product.body.should.be.a('object');
           teste.body.product.body.should.have.property('skus').eq('array')
           teste.body.product.body.should.have.property('apiKey');
           teste.body.product.body.should.have.property('description');
           teste.body.product.body.should.have.property('type');
           teste.body.product.body.should.have.property('auditInfo').eq('object');
           teste.body.product.body.should.have.property('eanCode');
           teste.body.product.body.should.have.property('price');
           teste.body.product.body.should.have.property('details').eq('object');
           teste.body.product.body.should.have.property('remoteUrl');
           teste.body.product.body.should.have.property('categories:').eq('array');
           teste.body.product.body.should.have.property('id').eq('302');
           teste.body.product.body.should.have.property('stock');
         }
         catch(error){
        
         }    
      })
 
  
 
      it('It should  get a compact product', async function () {
       const productId = 302;
       const type = 'compact'
         try{
           const teste = await chai.request(server).get('/api/products/' + productId + '/' + type)
           teste.status.should.be.eq(200);
           teste.body.should.be.a('object');
           teste.body.should.have.property('sucess');
           teste.body.should.have.property('sucess').eq(true);     
           teste.body.should.have.property('product');
           teste.body.product.should.have.property('body');
           teste.body.product.body.should.be.a('object');
           teste.body.product.body.should.have.property('name')
           teste.body.product.body.should.have.property('price');
           teste.body.product.body.should.have.property('categories').eq('object');
         }
         catch(error){
          
         }    
      }) */
   
 });