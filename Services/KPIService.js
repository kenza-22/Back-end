const mongoose = require('mongoose');
//CALCUL TICKETS ESTIMES ET NON ESTIMES 
const getTicketKPI = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
        const nonNullEstimatedTimeTickets = tickets.filter(ticket => ticket.Temps_Estimé != 0).length;
        const NullEstimatedTimeTickets = tickets.filter(ticket => ticket.Temps_Estimé == 0).length;

        return {
            TicketEstime: nonNullEstimatedTimeTickets,
            TicketNonEstime: NullEstimatedTimeTickets
        };
    } catch (error) {
        throw new Error('Erreur lors du calcul du KPI pour le projet :', error);
    }
};
//CALCUL CHARGE TICKETS ESTIMES
const getTotalEstimatedTimeForProject = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');

        const totalEstimatedTime = await Ticket.aggregate([
            { $match: { Clé_Projet: project, Temps_Estimé: { $ne: 0 } } },
            { $group: { _id: "$Clé_Projet", totalEstimatedTime: { $sum: "$Temps_Estimé" } } }
        ]).toArray();

        totalEstimatedTime.forEach(entry => {
            entry.totalEstimatedTime = Math.round(entry.totalEstimatedTime * 100) / 100;
        });

        return totalEstimatedTime;
    } catch (error) {
        throw new Error('Erreur lors du calcul du KPI de temps estimé pour le projet :', error);
    }
};
//CALCUL DU NOMBRE DES TICKETS PAR TYPE
const getTicketCountByType = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');

        const ticketCountByType = await Ticket.aggregate([
            { $match: { Clé_Projet: project } },
            { $group: { _id: "$Type_Ticket", count: { $sum: 1 } } }
        ]).toArray();

        return ticketCountByType;
    } catch (error) {
        throw new Error('Erreur lors du calcul du KPI par type pour le projet :', error);
    }
};
//CALCUL CHARGE TICKETS ESTIMES PAR TYPE
const getEstimatedTimeByType = async (project) => {
    try {
      const Ticket = mongoose.connection.db.collection('Ticket');
  
      const estimatedTimeByType = await Ticket.aggregate([
        { $match: { Clé_Projet: project, Temps_Estimé: { $ne: 0 } } },
        { $group: { _id: "$Type_Ticket", totalEstimatedTime: { $sum: "$Temps_Estimé" } } }
      ]).toArray();
  
      return estimatedTimeByType;
    } catch (error) {
      throw new Error('Erreur lors du calcul du KPI de temps estimé par type pour le projet : ' + error.message);
    }
  };
//CALCUL DU NOMBRE DES TICKETS PAR STATUT
const getTicketCountByStatut = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');
  
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
  
        const ticketCountByStatut = await Ticket.aggregate([
            { $match: { Clé_Projet: project } },
            { $group: { _id: "$État_Ticket", count: { $sum: 1 } } }
        ]).toArray();
  
        return ticketCountByStatut;
    } catch (error) {
        throw new Error(`Erreur lors du calcul du KPI par statut pour le projet: ${error.message}`);
    }
  };
//CALCUL CHARGE TICKETS ESTIMES PAR STATUT
  const getEstimatedTimeByStatut = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');
  
        console.log("Projet:", project);
  
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        console.log("Tickets pour le projet:", tickets);
  
        const estimatedTimeByStatut = await Ticket.aggregate([
            { $match: { Clé_Projet: project, Temps_Estimé: { $ne: 0 } } },
            { $group: { _id: "$État_Ticket", totalEstimatedTime: { $sum: "$Temps_Estimé" } } }
        ]).toArray();
        console.log("Temps estimé par statut:", estimatedTimeByStatut);
  
        return estimatedTimeByStatut;
    } catch (error) {
        console.error('Erreur lors du calcul du KPI de temps estimé par statut pour le projet :', error);
        throw new Error('Erreur lors du calcul du KPI de temps estimé par statut pour le projet :', error);
    }
  };
//CALCUL DE LA COMPLEXITE DES TICKETS PAR TYPE
  const getComplexityByType = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');
  
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
  
        const complexityByType = await Ticket.aggregate([
            { $match: { Clé_Projet: project} },
            { $group: { _id: "$Type_Ticket", totalStoryPoints: { $sum: "$Story_Point" } } }
        ]).toArray();
  
        return complexityByType;
    } catch (error) {
        console.error('Erreur lors du calcul du KPI de complexité par statut pour le projet :', error);
        throw new Error('Erreur lors du calcul du KPI de complexité par statut pour le projet :', error);
    }
  };
//CALCUL DE LA COMPLEXITE DES TICKETS PAR STATUT
const getComplexityByStatut = async (project) => {
    try {
      const Ticket = mongoose.connection.db.collection('Ticket');
  
      console.log("Projet:", project);
  
      const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
      console.log("Tickets pour le projet:", tickets);
  
      const complexityByStatut = await Ticket.aggregate([
        { $match: { Clé_Projet: project } }, 
        { $group: { _id: "$État_Ticket", totalStoryPoints: { $sum: "$Story_Point" } } }
      ]).toArray();
      console.log("Complexité par statut:", complexityByStatut);
  
      return complexityByStatut;
    } catch (error) {
      console.error('Erreur lors du calcul du KPI de complexité par statut pour le projet :', error);
      throw new Error('Erreur lors du calcul du KPI de complexité par statut pour le projet');
    }
  };
//CALCUL VELOCITE
const getVelocityByProject = async (project) => {
    try {
      const Ticket = mongoose.connection.db.collection('Ticket');
      
      const uniqueSprints = await Ticket.distinct("Nom_sprint", { Clé_Projet: project, Nom_sprint: { $ne: "Pas de sprint" } });
      const velocities = [];
  
      for (const sprint of uniqueSprints) {
        const totalStoryPoints = await Ticket.aggregate([
          { $match: { Clé_Projet: project, Nom_sprint: sprint } },
          { $group: { _id: null, totalStoryPoints: { $sum: "$Story_Point" } } }
        ]).toArray();
  
        const sumStoryPoints = totalStoryPoints.length > 0 ? totalStoryPoints[0].totalStoryPoints : 0;
        velocities.push({ sprint, velocity: sumStoryPoints });
      }
      
      return velocities;
    } catch (error) {
      throw new Error('Erreur lors du calcul de la vélocité agile pour le projet :', error);
    }
  };
//CALCUL CHARGE CONSOMMEE % CHARGE ESTIME
  const getTimeRatioForProject = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');

        const matchFilter = {
            Clé_Projet: project,
            État_Ticket: { $in: ["Terminé(e)", "Fermée"] },
            $or: [{ Temps_Consommé: { $gt: 0 } }, { Temps_Estimé: { $gt: 0 } }]
        };

        const result = await Ticket.aggregate([
            { $match: matchFilter },
            {
                $group: {
                    _id: null,
                    totalTempsConsommé: { $sum: "$Temps_Consommé" },
                    totalTempsEstimé: { $sum: "$Temps_Estimé" }
                }
            }
        ]).toArray();

        if (result.length === 0) {
            return {};
        }

        const { totalTempsConsommé, totalTempsEstimé } = result[0];

        const percentage = (totalTempsConsommé / totalTempsEstimé) * 100;

        return { percentage };
    } catch (error) {
        throw new Error('Erreur lors du calcul du ratio de temps pour le projet :', error);
    }
};
//CALCUL POINTS EFFORT TRAITE % TOTAL POINTS EFFORT
const getEffortRatioForProject = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const matchFilter = {
            Clé_Projet: project,
            État_Ticket: { $in: ["Terminé(e)", "Fermée"] },
            $or: [{ Story_Point: { $gt: 0 } }]
        };

        const result = await Ticket.aggregate([
            { $match: matchFilter },
            {
                $group: {
                    _id: null,
                    PointEffortTraites: { $sum: "$Story_Point" }
                }
            }
        ]).toArray();

        if (result.length === 0) {
            return {};
        }

        const PointEffortTraites = result[0].PointEffortTraites;
        const totalProjectStoryPoints = await Ticket.aggregate([
            { $match: { Clé_Projet: project, Story_Point: { $gt: 0 } } },
            {
                $group: {
                    _id: null,
                    totalStoryPoints: { $sum: "$Story_Point" },
                }
            }
        ]).toArray();

        if (totalProjectStoryPoints.length === 0) {
            return {};
        }

        const percentage = (PointEffortTraites / totalProjectStoryPoints[0].totalStoryPoints) * 100;
        const roundedPercentage = Math.round(percentage * 100) / 100; // Round to two decimal places

        return { PointEffortTraites, percentage: roundedPercentage };
    } catch (error) {
        throw new Error(`Erreur lors du calcul du ratio de temps pour le projet : ${error.message}`);
    }
};
//CALCUL POINTS EFFORT VS CHARGE
const calculateTimeEffortRatio = async (project) => {
    try {
      const Ticket = mongoose.connection.db.collection('Ticket');
  
      const matchFilter = {
        Clé_Projet: project,
        $or: [
          { Temps_Estimé: { $gt: 0 } }, 
          { Story_Point: { $gt: 0 } } 
        ]
      };
  
      const result = await Ticket.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: null,
            totalTempsEstimé: { $sum: "$Temps_Estimé" },
            totalStoryPoints: { $sum: "$Story_Point" }
          }
        }
      ]).toArray();
  
      if (result.length === 0) {
        return {};
      }
  
      const { totalTempsEstimé, totalStoryPoints } = result[0];
      const SPVsCharge = totalTempsEstimé / totalStoryPoints;
      const ratio = Math.round(SPVsCharge * 100) / 100; // Utilisez toFixed(2) pour arrondir à 2 décimales
  
      return { ratio };
    } catch (error) {
      throw new Error(`Erreur lors du calcul du ratio temps/effort pour le projet : ${error.message}`);
    }
  };
//CALCULER NOMBRE DES BUGS
const getBugCountByProject = async (project) => {
    try {
      const Ticket = mongoose.connection.db.collection('Ticket');
      
      const matchFilter = {
        Clé_Projet: project,
        Type_Ticket: { $in: ["Bug", "Bug Sub Task", "Bogue"] }
      };
      
      const count = await Ticket.countDocuments(matchFilter);
      
      return count;
    } catch (error) {
      throw new Error('Erreur lors du calcul du nombre de tickets de type "Bug" pour le projet : ' + error.message);
    }
  };
//CALCULER CHARGE TRAITEMENT DES BUGS
const calculateBugTicketsTimeConsumed = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const matchFilter = {
            Clé_Projet: project,
            Type_Ticket: { $in: ["Bug", "Bug Sub Task", "Bogue"] },
            Temps_Consommé: { $gt: 0 } // Filtre pour les tickets ayant un temps consommé supérieur à zéro
        };
        
        const result = await Ticket.aggregate([
            { $match: matchFilter },
            {
                $group: {
                    _id: null,
                    totalTempsConsommé: { $sum: "$Temps_Consommé" }
                }
            }
        ]).toArray();
        
        const totalTempsConsommé = result.length > 0 ? result[0].totalTempsConsommé : 0;
        return Math.round(totalTempsConsommé, 2);
    } catch (error) {
        throw new Error('Erreur lors du calcul du temps consommé pour les tickets de type "Bug" pour le projet :', error);
    }
};
//CALCULER POURCENTAGE TRAITEMENT DES BUGS
const calculateTimeConsumptionRatio = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');

        const matchFilter = {
            Clé_Projet: project,
            Type_Ticket: { $in: ["Bug", "Bogue", "Bug Sub Task"] },
            $or: [{ Temps_Consommé: { $gt: 0 } }, { Temps_Estimé: { $gt: 0 } }]
        };

        const result = await Ticket.aggregate([
            { $match: matchFilter },
            {
                $group: {
                    _id: null,
                    totalTempsConsommé: { $sum: "$Temps_Consommé" },
                }
            },
            {
                $lookup: {
                    from: "Ticket",
                    pipeline: [
                        { $match: { Clé_Projet: project, $or: [{ Temps_Consommé: { $gt: 0 } }, { Temps_Estimé: { $gt: 0 } }] } },
                        { $group: { _id: null, totalTempsEstimé: { $sum: "$Temps_Estimé" } } }
                    ],
                    as: "totalTempsEstimé"
                }
            },
            {
                $unwind: "$totalTempsEstimé"
            }
        ]).toArray();

        if (result.length === 0) {
            return {};
        }

        const { totalTempsConsommé, totalTempsEstimé } = result[0];
        const ratioPercentage = (totalTempsConsommé / totalTempsEstimé.totalTempsEstimé) * 100;
        const Percentage = Math.round(ratioPercentage, 2);
        
        return { totalTempsConsommé, totalTempsEstimé: totalTempsEstimé.totalTempsEstimé, Percentage };
    } catch (error) {
        throw new Error('Erreur lors du calcul du ratio de consommation de temps pour le projet :', error);
    }
};
//CALCULER BUG GENERE PAR EFFORT DE DEVELOPPEMENT
const calculateBugEffortRatio = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');

        const matchFilter = {
            Clé_Projet: project,
            $or: [
                { Type_Ticket: { $in: ["Bug", "Bug Sub Task", "Bogue"] } },
                { État_Ticket: { $in: ["Terminé(e)", "Fermée"] } }
            ]
        };

        const bugTickets = await Ticket.aggregate([
            { $match: matchFilter },
            { $group: { _id: null, totalBugTickets: { $sum: 1 } } }
        ]).toArray();

        const storyTickets = await Ticket.aggregate([
            { $match: { Clé_Projet: project, Type_Ticket: "Story", État_Ticket: { $in: ["Terminé(e)", "Fermée"] } } },
            { $group: { _id: null, totalStoryPoints: { $sum: "$Story_Point" } } }
        ]).toArray();

        if (bugTickets.length === 0 || storyTickets.length === 0) {
            return 0;
        }

        const bugEffortRatio = bugTickets[0].totalBugTickets / storyTickets[0].totalStoryPoints;
        const bugEffort = Math.round(bugEffortRatio, 2);

        return bugEffort;
    } catch (error) {
        throw new Error('Erreur lors du calcul du ratio d\'effort pour les bugs pour le projet :', error);
    }
};
//CALCULER RATIO BUGS % NBR US
const calculateBugToStoryRatio = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');

        const matchFilter = {
            Clé_Projet: project,
            $or: [
                { Type_Ticket: { $in: ["Bug", "Bug Sub Task", "Bogue"] } },
                { Type_Ticket: "Story" }
            ]
        };
        const bugTickets = await Ticket.aggregate([
            { $match: matchFilter },
            { $group: { _id: "$Type_Ticket", totalTickets: { $sum: 1 } } }
        ]).toArray();

        if (bugTickets.length === 0) {
            return {};
        }

        const bugTicket = bugTickets.find(ticket => ticket._id !== "Story");
        const storyTicket = bugTickets.find(ticket => ticket._id === "Story");
        const bugTotal = bugTicket ? bugTicket.totalTickets : 0;
        const storyTotal = storyTicket ? storyTicket.totalTickets : 0;
        const bugToStoryRatio = (bugTotal / storyTotal) * 100;

        return { bugToStoryRatio };
    } catch (error) {
        throw new Error('Erreur lors du calcul du ratio de tickets pour le projet :', error);
    }
};
//CALCULER QUALITE FONCTIONNELLE
const calculateTimeConsumedRatio = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const matchFilter = {
            Clé_Projet: project,
            $or: [
                { Type_Ticket: { $in: ["Bug", "Bug Sub Task", "Bogue"] } },
                { Type_Ticket: "Story" }
            ]
        };
        
        const tickets = await Ticket.aggregate([
            { $match: matchFilter },
            {
                $group: {
                    _id: "$Type_Ticket",
                    totalTempsConsommé: { $sum: "$Temps_Consommé" }
                }
            }
        ]).toArray();
        
        const bugTimeConsumed = tickets.find(ticket => ticket._id !== "Story")?.totalTempsConsommé || 0;
        const storyTimeConsumed = tickets.find(ticket => ticket._id === "Story")?.totalTempsConsommé || 0;
        const ratio = (bugTimeConsumed / storyTimeConsumed) * 100 || 0;
        
        return ratio;
    } catch (error) {
        throw new Error('Erreur lors du calcul du ratio de temps consommé pour le projet :', error);
    }
};
//AVANCEMENT DES TRAVAUX : NBR US CLOTURES / NBR US TOTAL
const calculateStoryCompletionRatio = async (project) => {
    try {
      const Ticket = mongoose.connection.db.collection('Ticket');
  
      const matchFilter = {
        Clé_Projet: project,
        Type_Ticket: "Story",
        État_Ticket: { $in: ["Terminé(e)", "Fermée"] }
      };
  
      const completedStoryTickets = await Ticket.find(matchFilter).count();
      const totalStoryTickets = await Ticket.find({ Clé_Projet: project, Type_Ticket: "Story" }).count();
  
      const ratio = (totalStoryTickets === 0) ? 0 : (completedStoryTickets / totalStoryTickets) * 100;
  
      return ratio;
    } catch (error) {
      throw new Error('Erreur lors du calcul du ratio de complétion des tickets Story pour le projet :', error);
    }
  };
//AVANCEMENT DES TRAVAUX : TEMPS CONSOMMEE / TEMPS ESTIME
const calculateTimeRatioForProject = async (project) => {
    try {
        const Ticket = mongoose.connection.db.collection('Ticket');

        const totalTempsConsommé = await Ticket.aggregate([
            { $match: { Clé_Projet: project } },
            { $group: { _id: null, total: { $sum: "$Temps_Consommé" } } }
        ]).toArray();

        const totalTempsEstimé = await Ticket.aggregate([
            { $match: { Clé_Projet: project } },
            { $group: { _id: null, total: { $sum: "$Temps_Estimé" } } }
        ]).toArray();

        const tempsConsommé = totalTempsConsommé.length > 0 ? totalTempsConsommé[0].total : 0;
        const tempsEstimé = totalTempsEstimé.length > 0 ? totalTempsEstimé[0].total : 0;

        const ratio = (tempsConsommé / tempsEstimé) * 100 || 0;
        return { ratio };
    } catch (error) {
        throw new Error('Erreur lors du calcul du ratio de temps pour le projet :', error);
    }
};
module.exports = {
    getTicketKPI, getTotalEstimatedTimeForProject, getTicketCountByType, getEstimatedTimeByType, getTicketCountByStatut, 
    getEstimatedTimeByStatut, getComplexityByType, getComplexityByStatut, getVelocityByProject, getTimeRatioForProject,
    getEffortRatioForProject, calculateTimeEffortRatio, getBugCountByProject, calculateBugTicketsTimeConsumed,calculateTimeConsumptionRatio,
    calculateBugEffortRatio, calculateBugToStoryRatio, calculateTimeConsumedRatio, calculateStoryCompletionRatio, calculateTimeRatioForProject
};
