import conf from "../conf/conf";
import { Client, Account, ID, Models } from "appwrite";

class AuthService {
    // New client created.
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.API_ENDPOINT)
            .setProject(conf.PROJECT_ID);

        this.account = new Account(this.client);
    }

    // Service to create new user account.
    async createAccount({ email, password, name }: { email: string; password: string; name: string }): Promise<Models.User<{}> | Models.Session> {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // Service to login user.
    async login({ email, password }: { email: string; password: string }): Promise<Models.Session> {
        try {
            const logined = await this.account.createEmailPasswordSession(email, password);
            return logined
        } catch (error) {
            throw error;
        }
    }

    // Service to get current logged in user data.
    async getCurrentUser(): Promise<Models.User<{}>> {
        try {
            const got = await this.account.get();
            return got;
        } catch (error) {
            throw error;
        }
    }

    // Service to logout all sessions of current logged in user.
    async logout(): Promise<boolean> {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            throw error;
        }
    }
};

const authService = new AuthService();

export default authService;
