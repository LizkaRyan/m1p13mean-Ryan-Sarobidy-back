// // updatePassword.js
// import bcrypt from 'bcrypt'; // si tu utilises "type": "module" dans package.json
// import { MongoClient } from 'mongodb';

// const uri = 'mongodb://localhost:27017'; // adapte selon ton MongoDB
// const client = new MongoClient(uri);

// async function updatePassword() {
//   try {
//     await client.connect();
//     const db = client.db('mean'); // remplace par ton nom de base
//     const hash = await bcrypt.hash('boutique1', 10);

//     const result = await db.collection('users').updateOne(
//       { email: 'Rakoto@gmail.com' },
//       { $set: { password: hash } }
//     );

//     console.log('Utilisateur mis à jour :', result.modifiedCount);
//   } finally {
//     await client.close();
//   }
// }

// updatePassword();


// // // updatePassword.js
// // import bcrypt from 'bcrypt'; // si tu utilises "type": "module" dans package.json
// // import { MongoClient } from 'mongodb';

// // const uri = 'mongodb://localhost:27017'; // adapte selon ton MongoDB
// // const client = new MongoClient(uri);

// // async function updatePassword() {
// //   try {
// //     await client.connect();
// //     const db = client.db('mean'); // remplace par ton nom de base
// //     const hash = await bcrypt.hash('motdepasse123', 10);

// //     const result = await db.collection('users').updateOne(
// //       { email: 'Rabe@gmail.com' },
// //       { $set: { password: hash } }
// //     );

// //     console.log('Utilisateur mis à jour :', result.modifiedCount);
// //   } finally {
// //     await client.close();
// //   }
// // }

// // updatePassword();