import CartButton from "@/Components/CartButton";
import MenuCard from "@/Components/MenuCard";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Filter from "@/Components/filter";
import SearchBar from "@/Components/SearchBar";

// ✅ Default import for seed
import seed from "@/lib/seed";

/**
 * Tab screen that lets users search and filter menu items, seed data, and browse results.
 */
const Search = () => {
  const params = useLocalSearchParams<{
    query?: string | string[];
    category?: string | string[];
  }>();

  const rawCategory = Array.isArray(params.category)
    ? params.category[0]
    : params.category ?? "";
  const categoryParam =
    rawCategory && rawCategory !== "undefined" && rawCategory !== "all"
      ? rawCategory
      : "";

  const rawQuery = Array.isArray(params.query)
    ? params.query[0]
    : params.query ?? "";
  const queryParam =
    rawQuery && rawQuery !== "undefined"
      ? rawQuery
      : "";

  // Memoize search params to prevent unnecessary re-fetches
  const searchParams = useMemo(
    () => ({ category: categoryParam, query: queryParam, limit: 6 }),
    [categoryParam, queryParam]
  );

  const { data, loading, refetch } = useAppwrite({
    fn: getMenu,
    params: searchParams,
  });

  const { data: categories } = useAppwrite({ fn: getCategories });

  const [seeding, setSeeding] = useState(false);

  // Refetch when search params change
  useEffect(() => {
    refetch(searchParams);
  }, [searchParams]);

  /**
   * Seeds the Appwrite database with demo data when the Seed button is pressed.
   */
  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seed();
      console.log("Seeding completed!");
    } catch (error) {
      console.error("Failed to seed:", error);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      {/* Header Section */}
      <View className="px-5 py-3 flex-row justify-between items-center">
        <Text className="text-xl font-bold">Search</Text>
        {seeding ? (
          <ActivityIndicator size="small" color="#667EEA" />
        ) : (
          <Button title="Seed" onPress={handleSeed} />
        )}
      </View>

      {/* FlatList */}
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;

          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as unknown as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">Search</Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>

              <CartButton />
            </View>

            <SearchBar />

            <Filter
              categories={
                categories
                  ? categories.map((cat: any) => ({
                      ...cat,
                      name: cat.name ?? "",
                      description: cat.description ?? "",
                    }))
                  : []
              }
            />
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && <Text className="text-center mt-5">No results</Text>
        }
      />
    </SafeAreaView>
  );
};

export default Search;
