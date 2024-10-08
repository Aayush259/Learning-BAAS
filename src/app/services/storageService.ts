import conf from "../conf/conf.js";
import { Client, Storage, ID, Models } from "appwrite";

export class StorageService {
    // New client created.
    client = new Client();
    bucket;

    constructor() {
        this.client
           .setEndpoint(conf.API_ENDPOINT)
           .setProject(conf.PROJECT_ID);
        this.bucket = new Storage(this.client);
    }

    // Service to upload file.
    async uploadFile(file: File): Promise<Models.File> {
        try {
            return await this.bucket.createFile(
                conf.BUCKET_ID,
                ID.unique(),
                file,
            )
        } catch (error) {
            throw error;
        }
    }

    // Service to delete file.
    async deleteFile(fileId: string): Promise<boolean> {
        try {
            await this.bucket.deleteFile(
                conf.BUCKET_ID,
                fileId,
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Service to get file preview.
    getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(
            conf.BUCKET_ID,
            fileId,
        )
    }
};

const storageService = new StorageService();

export default storageService;
