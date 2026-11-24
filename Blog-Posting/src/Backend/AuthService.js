import {appwiteEndpoint,appwriteProjectId} from './Config.js'
import {Client,Account,ID} from 'appwrite'
class AuthService{
    client=new Client()
    account
    constructor(){
        this.client
            .setEndpoint(appwiteEndpoint)
            .setProject(appwriteProjectId)
     this.account= new Account(this.client)
    }
    async Signup({email,password, name}){
        try {
            const user= await this.account.create(ID.unique(),email,password,name)
            if (user){
                return await this.Signin({email,password})
            }
        } catch (error) {
            throw error;
        }
    };
    async Signin({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
            
        }
    };
    async Signout(){
        try {
            await this.account.deleteSession('current')
        } catch (error) {
            throw error
        }
    };
    async currentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }
}
const authService =new AuthService()
export default authService;