const { MongoClient } = require('mongodb');

let db;

const conexionBDD = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MONGO_URL:', process.env.MONGO_URL);
    const client = new MongoClient(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });

    await client.connect();
    db = client.db();
    console.log('Conexión Exitosa');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { conexionBDD, getDB };
