import mongoClient from "npm:mongoose@8.15.1"
import { ENV } from "../../../config/config.ts";

export async function mongoConnection(callback: () => void = () => {}) {
    if(mongoClient.connection.readyState !== 1) {
        await mongoClient.connect(ENV.URL_MONG);
    }
    callback();
    return {db: mongoClient.connection, Schema:mongoClient.Schema, isConnected: mongoClient.connection.readyState === 1};   
}

export const disconnect = async (callback: () => void = () => {}) =>{
    try {
        await mongoClient.disconnect();
        callback();
        return true;
    } catch (error) {
        throw new Error(`Failed to disconnect from MongoDB: ${error instanceof Error ? error.message : String(error)}`);
    }
}