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
    async createPost({ title, slug, content, featuredImage, userId }) {
        try {
            return await this.databases.createDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    // Service to update post.
    async updatePost(slug, { title, content, featuredImage }) {
        try {
            return await this.databases.updateDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
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

    // Service to get all posts of a user.
    async getUserPosts(userId) {
        try {
            return await this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                [Query.equal('userId', userId)]
            )
        } catch (error) {
            throw error;
        }
    }

    // Service to get all active posts.
    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                [Query.equal('status', 'active')],
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // Service to get count of all user's posts.
    async getUserPostCount(title) {
        try {
            // Get all posts with given title.
            const posts = await this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                [Query.equal('title', title)],
            );

            return posts.total;
        } catch (error) {
            throw error;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;
