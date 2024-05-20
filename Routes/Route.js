const express = require('express');
const router = express.Router();
const IssuesController = require('../Controllers/IssuesController');
const ProjectsController = require('../Controllers/ProjectsController');
const SprintsController = require('../Controllers/SprintsController');
const UserController = require('../Controllers/UserAzureController');
const GroupController = require('../Controllers/GroupAzureController');
const KPIController = require('../Controllers/KPIController');
//_________________API__User__________________________//
router.post('/user', UserController.AddUser);
router.post('/user/assign-group',UserController.AddUserToGroup );
router.get('/user/:userId',UserController.GetUserById);
router.get('/user',UserController.GetAllUsers );
router.delete('/user/:userId', UserController.DeleteUser);
router.patch('/user/:id', UserController.UpdateUser);
//_________________API__Group__________________________//
router.post('/group',GroupController.AddGroup );
router.get('/group',GroupController.GetAllGroups );
router.get('/group/members/:GroupId',GroupController.GetGroupMembers);
router.delete('/group/:GroupId', GroupController.DeleteGroup);
//_________________API__From__DB__________________________//
router.get('/issuesdb', IssuesController.GetTicketsdb);
router.get('/sprintsdb', SprintsController.GetSprintsdb);
router.get('/projectsdb', ProjectsController.getProjetsdb);
router.get('/issues/:project', IssuesController.GetTicketsByProject);
//_________________API__From__JIRA__________________________//
router.get('/issues', IssuesController.getIssues);
router.get('/projects', ProjectsController.getProjects);
router.get('/sprints', SprintsController.getAllSprints);
//______________API__KPI________________________//
//CALCULER TICKETS ESTIMEs ET NON ESTIMEs
router.get('/tickets/:project/kpi', KPIController.getTicketKPIForProject);
//CALCUL CHARGE TICKETS ESTIMES
router.get('/tickets/:project/kpi/estimated-time', KPIController.getTotalEstimatedTimeForProject);
//CALCUL DU NOMBRE DES TICKETS PAR TYPE
router.get('/tickets/:project/kpi/by-type', KPIController.getTicketKPIByType);
//CALCUL CHARGE TICKETS ESTIMES PAR TYPE
router.get('/tickets/:project/kpi/estimated-time-by-type', KPIController.getEstimatedTimeByType);
//CALCUL DU NOMBRE DES TICKETS PAR STATUT
router.get('/tickets/:project/kpi/by-statut', KPIController.getTicketKPIByStatut);
//CALCUL CHARGE TICKETS ESTIMES PAR STATUT
router.get('/tickets/:project/kpi/estimated-time-by-statut', KPIController.getEstimatedTimeByStatut);
//CALCUL DE LA COMPLEXITE DES TICKETS PAR TYPE
router.get('/tickets/:project/kpi/complexity-by-type', KPIController.getComplexityByType);
//CALCUL DE LA COMPLEXITE DES TICKETS PAR STATUT
router.get('/tickets/:project/kpi/complexity-by-statut', KPIController.getComplexityByStatut);
//CALCUL VELOCITE
router.get('/project/:project/velocity', KPIController.getVelocityByProject);
//CALCUL CHARGE CONSOMMEE % CHARGE ESTIME
router.get('/project/:project/timeRatioFinish', KPIController.getTimeRatio);
//CALCUL POINTS EFFORT TRAITE % TOTAL POINTS EFFORT
router.get('/project/:project/effortRatio', KPIController.getEffortRatio);
//CALCUL POINTS EFFORT VS CHARGE
router.get('/project/:project/timeEffortRatio', KPIController.getTimeEffortRatio);
//CALCULER NOMBRE DES BUGS
router.get('/project/:project/bugsCount', KPIController.getBugCountByProject);
//CALCULER CHARGE TRAITEMENT DES BUGS
router.get('/project/:project/bugTicketsTimeConsumed', KPIController.getBugTicketsTimeConsumed);
//CALCULER POURCENTAGE TRAITEMENT DES BUGS
router.get('/project/:project/timeConsumRatio', KPIController.getTimeConsumptionRatio);
//CALCULER BUG GENERE PAR EFFORT DE DEVELOPPEMENT
router.get('/project/:project/bugEffortDevRatio', KPIController.getBugEffortRatio);
//CALCULER RATIO BUGS % NBR US
router.get('/project/:project/bugToStoryRatio', KPIController.calculateBugToStoryRatioForProject);
//CALCULER QUALITE FONCTIONNELLE
router.get('/project/:project/timeConsumedRatio', KPIController.getTimeConsumedRatio);
//AVANCEMENT DES TRAVAUX : NBR US CLOTURES / NBR US TOTAL
router.get('/project/:project/storyCompletionRatio', KPIController.getStoryCompletionRatio);
//AVANCEMENT DES TRAVAUX : TEMPS CONSOMMEE / TEMPS ESTIME
router.get('/project/:project/timeRatio', KPIController.getTimeRatioForProject);
module.exports = router;

