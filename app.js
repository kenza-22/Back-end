const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Route = require('./Routes/Route');

app.use(cors());

app.listen(5000, (err) => {
    if (err) {
        console.log("Error!");
    } else {
        console.log(`Server started`);
    }
});

mongoose.connect("mongodb://127.0.0.1:27017/Jira")
    .then(() => {
        console.log("Successfully Connected to DB");
    })
    .catch((error) => {
        console.log("Error Connecting to DB", error);
    });

app.get('/KPIProjet', async (req, res)=>{
    try{
      const KPIProjet = mongoose.connection.db.collection('KPI projet');
      const data1 = await KPIProjet.find({}).toArray();

        res.json(data1);
    }catch(err){
   console.error('Erreur lors de la récupération des données', err);
   res.status(500).json({message: 'Erreur lors de la récupération des données depuis MongoDB'});
    }
})

app.get('/KPIProjet/:nomProjet', async (req, res, next) => {
    const nomProjet = req.params.nomProjet;
    try {
        const KPIProjet = mongoose.connection.db.collection('KPI projet');
        const kpis = await KPIProjet.find({ Projet: nomProjet }).toArray(); 
        console.log(kpis);
        res.json(kpis); 
    } catch (error) {
        next(error); 
    }
});


app.get('/KPISprint', async (req, res)=>{
    try{
      const KPISprint = mongoose.connection.db.collection('KPI sprint');
      const data2 = await KPISprint.find({}).toArray();
     
        res.json(data2);
    }catch(err){
   console.error('Erreur lors de la récupération des données', err);
   res.status(500).json({message: 'Erreur lors de la récupération des données depuis MongoDB'});
    }
})
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

app.use('/', Route);