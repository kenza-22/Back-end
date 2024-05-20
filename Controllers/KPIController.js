const KPIService = require('../Services/KPIService');
//CALCUL TICKETS ESTIMES ET NON ESTIMES 
const getTicketKPIForProject = async (req, res) => {
    try {
        const project = req.params.project;
        const ticketKPI = await KPIService.getTicketKPI(project);
        res.json(ticketKPI);
    } catch (error) {
        console.error('Erreur lors du calcul du KPI pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI pour le projet' });
    }
};
//CALCUL CHARGE TICKETS ESTIMES
const getTotalEstimatedTimeForProject = async (req, res) => {
    try {
        const project = req.params.project;
        const totalEstimatedTime = await KPIService.getTotalEstimatedTimeForProject(project);
        res.json(totalEstimatedTime);
    } catch (error) {
        console.error('Erreur lors du calcul du KPI de temps estimé pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI de temps estimé pour le projet' });
    }
};
//CALCUL DU NOMBRE DES TICKETS PAR TYPE
const getTicketKPIByType = async (req, res) => {
    try {
        const project = req.params.project;
        const ticketCountByType = await KPIService.getTicketCountByType(project);
        res.json(ticketCountByType);
    } catch (error) {
        console.error('Erreur lors du calcul du KPI par type pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI par type pour le projet' });
    }
};
//CALCUL CHARGE TICKETS ESTIMES PAR TYPE
const getEstimatedTimeByType = async (req, res) => {
    try {
      const project = req.params.project;
      const estimatedTimeByType = await KPIService.getEstimatedTimeByType(project);
      res.json(estimatedTimeByType);
    } catch (error) {
      console.error('Erreur lors du calcul du KPI de temps estimé par type pour le projet :', error.message);
      res.status(500).json({ message: 'Erreur lors du calcul du KPI de temps estimé par type pour le projet' });
    }
  };
//CALCUL DU NOMBRE DES TICKETS PAR STATUT
const getTicketKPIByStatut = async (req, res) => {
    try {
        const project = req.params.project;
        const ticketCountByStatut = await KPIService.getTicketCountByStatut(project);
        res.json(ticketCountByStatut);
    } catch (error) {
        console.error('Erreur lors du calcul du KPI par statut pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI par statut pour le projet', details: error.message });
    }
  };
  //CALCUL CHARGE TICKETS ESTIMES PAR STATUT
  const getEstimatedTimeByStatut = async (req, res) => {
    try {
      const project = req.params.project;
      const estimatedTimeByStatut = await KPIService.getEstimatedTimeByStatut(project);
      res.json(estimatedTimeByStatut);
    } catch (error) {
      console.error('Erreur lors du calcul du KPI de temps estimé par statut pour le projet :', error.message);
      res.status(500).json({ message: 'Erreur lors du calcul du KPI de temps estimé par statut pour le projet' });
    }
  };
  //CALCUL DE LA COMPLEXITE DES TICKETS PAR TYPE
  const getComplexityByType = async (req, res) => {
    try {
        const project = req.params.project;
        const complexityByType = await KPIService.getComplexityByType(project);
        res.json(complexityByType);
    } catch (error) {
        console.error('Erreur lors du calcul du KPI de complexité par statut pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI de complexité par statut pour le projet' });
    }
  };
//CALCUL DE LA COMPLEXITE DES TICKETS PAR STATUT

const getComplexityByStatut = async (req, res) => {
    try {
      const project = req.params.project;
      const complexityByStatut = await KPIService.getComplexityByStatut(project);
      res.json(complexityByStatut);
    } catch (error) {
      console.error('Erreur lors du calcul du KPI de complexité par statut pour le projet :', error.message);
      res.status(500).json({ message: 'Erreur lors du calcul du KPI de complexité par statut pour le projet' });
    }
  };
//CALCUL VELOCITE
const getVelocityByProject = async (req, res) => {
    try {
      const project = req.params.project;
      const velocities = await KPIService.getVelocityByProject(project);
      res.json(velocities);
    } catch (error) {
      console.error('Erreur lors du calcul de la vélocité agile pour le projet :', error.message);
      res.status(500).json({ message: 'Erreur lors du calcul de la vélocité agile pour le projet' });
    }
  };
//CALCUL CHARGE CONSOMMEE % CHARGE ESTIME
const getTimeRatio = async (req, res) => {
    try {
        const project = req.params.project;
        const timeRatio = await KPIService.getTimeRatioForProject(project);
        res.json(timeRatio);
    } catch (error) {
        console.error('Erreur lors du calcul du ratio de temps pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de temps pour le projet' });
    }
};
//CALCUL POINTS EFFORT TRAITE % TOTAL POINTS EFFORT
const getEffortRatio = async (req, res) => {
    try {
        const project = req.params.project;
        const effortRatio = await KPIService.getEffortRatioForProject(project);
        res.json(effortRatio);
    } catch (error) {
        console.error('Erreur lors du calcul du ratio de temps pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de temps pour le projet' });
    }
};
//CALCUL POINTS EFFORT VS CHARGE
const getTimeEffortRatio = async (req, res) => {
    try {
      const project = req.params.project;
      const ratio = await KPIService.calculateTimeEffortRatio(project);
      res.json(ratio);
    } catch (error) {
      console.error('Erreur lors du calcul du ratio temps/effort pour le projet :', error.message);
      res.status(500).json({ message: 'Erreur lors du calcul du ratio temps/effort pour le projet' });
    }
  };
//CALCULER NOMBRE DES BUGS
const getBugCountByProject = async (req, res) => {
    try {
      const project = req.params.project;
      const count = await KPIService.getBugCountByProject(project);
      res.json({ count });
    } catch (error) {
      console.error('Erreur lors du calcul du nombre de tickets de type "Bug" pour le projet :', error.message);
      res.status(500).json({ message: 'Erreur lors du calcul du nombre de tickets de type "Bug" pour le projet' });
    }
  };
//CALCULER CHARGE TRAITEMENT DES BUGS
const getBugTicketsTimeConsumed = async (req, res) => {
    try {
        const project = req.params.project;
        const totalTempsConsomme = await KPIService.calculateBugTicketsTimeConsumed(project);
        res.json({ totalTempsConsomme });
    } catch (error) {
        console.error('Erreur lors du calcul du temps consommé pour les tickets de type "Bug" pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du temps consommé pour les tickets de type "Bug" pour le projet' });
    }
};
//CALCULER POURCENTAGE TRAITEMENT DES BUGS
const getTimeConsumptionRatio = async (req, res) => {
    try {
        const project = req.params.project;
        const ratio = await KPIService.calculateTimeConsumptionRatio(project);
        res.json(ratio);
    } catch (error) {
        console.error('Erreur lors du calcul du ratio de consommation de temps pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de consommation de temps pour le projet' });
    }
};
//CALCULER BUG GENERE PAR EFFORT DE DEVELOPPEMENT
const getBugEffortRatio = async (req, res) => {
    try {
        const project = req.params.project;
        const bugEffort = await KPIService.calculateBugEffortRatio(project);
        res.json({ bugEffort });
    } catch (error) {
        console.error('Erreur lors du calcul du ratio d\'effort pour les bugs pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio d\'effort pour les bugs pour le projet' });
    }
};
//CALCULER RATIO BUGS % NBR US
const calculateBugToStoryRatioForProject = async (req, res) => {
    try {
        const project = req.params.project;
        const ratio = await KPIService.calculateBugToStoryRatio(project);
        res.json(ratio);
    } catch (error) {
        console.error('Erreur lors du calcul du ratio de tickets pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de tickets pour le projet' });
    }
};
//CALCULER QUALITE FONCTIONNELLE
const getTimeConsumedRatio = async (req, res) => {
    try {
        const project = req.params.project;
        const ratio = await KPIService.calculateTimeConsumedRatio(project);
        res.json({ ratio });
    } catch (error) {
        console.error('Erreur lors du calcul du ratio de temps consommé pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de temps consommé pour le projet' });
    }
};
//AVANCEMENT DES TRAVAUX : NBR US CLOTURES / NBR US TOTAL
const getStoryCompletionRatio = async (req, res) => {
    try {
      const project = req.params.project;
      const ratio = await KPIService.calculateStoryCompletionRatio(project);
      res.json({ ratio });
    } catch (error) {
      console.error('Erreur lors du calcul du ratio de complétion des tickets Story pour le projet :', error.message);
      res.status(500).json({ message: 'Erreur lors du calcul du ratio de complétion des tickets Story pour le projet' });
    }
  };
//AVANCEMENT DES TRAVAUX : TEMPS CONSOMMEE / TEMPS ESTIME
const getTimeRatioForProject = async (req, res) => {
    try {
        const project = req.params.project;
        const ratio = await KPIService.calculateTimeRatioForProject(project);
        res.json(ratio);
    } catch (error) {
        console.error('Erreur lors du calcul du ratio de temps pour le projet :', error.message);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de temps pour le projet' });
    }
};
module.exports = {
    getTicketKPIForProject, getTotalEstimatedTimeForProject, getTicketKPIByType, getEstimatedTimeByType, getTicketKPIByStatut,
    getEstimatedTimeByStatut, getComplexityByType, getComplexityByStatut, getVelocityByProject, getTimeRatio, getEffortRatio,
    getTimeEffortRatio, getBugCountByProject, getBugTicketsTimeConsumed, getTimeConsumptionRatio, getBugEffortRatio,
    calculateBugToStoryRatioForProject, getTimeConsumedRatio, getStoryCompletionRatio, getTimeRatioForProject
};
