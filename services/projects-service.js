const Project = require('../models/project-model')
let projects = [];
let idList = [];


async function getAllProjects(){

    projects = await Project.find();

    console.log(projects)

    await Promise.all(projects.map((ids) => {
        idList.push(ids._id);
    }))

    return idList;

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
            error: 'Você precisa fornecer uma moeda',
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


    await getAllProjects();

    /*  #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Project_list" },
        description: 'List of projects.' 
    } */


    res.json(projects)


}

module.exports = {
    createProject,
    getProjects
}