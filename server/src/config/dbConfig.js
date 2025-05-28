import mongoose from 'mongoose'
import { MONGODB_URI } from './serverConfig.js';

export default async function ConnectToDB(){
    try{
        console.log('mongodb connection string is:', MONGODB_URI);
       await mongoose.connect(MONGODB_URI); // Connection to MongoDB        
       console.log('connection is successful with mongodb');
    }catch(error){
        console.log('some error occurred while connecting to mongodb database');
        console.error(error);
    }
}
