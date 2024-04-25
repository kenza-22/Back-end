const axios = require("axios");

exports.getSprints = async (username, password, domain) => {
  try {
    const baseUrl = "https://" + domain + ".atlassian.net";
    const auth = {
      username: username,
      password: password,
    };
    const data=[]

    // Récupérer tous les projets disponibles
    const projectsConfig = {
      method: "get",
      url: baseUrl + "/rest/api/2/project",
      headers: { "Content-Type": "application/json" },
      auth: auth,
    };

    const projectsResponse = await axios.request(projectsConfig);
    const projects = projectsResponse.data;

    // Récupérer les sprints de tous les projets
    const allSprints = [];

    for (const project of projects) {
      // Récupérer tous les tableaux associés à ce projet
      const boardsConfig = {
        method: "get",
        url: baseUrl + `/rest/agile/1.0/board?projectKeyOrId=${project.key}`,
        headers: { "Content-Type": "application/json" },
        auth: auth,
      };

      const boardsResponse = await axios.request(boardsConfig);
      const boards = boardsResponse.data.values;
       for (const board of boards) {
        data.push(board.id)
      } 
      // Récupérer les sprints de chaque tableau
       for (const board of boards) {
        switch (board.id) {
          //case 172:
          //case 180:
          case 173:
          case 8:
          case 9:
          case 179: 
          case 181:
          case 10:
          case 12:
          case 16:
          case 18:
          case 19:
          case 185:
          case 20:
          case 21:
          case 22:
          case 23:
          case 28:
          case 29:
          case 30:
          case 31:
          case 37:
          case 38:
          case 186:
          case 48:
          case 49:
          case 55:
          case 57:
          case 58:
          case 64:
          case 63:
          case 65:
          case 75:
          case 76:
          case 77:
          case 83:
          case 84:
          case 188:
          case 85:
          case 87:
          case 210:
          case 88:
          case 89:
          case 90:
          case 91:
          case 93:
          case 94:
          case 95:
          case 97:
          case 191:
          case 192:
          case 99:
          case 100:
          case 103:
          case 104:
          case 193:
          case 194:
          case 195:
          case 196:
          case 114:
          case 119:
          case 120:
          case 125:
          case 205:
          case 206:
          case 127:
          case 128:
          case 130:
          case 131:
          case 132:
          case 142:
          case 143:
          case 150:
          case 151:
          case 155:
          case 156:
          case 157:
          case 159:
          case 163:
          case 165:
          case 169:
          break;
          default: {
            const sprintsConfig = {
              method: "get",
              url: baseUrl + `/rest/agile/1.0/board/${board.id}/sprint`,
              headers: { "Content-Type": "application/json" },
              auth: auth,
            };

            const sprintsResponse = await axios.request(sprintsConfig);
            const sprints = sprintsResponse.data.values;

            // Ajouter le nom du projet à chaque sprint
            const sprintsWithProjectName = sprints?.map((sprint) => ({
              ...sprint,
              projectName: project.name,
            }));

            allSprints.push(...sprintsWithProjectName);
            break;
          }
        }
      }  
    }

    return allSprints;
  } catch (error) {
    throw error;
  }
};
