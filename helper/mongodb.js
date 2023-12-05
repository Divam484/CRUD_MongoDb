const mongoose = require("mongoose");
// const database = require("./database");

exports.mongo_connection = async() => {
  try {

    const result = await mongoose.connect(process.env.DB_CONNECTION_STRING,
      { useNewUrlParser: true,useUnifiedTopology: true},
    );

console.log("mongodb connect");
  } catch (e) {
    console.log("MongoDB Connection Error",e);
  }
}

//   // mongoose.backup_quickbook = mongoose.createConnection(
//   //   "mongodb://localhost:27017/backup_quickbook",
//   //   { useNewUrlParser: true,useUnifiedTopology: true},
//   //   function (err, db) {
//   //     if (err) {
//   //       console.log("MongoDB Database Connection Error first", err);
//   //     } else {
//   //       console.log("MongoDB Connection Done!!", "mongodb://localhost:27017/backup_quickbook");
//   //     }
//   //   }
//   // );

// };



// exports.backup_quickbook = () => {

//   mongoose.createConnection(
//     "mongodb://localhost:27017/backup_quickbook",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     function (err, db) {
//       if (err) {
//         console.log("MongoDB Database Connection Error first", err);
//       } else {
//         console.log("MongoDB Connection Done!!", "mongodb://localhost:27017/backup_quickbook");
//       }
//     }
//   );

// }

// mongoose.connect(
//   "mongodb://localhost:27017ecommerce",
//         { useNewUrlParser: true,useUnifiedTopology: true},
//       function (err, db) {
//         if (err) {
//           console.log("MongoDB Database Connection Error first", err);
//         } else {
//           console.log("MongoDB Connection Done!!", database.mongoUrl);
//         }
//       }
//     );

  



// module.exports = mongoose;
