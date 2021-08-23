const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/projects-routes.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Api de Projetos",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3001",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Projects",
            "description": "Endpoints relacionados a operações com Projetos"
        }
    ],
    definitions: {
        Projects: {
            status:400,
            _id: "145",
            message: "Id already existing in the database",
            ids_at_database: [
                "12",
                "15",
                "55"
            ],
        },
        Project_inserted: {
            status: 200,
            success: true,
            id: "15",
            message: 'Project Inserted!',
        },
        Project_list: {
            tasks: [
                "Name1",
                "Name2",
                "Name3"
            ],
            _id: "1",
            title: "First Project",
            createdAt: "2021-08-20T16:05:32.545Z",
            updatedAt: "2021-08-20T16:05:32.545Z",
            _v:0
        },
        changeTitle: {
            title:"new title"
        },
        changeSucess: {
            status:200,
            message:"Project Sucess Updated"
        },
        changeFailed: {
            status:400,
            message:"Id not found"
        },
        updateFail: {
            status:401,
            message:"Project not updated"
        },
        databaseError: {
            status:500,
            message:"Database Error"
        },
        deleteSucess: {
            status:200,
            message:"Project sucess deleted"
        },
        CreateProject: {
            $_id: "145",
            $title: "Criação de APIS",
            $tasks: ["taksName"]
        },
        addTasks: {
            $tasks: ["taksName"]
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})