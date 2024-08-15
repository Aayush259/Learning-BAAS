import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    // Creating new client.
    client = new Client();

    // Declaring account.
    account;

    constructor() {
        // Initializing client with endpoint and project.
        this.client
            .setEndpoint(conf.API_ENDPOINT)
            .setProject(conf.PROJECT_ID);

        // Initializing account.
        this.account = new Account(this.client);
    }

    // Function to create new user accounts.
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // If user account successfully created, then login that user.
            if (userAccount) {
                this.login(email, password);
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // Function to login the user.
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // Function to check if the user is already logged in or not.
    async getUser() {
        try {
            return this.account.get();
        } catch (error) {
            throw error;
        }
    }

    // Function to logout the user.
    async logout() {
        try {
            return this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
};

const authService = new AuthService;

export default authService;
