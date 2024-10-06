import mongoose from 'mongoose';

const connection={}
export async function connect() {
    try {
        console.log(connection.isConnected,'--mongodb---',process.env.MONGODB_URI);
        if(connection.isConnected){
            return true;
        }
        const db=await mongoose.connect(process.env.MONGODB_URI);
        console.log('database--',db);

        //const connectionTest = mongoose.connection;
        connection.isConnected=db.connections[0].readyState;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
        process.exit(1);
    
    }


}