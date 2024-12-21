import { Client, Account } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("ENTER_YOUR_PROJECT_ID_HERE");

export const newAccount = new Account(client);

export default client;
