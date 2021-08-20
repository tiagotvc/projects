const express = require('express');
const projectsService = require('../services/projects-service');
const router = express.Router();

    
router.post('/projects', [projectsService.createProject]);
//router.get('/projects/:id',[ProjecstMddl.validateId,ProjectsCtrl.getProjectById]);
//router.put('/projects/:id', ProjectsCtrl.changeProjectById);
//router.delete('/projects/:id', ProjectsCtrl.deleteProjectById);
//router.post('/projects/:id/tasks', ProjectsCtrl.addTasksToProjectById);



    
module.exports = router