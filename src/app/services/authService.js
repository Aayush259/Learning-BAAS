import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    // New client created.
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.API_ENDPOINT)
            .setProject(conf.PROJECT_ID);

        this.account = new Account(this.client);
    };

    // Service to create new account.
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // Service to login user.
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // Service to get current user.
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    // Service to logout all sessions of current logined user.
    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
        return null;
    }
};

const authService = new AuthService();

export default authService;
