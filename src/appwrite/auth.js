import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) return this.login({ email, password })
        } catch (error) {
            console.log("appwrite :: auth :: createAccount", error);
            throw error  // re-throw so Signup.jsx can show the error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("appwrite :: auth :: login", error);
            throw error  // re-throw so Login.jsx can show the error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite :: auth :: getCurrentUser", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite :: auth :: logout", error);
        }
    }
}

const authService = new AuthService();
export default authService;
