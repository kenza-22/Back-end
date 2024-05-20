const issuesService = require("../Services/IssuesService");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
//grouper les tickets par clé projet
async function groupIssuesByKey(issues) {
  const grouped = {};
  console.log('im here')
  issues.forEach((issue) => {
    console.log(`project key ${issue.fields?.project?.key}`);
    const projectKey = issue.fields?.project?.key; 
    if (projectKey && projectKey !== "WTM" && projectKey && projectKey !== "INT") {
      if (!grouped[projectKey]) {
        grouped[projectKey] = []; 
      }
      grouped[projectKey].push(issue);
    }
  });

  return grouped;
}

function writeJsonFiles(issuesByKeys) {
  const exportDir = path.join(__dirname, "../exports/issues"); 

  
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
    console.log(`Directory ${exportDir} created.`);
  }

  for (const key in issuesByKeys) {
    if (issuesByKeys.hasOwnProperty(key)) {
      const issues = issuesByKeys[key];
      const jsonData = JSON.stringify(issues, null, 2); 

      const filename = path.join(exportDir, `${key}.json`); 
      fs.writeFileSync(filename, jsonData); 
      console.log(`File ${filename} created successfully.`);
    }
  }
}

const getIssues = async (req, res) => {
  try {
    const { ATLASSIAN_USERNAME, ATLASSIAN_API_KEY, DOMAIN } = process.env;
    const issues = await issuesService.getIssues(
      ATLASSIAN_USERNAME,
      ATLASSIAN_API_KEY,
      DOMAIN
    );
    console.log("done get issues");
    console.log("start Group By");
 
  
    const groupedIssues = await groupIssuesByKey(issues);
    await writeJsonFiles(groupedIssues);
    res.json(true);
    
  } catch (error) {
    console.log("Error exporting group:", error);
    res.status(500).json({ error: error.message });
  }
};
const GetTicketsdb = async (req, res) => {
  try {
    const tickets = await issuesService.GetAllTicketsdb();
    res.json(tickets);
  } catch (err) {
    console.error('Erreur lors de la récupération des données', err.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des données depuis MongoDB', details: err.message });
  }
};
const GetTicketsByProject = async (req, res) => {
  try {
    const project = req.params.project;
    const tickets = await issuesService.GetTicketsByProject(project);
    res.json(tickets);
  } catch (err) {
    console.error('Erreur lors de la récupération des tickets par projet :', err.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des tickets par projet' });
  }
};
module.exports={getIssues, GetTicketsdb, GetTicketsByProject}