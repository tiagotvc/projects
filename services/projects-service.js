const Project = require('../models/project-model');
const redis = require('../connections/redis');
let prj = '';
let data = '';
let idList = [];
let cache = false;
let tempTasks = [];


async function cacheInitialize(){

    /**
     * Seta a variavel cache para verdadeira, fazendo só ser
     * requisitado a reinicialização do cache caso seja feito update
     * delete ou insert no banco, mas para a API de listar é requisitado
     * ao banco apenas uma vez.
     * */

    cache = true;

    // limpa a veriavel idList(Evitando duplicação)
    idList = [];

    // Puxa todos os projetos do banco para dentro da const projects
    const projects = await Project.find();


    // mapeia todos o id de todos os projetos para dentro do array idList
    await Promise.all(projects.map((ids) => {
        idList.push(ids._id);
    }));


    // Cria o cache dos projetos e seta o tempo que ficará salvo
    await redis.setAsync(prj, JSON.stringify(projects));
    await redis.exAsync(prj, 1200);
    data = JSON.parse(await redis.getAsync(prj));
  
    return "done";
}


createProject = async (req, res) => {

    // #swagger.tags = ['Projects']
    // #swagger.description = 'Endpoint para salvar um novo projeto no banco.'

    /* #swagger.parameters['newProject'] = {
               in: 'body',
               description: 'Informações do projeto.',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/CreateProject" }
        } */

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Missing some field in body',
        })
    }

    /** Caso a variável cache seja false é feito o cache é
     * limpo e reiniciado ou inicializado caso seja a primeira
     * interação.
    */

    if (!cache){

        await redis.delAsync(prj);
        await cacheInitialize();
    }


    const project = new Project(body);

    /** 
     * Seta o cache para false pois será adicionado novo dado ao banco
     * tornando o cache desatualizado
     * */ 
    
    cache = false;


    // Salva o novo projeto

    project
        .save()
        .then(() => {

            /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/Project_inserted" },
               description: 'Id sucessfull inserted.' 
            } */

            return res.json({
                status: 200,
                success: true,
                id: project._id,
                message: 'Project Inserted!',
            })
        })
        .catch(async (error) =>  {

            /* #swagger.responses[400] = { 
               schema: { $ref: "#/definitions/Projects" },
               description: 'Id already existing in the database.' 
            } */
    
            return res.json({
                status: 400,
                _id: req.params.id,
                message: "id already existing in the database!",
                ids_at_database:idList,
            })
        })
}

getProjects = async (req, res) => {

    // #swagger.tags = ['Projects']
    // #swagger.description = 'Endpoint to list all database projects.'

    if(cache == false){

        //Clear cache
        await redis.delAsync(prj);
        await cacheInitialize();
    }

    /*  #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Project_list" },
        description: 'List of projects.' 
    } */


    res.json(data)
}

changeProjectTitle = async (req, res) => {

    // #swagger.tags = ['Projects']
    // #swagger.description = 'Endpoint to change project title by id.'
    // #swagger.parameters['id'] = { description: 'ID do projeto.' }

    
    /* #swagger.parameters['newTitle'] = {
        in: 'body',
        description: 'new title of the project',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/changeTitle" }
    } */

    try{

       const update =  await Project.updateOne({ _id:req.params.id },{ $set: req.body });

       /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/changeSucess" },
        description: 'Project title sucess updated.' 
        } */

        /* #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/changeFailed" },
        description: 'Project Id not found.' 
        } */


        /* #swagger.responses[500] = { 
        schema: { $ref: "#/definitions/databaseError" },
        description: 'Mongoose error.' 
        } */

       if(update.nModified > 0){
           cache = true;
           res.json({status:200,message:"Project Sucess Updated"})
       }

    }
    catch(err){

        res.json({status:500,message:"Database Error"})
    }
}


deleteProjectById = async (req, res) => {

    // #swagger.tags = ['Projects']
    // #swagger.description = 'Endpoint to delete Project by Id.'
    // #swagger.parameters['id'] = { description: 'ID do projeto.' }

    try{

        const deleting = await Project.findOneAndDelete({ _id: req.params.id })
        
     /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/deleteSucess" },
        description: 'Project sucess deleted.' 
        } */

        /* #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/changeFailed" },
        description: 'Project Id not found.' 
        } */


        /* #swagger.responses[500] = { 
        schema: { $ref: "#/definitions/databaseError" },
        description: 'Mongoose error.' 
        } */

        if (deleting != null){
            cache = false;

            res.json({status:200, 
                      message:"Project Sucess deleted"})
        }
    }
    catch{

        res.json({
            status:500,
            message:"Database Error"
        })
    }
}

addTasksToProjectById = async (req, res) => {

    // #swagger.tags = ['Projects']
    // #swagger.description = 'Endpoint to add tasks to existing Project.'
    // #swagger.parameters['id'] = { description: 'ID do projeto.' }

    /* #swagger.parameters['addTasksToProject'] = {
               in: 'body',
               description: 'Informações do projeto.',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/addTasks" }
        } */


    //const[tasks] = req.body;

    if(cache == false){

        await cacheInitialize();
    }

    const tasks = req.body;

    try{

        await Promise.all(data.map((task) =>{
            if(task._id === req.params.id){
                tempTasks = task.tasks;
            }
        }))


        if(tempTasks.length > 0){

            tasks.tasks.forEach(function(item) {
                if(tempTasks.indexOf(item) < 0) {
                    tempTasks.push(item);
                }
            })

            const body = {
                tasks: tempTasks
            }

            const update =  await Project.updateOne({ _id:req.params.id },{ $set: body });

            /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/changeSucess" },
            description: 'Project sucess updated.' 
            } */

             /* #swagger.responses[401] = { 
            schema: { $ref: "#/definitions/updateFail" },
            description: 'Project not updated.' 
            } */

            /* #swagger.responses[400] = { 
            schema: { $ref: "#/definitions/changeFailed" },
            description: 'Project Id not found.' 
            } */

            if(update != null){

                cache = false;
                res.json({Status:200,message:"Tasks sucess added"});
            }
            else{

                res.json({Status:400,message:"Tasks not added"});
            }
        }

    }catch{

        /* #swagger.responses[500] = { 
        schema: { $ref: "#/definitions/databaseError" },
        description: 'Mongoose error.' 
        } */

        res.json({
            status:500,
            message:"Database Error"
        })

    }

}

module.exports = {
    createProject,
    getProjects,
    changeProjectTitle,
    deleteProjectById,
    addTasksToProjectById
}