const express = require('express');
const projectsService = require('../services/projects-service');
const router = express.Router();
const idMiddleware = require('../services/validateId-middleware');

    
router.post('/projects', projectsService.createProject);
router.get('/projects',  projectsService.getProjects);
router.put('/projects/:id', [idMiddleware.validateId, projectsService.changeProjectTitle]);
router.delete('/projects/:id', [idMiddleware.validateId, projectsService.deleteProjectById]);
router.post('/projects/:id/tasks', [idMiddleware.validateId, projectsService.addTasksToProjectById]);


module.exports = router