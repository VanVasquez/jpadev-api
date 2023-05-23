import mongoose from 'mongoose';


const HOST = process.env.DATABASE_HOST;
const NAME = process.env.DATABASE_NAME;
const USERNAME = process.env.DATABASE_USERNAME;
const PASSWORD = process.env.DATABASE_PASSWORD;
const MongoDb = mongoose.set('strictQuery', true);

MongoDb.set('strictQuery', true);

async function connectDb() {
  try { 
    await MongoDb.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${HOST}/${NAME}?retryWrites=true&w=majority`); 
    console.log('connected to', MongoDb.connection.name)
  } catch (error) {
    console.error(error);
    setTimeout(connectDb, 5000);
  }
}

connectDb();

export const database = MongoDb.connection
export default MongoDb;