const express = require('express');
const projectsService = require('../services/projects-service');
const router = express.Router();

    
router.post('/projects', projectsService.createProject);
router.get('/projects',  projectsService.getProjects);
router.put('/projects/:id', projectsService.changeProjectTitle);
router.delete('/projects/:id', projectsService.deleteProjectById);
router.post('/projects/:id/tasks', projectsService.addTasksToProjectById);



    
module.exports = router