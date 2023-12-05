
const bcrypt = require("bcryptjs");

//Password convert into hash
exports.hashPassword = async (password,saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    
    // Hash password    
    return await bcrypt.hash(password, salt)
};

//Password match
exports.matchPassword = async (password,encryptedPassword) => {
    const password_match = await bcrypt.compare(password,encryptedPassword)
    return password_match;
};

// //Get Prior Password match
// exports.getPriormatchPasswordData = async (password,encryptedPassword) => {

//     let is_password_exist_status = false;

//     for(var i=0;i<encryptedPassword.length;i++){

//         const password_match = await bcrypt.compare(password,encryptedPassword[i]);

//         if(password_match){
//             is_password_exist_status = true;
//         }

//     }


//     return is_password_exist_status;
// };

