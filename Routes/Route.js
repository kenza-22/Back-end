const express = require('express');
const router = express.Router();
const IssuesController = require('../Controllers/IssuesController');
const ProjectsController = require('../Controllers/ProjectsController');
const SprintsController = require('../Controllers/SprintsController');
const UserController = require('../Controllers/UserAzureController');
router.post('/user', UserController.AddUser);
router.post('/user/role',UserController.AddRole );
router.post('/user/assign-role',UserController.AddUserToGroup );
router.get('/user',UserController.GetAllUsers );
router.get('/role',UserController.GetAllGroups );
router.get('/role/members/:GroupId',UserController.GetMembersGroup);
router.delete('/user/:userId', UserController.DeleteUser);
router.delete('/role/:GroupId', UserController.DeleteGroup);
router.patch('/user/:id', UserController.UpdateUser);
router.get('/issues', IssuesController.getIssues);
router.get('/projects', ProjectsController.getProjects);
router.get('/sprints', SprintsController.getAllSprints);
module.exports = router;

