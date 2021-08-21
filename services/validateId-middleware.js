/**
 * Arquivo de middleware de Id. 
 * 
 * Valida se o Id existe no banco antes
 * de qualquer outro processo da API. 
 * 
 * Data de criação:2021/08/21
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */


const Project = require('../models/project-model')

validateId = async (req, res, next) => {

    try{
      const foundProject = await Project.findOne({_id:req.params.id});

      if(foundProject == null){

        res.json({
            status:400,
            message:"Id not Found"
        });
      }
      else 
      {
        next();
      }
    }
    catch {

        res.json({
            status:500,
            message:"Sql Error"
        });
    }
}
module.exports = {validateId}