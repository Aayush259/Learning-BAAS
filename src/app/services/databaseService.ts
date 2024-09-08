import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";
import { CreatePostType, CreateUpdateGetPostResponseType, ListPostsResponseType, UpdatePostType } from "../interfaces/interfaces";

class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.API_ENDPOINT)
            .setProject(conf.PROJECT_ID);

        this.databases = new Databases(this.client);
    }

    // Service to create new post.
    async createPost({
        title,
        slug,
        content,
        featuredImage,
        userId
    }: CreatePostType
    ): Promise<CreateUpdateGetPostResponseType> {
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
    async updatePost(
        slug: string,
        {
            title, content, featuredImage
        }: UpdatePostType
    ): Promise<CreateUpdateGetPostResponseType> {
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
            throw error;
        }
    }

    // Service to delete post.
    async deletePost(slug: string): Promise<boolean> {
        try {
            await this.databases.deleteDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Service to get post.
    async getPost(slug: string): Promise<CreateUpdateGetPostResponseType> {
        try {
            return await this.databases.getDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
            )
        } catch (error) {
            throw error;
        }
    }

    // Service to get all posts of a user.
    async getUserPosts(userId: string): Promise<ListPostsResponseType> {
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
    async getPosts(): Promise<ListPostsResponseType> {
        try {
            return await this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
            )
        } catch (error) {
            throw error;
        }
    }

    // Service to get count of all user's posts.
    async getUserPostCount(title: string): Promise<number> {
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
};

const databaseService = new DatabaseService();

export default databaseService;
