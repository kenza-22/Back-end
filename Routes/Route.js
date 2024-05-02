const express = require('express');
const router = express.Router();
const IssuesController = require('../Controllers/IssuesController');
const ProjectsController = require('../Controllers/ProjectsController');
const SprintsController = require('../Controllers/SprintsController');
const UserController = require('../Controllers/UserController');
router.get('/issues', IssuesController.getIssues);
router.post('/user/create',UserController.createUserController);
router.get('/user', UserController.getAllUsersController);
router.get('/user/:userID', UserController.getUserByIdController);
router.delete('/user/:userID', UserController.deleteUserByIdController);
router.put('/user/:userID', UserController.updateUserByIdController )
router.get('/projects', ProjectsController.getProjects);
router.get('/sprints', SprintsController.getAllSprints);
module.exports = router;