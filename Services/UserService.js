const User = require('../Models/User');
const bcrypt = require('bcrypt');

module.exports.createUserDBService = (UserDetails) => {
    return new Promise(async (resolve, reject) => {
        const existingUser = await User.findOne({ Email: UserDetails.Email });
        if (existingUser) {
            console.log('Email already exists...');
            reject({ err: 'Email already exists' }); 
            return;
        }

        // Vérifiez si UserDetails.Password est défini et non vide avant de le hacher
        if (!UserDetails.Password || typeof UserDetails.Password !== 'string') {
            reject({ err: 'Password is required and must be a non-empty string' });
            return;
        }

        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(UserDetails.Password, saltRounds);

            const newUser = new User({
                Firstname: UserDetails.Firstname,
                Lastname: UserDetails.Lastname,
                Title: UserDetails.Title,
                Email: UserDetails.Email,
                Password: hashedPassword
            });

            await newUser.save();
            resolve(true);
        } catch (error) {
            console.error('Error creating user:', error);
            reject(error);
        }
    });
};

module.exports.getAllUsersDBService = () => {
    return new Promise((resolve, reject) => {
        User.find() 
        .then(users => resolve(users))
        .catch(error => reject(error));
    });
 };

 module.exports.getUserByIDService = (userID) => {
    console.log('ID de l\'utilisateur:', userID);
    return new Promise((resolve, reject) => {
        User.findById(userID) 
        .then(user => {
            console.log('Utilisateur trouvé:', user);
            resolve(user);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            reject(error);
        });
    });
 };

 module.exports.deleteUserByIdService = (userID) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(userID)
            .then(() => {
                resolve(true); // Utilisateur supprimé avec succès
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'utilisateur:', error);
                reject(false); // Erreur lors de la suppression de l'utilisateur
            });
    });
};

module.exports.updateUserByIdService = (userID, updatedUserData) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(userID, updatedUserData, { new: true })
            .then(updatedUser => {
                resolve(updatedUser); 
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
                reject(error); 
            });
    });
};

