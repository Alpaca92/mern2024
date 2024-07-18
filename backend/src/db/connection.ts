import { connect, disconnect } from 'mongoose';

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log('error: ', error);
    throw new Error("Couldn't connect to the database");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log('error: ', error);
    throw new Error("Couldn't disconnect from the database");
  }
}

export { connectToDatabase, disconnectFromDatabase };
