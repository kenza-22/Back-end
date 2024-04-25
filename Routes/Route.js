const express = require('express');
const router = express.Router();
const IssuesController = require('../Controllers/IssuesController');
const ProjectsController = require('../Controllers/ProjectsController');
const SprintsController = require('../Controllers/SprintsController');
router.get('/issues', IssuesController.getIssues);
router.get('/projects', ProjectsController.getProjects);
router.get('/sprints', SprintsController.getAllSprints);
module.exports = router;