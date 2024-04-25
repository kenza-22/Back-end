const issuesService = require("../Services/IssuesService");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
//grouper les tickets par clé projet
async function groupIssuesByKey(issues) {
  const grouped = {};

  issues.forEach((issue) => {
    console.log(`project key ${issue.fields?.project?.key}`);
    const projectKey = issue.fields?.project?.key; // Safely access project key
    if (projectKey && projectKey !== "WTM" && projectKey && projectKey !== "INT") {
      if (!grouped[projectKey]) {
        grouped[projectKey] = []; // Initialize the array if it doesn't exist
      }
      grouped[projectKey].push(issue); // Push the issue into the corresponding group
    }
  });

  return grouped;
}
//construire un dossier et mettre les tickets par clé projet
function writeJsonFiles(issuesByKeys) {
  const exportDir = path.join(__dirname, "../exports/issues"); // Define the export directory path

  // Ensure the export directory exists, if not, create it
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
    console.log(`Directory ${exportDir} created.`);
  }

  // extract data to json file by project key
  for (const key in issuesByKeys) {
    if (issuesByKeys.hasOwnProperty(key)) {
      const issues = issuesByKeys[key];
      const jsonData = JSON.stringify(issues, null, 2); // Convert issues array to JSON format with pretty printing

      const filename = path.join(exportDir, `${key}.json`); // Create full file path based on the key and export directory
      fs.writeFileSync(filename, jsonData); // Write JSON data to file
      console.log(`File ${filename} created successfully.`);
    }
  }
}

exports.getIssues = async (req, res) => {
  try {
    const { ATLASSIAN_USERNAME, ATLASSIAN_API_KEY, DOMAIN } = process.env;
    const issues = await issuesService.getIssues(
      ATLASSIAN_USERNAME,
      ATLASSIAN_API_KEY,
      DOMAIN
    );
    console.log("done get issues");
    console.log("start Group By");
    /*      const exportDir = path.join(__dirname, "../db/issues");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
      console.log(`Directory ${exportDir} created.`);
    }
    const jsonData = JSON.stringify(issues, null, 2); // Convert issues array to JSON format with pretty printing
    const filename = path.join(exportDir, `db.json`); // Create full file path based on the key and export directory
    fs.writeFileSync(filename, jsonData);  */
    // Ensure the export directory exists, if not, create it
    //console.log(issues);
    const groupedIssues = await groupIssuesByKey(issues);

    console.log("finish Group By");

    await writeJsonFiles(groupedIssues);
    res.json(true);
  } catch (error) {
    console.log("Error exporting group:", error);
    // console.log("error: ", error);
    res.status(500).json({ error: error.message });
  }
};
