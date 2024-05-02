var UserService = require('../Services/UserService');

const createUserController = async (req, res) => {
  try {
      console.log(req.body);
      var status = await UserService.createUserDBService(req.body);
      console.log(status);

      if (status) {
          res.send({ "status": true, "message": "User created successfully" });
      } else {
          res.send({ "status": false, "message": "Error creating user" });
      }
  } catch (err) {
      console.log(err); 

      if (err && err.err) {
          res.status(400).send({ "status": false, "message": err.err }); 
      } else {
          res.status(500).send({ "status": false, "message": "Internal Server Error" }); 
      }
  }
}


const getAllUsersController = async (req, res) => {
  try {
      const users = await UserService.getAllUsersDBService();
      res.status(200).json(users);
  } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
}

const getUserByIdController = async (req, res) => {
  try {
      const userID = req.params.userID; 
      const user = await UserService.getUserByIDService(userID); 
      res.status(200).json(user); 
  } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur par ID:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur par ID' });
  }
}

const deleteUserByIdController = async (req, res) => {
  try {
      const userID = req.params.userID;
      const success = await UserService.deleteUserByIdService(userID);
      if (success) {
          res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
      } else {
          res.status(404).json({ error: 'Utilisateur non trouvé ou erreur lors de la suppression' });
      }
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};

const updateUserByIdController = async (req, res) => {
  try {
      const userID = req.params.userID;
      const updatedUserData = req.body; 
      const updatedUser = await UserService.updateUserByIdService(userID, updatedUserData);
      res.status(200).json(updatedUser); 
  } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};



const loginUserControllerFn = async (req, res) => {
    var result = null;
    try {
        result = await UserService.loginUserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createUserController,loginUserControllerFn,getAllUsersController,getUserByIdController, deleteUserByIdController, updateUserByIdController  };