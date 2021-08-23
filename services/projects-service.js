const Project = require('../models/project-model');
const redis = require('../src/connections/redis');
let prj = '';
let data = '';
let idList = [];
let cache = false;


async function cacheInitialize(){

    cache = true;

    const projects = await Project.find();

    await Promise.all(projects.map((ids) => {
        idList.push(ids._id);
    }));


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

    const project = new Project(body)

    if (!project) {
        return res.status(400).json({ success: false, error: err })
    }

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

            await getAllProjects();

            /* #swagger.responses[400] = { 
               schema: { $ref: "#/definitions/Projects" },
               description: 'Id already existing in the database.' 
            } */
    
            return res.json({
                status: 400,
                _id: error.keyValue._id,
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
           res.json({status:200,message:"Project Sucess Updated"})
       }
       else{
           res.json({status:400,message:"Id not found"})
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

        if(deleting == null){
            res.json({
                status:400,
                message:"Id not found"
            })
        }else{
            res.json({
                status:200,
                message:"Project Sucess deleted"
            })
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

    /* #swagger.parameters['addTasksToProject'] = {
               in: 'body',
               description: 'Informações do projeto.',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/addTasks" }
        } */


    //const[tasks] = req.body;

    const tasks = req.body;

    try{
        let getTasks = await Project.findOne({ _id: req.params.id });
      

        if(getTasks == null){

        }
        else {
            tasks.tasks.forEach(function(item) {
                if(getTasks.tasks.indexOf(item) < 0) {
                    getTasks.tasks.push(item);
                }
            })

            const body = {
                tasks: getTasks.tasks
            }

            const update =  await Project.updateOne({ _id:req.params.id },{ $set: body });

            if(update == null){

            }else{

                res.json({Status:200,message:"Tasks sucess added"})
            }
            
        }


    }catch{

    }

}

module.exports = {
    createProject,
    getProjects,
    changeProjectTitle,
    deleteProjectById,
    addTasksToProjectById
}