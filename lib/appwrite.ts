import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.jsm.foodordering",
    databaseId: '68aea51a002b55eddf26',
    bucketId: '68d106b90009851af244',
    userCollectionId: 'user',
    categoriesCollectionId: 'categories',
    menuCollectionId: 'menu',
    customizationsCollectionId: 'customization',
    menuCustomizationsCollectionId: 'menucustomizations'
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

/**
 * Creates a new Appwrite account and persists the profile in the user collection.
 * Also signs the user in so the session is ready for subsequent API calls.
 */
export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if (!newAccount) {
            throw new Error("Account creation failed.");
        }

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error("Unexpected error while creating user.");
    }
};

/**
 * Establishes an email/password session so the current user can access protected resources.
 */
export const signIn = async ({ email, password }: SignInParams) => {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error("Unexpected error while signing in.");
    }
};

/**
 * Retrieves the current authenticated user document linked to the active session.
 */
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) {
            throw new Error("No active account found.");
        }

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser || currentUser.total === 0) {
            throw new Error("No matching user document found.");
        }

        return currentUser.documents[0];
    } catch (error) {
        console.error("Failed to fetch current user:", error);

        if (error instanceof Error) {
            throw error;
        }

        throw new Error("Unexpected error while fetching current user.");
    }
};

/**
 * Fetches menu items filtered by the optional category or search query parameters.
 */
export const getMenu = async ({ category, query, limit }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if (category) queries.push(Query.equal("categories", category));
        if (query) queries.push(Query.search("name", query));
        if (typeof limit === "number") queries.push(Query.limit(limit));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        );

        return menus.documents;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error("Unexpected error while fetching menu.");
    }
};

/**
 * Returns all food categories available in the Appwrite database.
 */
export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId
        );

        return categories.documents;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error("Unexpected error while fetching categories.");
    }
};