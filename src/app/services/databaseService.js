import conf from '../conf/conf.js';
import { Client, Databases, Query } from 'appwrite';

export class DatabaseService {
    // New client created.
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.API_ENDPOINT)
            .setProject(conf.PROJECT_ID);
        this.databases = new Databases(this.client);
    }

    // Service to create new post.
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // Service to update post.
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // Service to delete post.
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Service to get post.
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
        }
    }

    // Service to get all active posts.
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;
