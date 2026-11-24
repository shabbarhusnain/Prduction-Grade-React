
const appwiteEndpoint=String(import.meta.env.VITE_APPWRITE_URL)

const appwriteProjectId=String(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const appwriteDatabaseId=String(import.meta.env.VITE_APPWRITE_DATABASE_ID)

const appwriteCollectionId=String(import.meta.env.VITE_COLLECTION_ID)

const appwriteBucketId=String(import.meta.env.VITE_BUCKET_ID)
export {
    appwiteEndpoint,
    appwriteBucketId,
    appwriteCollectionId,
    appwriteDatabaseId,
    appwriteProjectId
}