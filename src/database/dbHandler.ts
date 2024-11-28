export const mongoose = require("mongoose");
const MONGODB_URI = (process.env.MONGO_URL! + process.env.DB!)
console.log(process.env.MONGO_URL);


export async function DBConnect(db = MONGODB_URI){
    if (!db) {
        throw new Error('Mongo connection URL is not defined. Please define it in .env file.')
    }

    await mongoose.connect(db)
        .then(() =>
            console.log('MongoDB Connected'))
        .catch((error: any) =>
            console.log(error)
        );
}

export async function DBDisconnect(){
    await mongoose.connection.close()
        .then(() =>
            console.log('MongoDB Disconnected'))
        .catch((error: any) =>
            console.log(error)
        );
}