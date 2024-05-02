const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Route = require('./Routes/Route');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(5000, (err) => {
    if (err) {
        console.log("Error!");
    } else {
        console.log(`Server started`);
    }
});

mongoose.connect("mongodb://127.0.0.1:27017/Project_Jira")
    .then(() => {
        console.log("Successfully Connected to DB");
    })
    .catch((error) => {
        console.log("Error Connecting to DB", error);
    });


app.get('/Projet', async (req, res)=>{
    try{
     
      const Projet = mongoose.connection.db.collection('Projet');
      const data3 = await Projet.find({}).toArray(); 
        res.json(data3);
    }catch(err){
   console.error('Erreur lors de la récupération des données', err);
   res.status(500).json({message: 'Erreur lors de la récupération des données depuis MongoDB'});
    }
})
app.get('/Sprint', async (req, res)=>{
    try{
      const Sprint = mongoose.connection.db.collection('Sprint');
      const data4 = await Sprint.find({}).toArray();
        res.json(data4);
    }catch(err){
   console.error('Erreur lors de la récupération des données', err);
   res.status(500).json({message: 'Erreur lors de la récupération des données depuis MongoDB'});
    }
})
app.get('/Ticket', async (req, res)=>{
    try{
      const Ticket = mongoose.connection.db.collection('Ticket');
      const data5 = await Ticket.find({}).toArray();
        res.json(data5);
    }catch(err){
   console.error('Erreur lors de la récupération des données', err);
   res.status(500).json({message: 'Erreur lors de la récupération des données depuis MongoDB'});
    }
})
app.get('/tickets/:project', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        // Récupérer uniquement les tickets pour le projet spécifié
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
        res.json(tickets);
    } catch (err) {
        console.error('Erreur lors de la récupération des tickets par projet :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des tickets par projet' });
    }
});
//CALCUL NOMBRE TICKETS ESTIMES ET NON ESTIMES
app.get('/tickets/:project/kpi', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        // Récupérer uniquement les tickets pour le projet spécifié
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
        // Calculer le nombre de tickets ayant une valeur non nulle pour le temps estimé
        const nonNullEstimatedTimeTickets = tickets.filter(ticket => ticket.Temps_Estimé!= 0).length;
        const NullEstimatedTimeTickets = tickets.filter(ticket => ticket.Temps_Estimé == 0).length;

        res.json({ 
            TicketEstime: nonNullEstimatedTimeTickets ,
            TicketNonEstime: NullEstimatedTimeTickets

        });
    } catch (err) {
        console.error('Erreur lors du calcul du KPI pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI pour le projet' });
    }
});

//CALCUL CHARGE TICKETS ESTIMES
app.get('/tickets/:project/kpi/estimated-time', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
     
        const totalEstimatedTime = await Ticket.aggregate([
            { $match: { Clé_Projet: project, Temps_Estimé: { $ne: 0 } } },
            { $group: { _id: "$Clé_Projet", totalEstimatedTime: { $sum: "$Temps_Estimé" } } }
        ]).toArray();
        
        res.json(totalEstimatedTime);
    } catch (err) {
        console.error('Erreur lors du calcul du KPI de temps estimé pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI de temps estimé pour le projet' });
    }
});


//CALCUL DU NOMBRE DES TICKETS PAR TYPE
app.get('/tickets/:project/kpi/by-type', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
        const ticketCountByType = await Ticket.aggregate([
            { $match: { Clé_Projet: project } },
            { $group: { _id: "$Type_Ticket", count: { $sum: 1 } } }
        ]).toArray();
        
        res.json(ticketCountByType);
    } catch (err) {
        console.error('Erreur lors du calcul du KPI par type pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI par type pour le projet' });
    }
});

//CHARGE TICKETS ESTIMES PAR TYPE
app.get('/tickets/:project/kpi/estimated-time-by-type', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
       
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
    
        const estimatedTimeByType = await Ticket.aggregate([
            { $match: { Clé_Projet: project, Temps_Estimé: { $ne: 0 } } }, 
            { $group: { _id: "$Type_Ticket", totalEstimatedTime: { $sum: "$Temps_Estimé" } } }
        ]).toArray();
        
        res.json(estimatedTimeByType);
    } catch (err) {
        console.error('Erreur lors du calcul du KPI de temps estimé par type pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI de temps estimé par type pour le projet' });
    }
});

//CALCUL DU NOMBRE DES TICKETS PAR STATUT
app.get('/tickets/:project/kpi/by-statut', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
        const ticketCountByStatut = await Ticket.aggregate([
            { $match: { Clé_Projet: project } },
            { $group: { _id: "$État_Ticket", count: { $sum: 1 } } }
        ]).toArray();
        
        res.json(ticketCountByStatut );
    } catch (err) {
        console.error('Erreur lors du calcul du KPI par statut pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI par statut pour le projet' });
    }
});

//CALCUL DU NOMBRE DES TICKETS ESTIME PAR STATUT
app.get('/tickets/:project/kpi/estimated-time-by-statut', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
        
        const estimatedTimeByStatut = await Ticket.aggregate([
            { $match: { Clé_Projet: project, Temps_Estimé: { $ne: 0 } } }, 
            { $group: { _id: "$État_Ticket", totalEstimatedTime: { $sum: "$Temps_Estimé" } } }
        ]).toArray();
        
        res.json(estimatedTimeByStatut);
    } catch (err) {
        console.error('Erreur lors du calcul du KPI de temps estimé par statut pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI de temps estimé par statut pour le projet' });
    }
});

//CALCUL DE LA COMPLEXITE DES TICKETS PAR TYPE
app.get('/tickets/:project/kpi/complexity-by-type', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
        
        const ComplexityByType = await Ticket.aggregate([
            { $match: { Clé_Projet: project} }, 
            { $group: { _id: "$Type_Ticket", totalStoryPoints: { $sum: "$Story_Point" } } }
        ]).toArray();
        
        res.json(ComplexityByType);
    } catch (err) {
        console.error('Erreur lors du calcul du KPI de complexité par statut pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI de complexité par statut pour le projet' });
    }
});
//CALCUL DE LA COMPLEXITE DES TICKETS PAR STATUT
app.get('/tickets/:project/kpi/complexity-by-statut', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
        
        const ComplexityByStatut = await Ticket.aggregate([
            { $match: { Clé_Projet: project} }, 
            { $group: { _id: "$État_Ticket", totalStoryPoints: { $sum: "$Story_Point" } } }
        ]).toArray();
        
        res.json(ComplexityByStatut);
    } catch (err) {
        console.error('Erreur lors du calcul du KPI de complexité par statut pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du KPI de complexité par statut pour le projet' });
    }
});
//CALCUL VELOCITE
app.get('/project/:project/velocity', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
        
        const uniqueSprints = await Ticket.distinct("Nom_sprint", { Clé_Projet: project });
        const numberOfSprints = uniqueSprints.length;
        
        const totalStoryPoints = await Ticket.aggregate([
            { $match: { Clé_Projet: project } },
            { $group: { _id: null, totalStoryPoints: { $sum: "$Story_Point" } } }
        ]).toArray();
        const sumStoryPoints = totalStoryPoints.length > 0 ? totalStoryPoints[0].totalStoryPoints : 0;
        
   
        const velocity = numberOfSprints > 0 ? sumStoryPoints / numberOfSprints : 0;
        
        res.json({ numberOfSprints, velocity });
    } catch (err) {
        console.error('Erreur lors du calcul de la vélocité agile pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul de la vélocité agile pour le projet' });
    }
});

//CALCUL CHARGE CONSOMMEE % CHARGE ESTIME
app.get('/project/:project/timeRatio', async (req, res) => {
    try {
        const project = req.params.project;
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
            return res.json({});
        }
        
        const { totalTempsConsommé, totalTempsEstimé } = result[0];
        
       
        const percentage = (totalTempsConsommé / totalTempsEstimé) * 100;
        
        res.json({ totalTempsConsommé, totalTempsEstimé, percentage });
    } catch (err) {
        console.error('Erreur lors du calcul du ratio de temps pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de temps pour le projet' });
    }
});

//CALCUL POINTS EFFORT TRAITE % TOTAL POINTS EFFORT
app.get('/project/:project/effortRatio', async (req, res) => {
    try {
        const project = req.params.project;
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
            return res.json({});
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
       
        const percentage = (PointEffortTraites / totalProjectStoryPoints[0].totalStoryPoints) * 100;
        
        res.json({ PointEffortTraites, percentage });
    } catch (err) {
        console.error('Erreur lors du calcul du ratio de temps pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de temps pour le projet' });
    }
});
//CALCUL POINTS EFFORT VS CHARGE
app.get('/project/:project/timeEffortRatio', async (req, res) => {
    try {
        const project = req.params.project;
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
            return res.json({});
        }
        
        const { totalTempsEstimé, totalStoryPoints } = result[0];
        
        // Calculer le ratio du temps estimé par rapport aux points d'effort
        const ratio = (totalTempsEstimé / totalStoryPoints);
        
        res.json({ ratio });
    } catch (err) {
        console.error('Erreur lors du calcul du ratio temps/effort pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio temps/effort pour le projet' });
    }
});
//CALCULER NOMBRE DES BUGS
app.get('/project/:project/bugsCount', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const matchFilter = {
            Clé_Projet: project,
            Type_Ticket: { $in: ["Bug", "Bug Sub Task", "Bogue"] }
        };
        
        const count = await Ticket.countDocuments(matchFilter);
        
        res.json({ count });
    } catch (err) {
        console.error('Erreur lors du calcul du nombre de tickets de type "Bug" pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du nombre de tickets de type "Bug" pour le projet' });
    }
});
//CALCULER CHARGE TRAITEMENT DES BUGS
app.get('/project/:project/bugTicketsTimeConsumed', async (req, res) => {
    try {
        const project = req.params.project;
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
        
        res.json({ totalTempsConsommé });
    } catch (err) {
        console.error('Erreur lors du calcul du temps consommé pour les tickets de type "Bug" pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du temps consommé pour les tickets de type "Bug" pour le projet' });
    }
});

//CALCULER POURCENTAGE TRAITEMENT DES BUGS
app.get('/project/:project/timeConsumRatio', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
        const matchFilter = {
            Clé_Projet: project,
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
            return res.json({});
        }
        
        const { totalTempsConsommé, totalTempsEstimé } = result[0];
        
        // Calcul du ratio en pourcentage
        const ratioPercentage = (totalTempsConsommé / totalTempsEstimé) * 100;
        
        res.json({ totalTempsConsommé, totalTempsEstimé, ratioPercentage });
    } catch (err) {
        console.error('Erreur lors du calcul du ratio de consommation de temps pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de consommation de temps pour le projet' });
    }
});

//CALCULER BUG GENERE PAR EFFORT DE DEVELOPPEMENT
app.get('/project/:project/bugEffortDevRatio', async (req, res) => {
    try {
        const project = req.params.project;
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
            return res.json({});
        }
        
        const bugEffortRatio = bugTickets[0].totalBugTickets / storyTickets[0].totalStoryPoints;
        
        res.json({ bugEffortRatio });
    } catch (err) {
        console.error('Erreur lors du calcul du ratio d\'effort pour les bugs pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio d\'effort pour les bugs pour le projet' });
    }
});

//CALCULER RATIO BUGS % NBR US
app.get('/project/:project/bugToStoryRatio', async (req, res) => {
    try {
        const project = req.params.project;
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
            return res.json({});
        }
        
        const bugTicket  = bugTickets.find(ticket => ticket._id !== "Story");
        const storyTicket  = bugTickets.find(ticket => ticket._id === "Story");
        const bugTotal = bugTicket ? bugTicket.totalTickets : 0;
       const storyTotal = storyTicket ? storyTicket.totalTickets : 0;
        const bugToStoryRatio = (bugTotal / storyTotal) * 100;
        
        res.json({ bugToStoryRatio });
    } catch (err) {
        console.error('Erreur lors du calcul du ratio de tickets pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de tickets pour le projet' });
    }
});
//CALCULER QUALITE FONCTIONNELLE
app.get('/project/:project/timeConsumedRatio', async (req, res) => {
    try {
        const project = req.params.project;
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
        
        // Trouver la somme du temps consommé pour les tickets de type Bug
        const bugTimeConsumed = tickets.find(ticket => ticket._id !== "Story")?.totalTempsConsommé || 0;
        
        // Trouver la somme du temps consommé pour les tickets de type Story
        const storyTimeConsumed = tickets.find(ticket => ticket._id === "Story")?.totalTempsConsommé || 0;
        
        // Calculer le ratio en pourcentage
        const ratio = (bugTimeConsumed / storyTimeConsumed) * 100 || 0;
        
        res.json({ ratio });
    } catch (err) {
        console.error('Erreur lors du calcul du ratio de temps consommé pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de temps consommé pour le projet' });
    }
});
//AVANCEMENT DES TRAVAUX : NBR US CLOTURES / NBR US TOTAL
app.get('/project/:project/storyCompletionRatio', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
      
        const matchFilter = {
            Clé_Projet: project,
            Type_Ticket: "Story",
            État_Ticket: { $in: ["Terminé(e)", "Fermée"] }
        };
        
      
        const completedStoryTickets = await Ticket.find(matchFilter).count();
        
      
        const totalStoryTickets = await Ticket.find({ Clé_Projet: project, Type_Ticket: "Story" }).count();
        
      
        const ratio = (completedStoryTickets / totalStoryTickets) * 100 || 0;
        
        res.json({ ratio });
    } catch (err) {
        console.error('Erreur lors du calcul du ratio de complétion des tickets Story pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de complétion des tickets Story pour le projet' });
    }
});
//AVANCEMENT DES TRAVAUX : TEMPS CONSOMMEE / TEMPS ESTIME
app.get('/project/:project/timeRatio', async (req, res) => {
    try {
        const project = req.params.project;
        const Ticket = mongoose.connection.db.collection('Ticket');
        
     
        const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
        
      
        const totalTempsConsommé = await Ticket.aggregate([
            { $match: { Clé_Projet: project } },
            { $group: { _id: null, total: { $sum: "$Temps_Consommé" } } }
        ]).toArray();

        // Calculer la somme du temps estimé pour tous les tickets
        const totalTempsEstimé = await Ticket.aggregate([
            { $match: { Clé_Projet: project } },
            { $group: { _id: null, total: { $sum: "$Temps_Estimé" } } }
        ]).toArray();

        
        const tempsConsommé = totalTempsConsommé.length > 0 ? totalTempsConsommé[0].total : 0;
        const tempsEstimé = totalTempsEstimé.length > 0 ? totalTempsEstimé[0].total : 0;
        
      
        const ratio = tempsConsommé / tempsEstimé || 0;
        res.json({ ratio });
    } catch (err) {
        console.error('Erreur lors du calcul du ratio de temps pour le projet :', err);
        res.status(500).json({ message: 'Erreur lors du calcul du ratio de temps pour le projet' });
    }
});



app.use('/', Route);