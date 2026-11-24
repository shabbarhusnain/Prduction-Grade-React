import {appwiteEndpoint,appwriteProjectId,appwriteCollectionId,appwriteDatabaseId,appwriteBucketId} from './Config'
import {Storage,Databases,ID,Client, Query} from 'appwrite'
class DatabaseService{
    client = new Client()
    database;
    storage;
    constructor(){
        this.client 
            .setEndpoint(appwiteEndpoint)
            .setProject(appwriteProjectId)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    };
    async newPost({title,content,slug,featuredimage,status,userid}){
        try {
            return await this.database.createDocument(appwriteDatabaseId,appwriteCollectionId,slug,{
                title,content,featuredimage,status,userid})
        } catch (error) {
            throw error
        }
    };
    async updatePost(slug,{title,content,featuredimage}){
        try {
            await this.database.updateDocument(appwriteDatabaseId,appwriteCollectionId,slug,{title,content,featuredimage})
        } catch (error) {
            throw error
        }
    };
    async deletePost(slug){
        try {
            await this.database.deleteDocument(appwriteDatabaseId,appwriteCollectionId,slug)            
        } catch (error) {
            throw error
        }
    };
    async singlePost(id){
        try {
            return this.database.getDocument(appwriteDatabaseId,appwriteCollectionId,id)           
        } catch (error) {
            throw error
         }
        };
    async allpost(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(appwriteDatabaseId,appwriteCollectionId,queries)            
        } catch (error) {
            throw error
        }
    };
    async uploadFile(file){
        try {
            return await this.storage.createFile(appwriteBucketId,ID.unique(),file)
        } catch (error) {
            throw error  
        }
    };   
    async updateFile(fileId,file,){
        try {
            await this.storage.updateFile(appwriteBucketId,fileId,file)
        } catch (error) {
            throw error 
        }
    };
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(appwriteBucketId,fileId)
        } catch (error) {
            throw error 
        }
    };
    ViewFile(fileId){
        try {
            return this.storage.getFileView(appwriteBucketId,fileId)            
        } catch (error) {
            throw error
        }
    }
}
const databaseService = new DatabaseService()
export default databaseService;