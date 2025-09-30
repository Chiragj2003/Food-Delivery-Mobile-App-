import { ID, Query } from "react-native-appwrite";

import { appwriteConfig, databases } from "./appwrite";
import seedData from "./data";

type SeedCategory = (typeof seedData.categories)[number];
type SeedCustomization = (typeof seedData.customizations)[number];
type SeedMenuItem = (typeof seedData.menu)[number];

const databaseId = appwriteConfig.databaseId;

/**
 * Upserts a document by unique field and returns the resulting document id.
 * Ensures repeat seeding runs are idempotent and do not duplicate records.
 */
const ensureDocument = async <T extends Record<string, unknown>>(
    collectionId: string,
    uniqueField: keyof T,
    payload: T
): Promise<string> => {
    const uniqueValue = payload[uniqueField];

    if (uniqueValue === undefined || uniqueValue === null) {
        throw new Error(
            `Missing unique field "${String(uniqueField)}" in payload: ${JSON.stringify(payload)}`
        );
    }

    const existing = await databases.listDocuments(
        databaseId,
        collectionId,
        [Query.equal(String(uniqueField), uniqueValue as string | number)]
    );

        if (existing.total > 0) {
            const document = existing.documents[0];
            await databases.updateDocument(databaseId, collectionId, document.$id, payload);
            return document.$id;
    }

    const document = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        payload
    );

        return document.$id;
};

/**
 * Seeds the category collection and returns a name to document id lookup map.
 */
const seedCategories = async () => {
    const categoriesByName = new Map<string, string>();

    for (const category of seedData.categories) {
        const categoryId = await ensureDocument<SeedCategory>(
            appwriteConfig.categoriesCollectionId,
            "name",
            category
        );

        categoriesByName.set(category.name, categoryId);
        console.log(`[seed] category ready: ${category.name}`);
    }

    return categoriesByName;
};

/**
 * Seeds customization options while keeping the operation idempotent.
 */
const seedCustomizations = async () => {
    for (const customization of seedData.customizations) {
        await ensureDocument<SeedCustomization>(
            appwriteConfig.customizationsCollectionId,
            "name",
            customization
        );
        console.log(`[seed] customization ready: ${customization.name}`);
    }
};

/**
 * Seeds menu entries while linking them to the seeded category records.
 */
const seedMenu = async (categoriesByName: Map<string, string>) => {
    for (const menuItem of seedData.menu) {
        const categoryId = categoriesByName.get(menuItem.category_name);

        if (!categoryId) {
            console.warn(
                `[seed] skipped menu item "${menuItem.name}" – missing category: ${menuItem.category_name}`
            );
            continue;
        }

        const payload = {
            name: menuItem.name,
            description: menuItem.description,
            image_url: menuItem.image_url,
            price: menuItem.price,
            rating: menuItem.rating,
            calories: menuItem.calories,
            protein: menuItem.protein,
            categories: categoryId,
            customizations: menuItem.customizations,
        } satisfies Omit<SeedMenuItem, "category_name"> & { categories: string };

        await ensureDocument<typeof payload>(appwriteConfig.menuCollectionId, "name", payload);
        console.log(`[seed] menu ready: ${menuItem.name}`);
    }
};

/**
 * Exposes the raw seed payload so callers can inspect the generated data set.
 */
export const getSeedData = () => seedData;

/**
 * Executes the full seeding pipeline for categories, customizations, and menu items.
 */
const seed = async (): Promise<void> => {
    try {
        console.log("[seed] started");

        const categoriesByName = await seedCategories();
        await seedCustomizations();
        await seedMenu(categoriesByName);

        console.log("[seed] completed successfully");
    } catch (error) {
        console.error("[seed] failed", error);
        throw error;
    }
};

export default seed;
