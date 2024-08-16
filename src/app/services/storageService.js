import conf from '../conf/conf.js';
import { Client, Storage, ID } from 'appwrite';

export class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.API_ENDPOINT)
            .setProject(conf.PROJECT_ID);

        this.storage = new Storage(this.client);
    }

    // Method to upload file.
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }

    // Method to delete file.
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.BUCKET_ID,
                fileId
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Method to get file preview.
    async getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                conf.BUCKET_ID,
                fileId
            )
        } catch (error) {
            throw error;
        }
    }
}

const storageService = new StorageService();

export default storageService;
