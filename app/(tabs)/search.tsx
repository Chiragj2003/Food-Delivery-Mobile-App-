import CartButton from "@/Components/CartButton";
import Filter from "@/Components/filter";
import FreshDropCard from "@/Components/FreshDropCard";
import MenuCard from "@/Components/MenuCard";
import SearchBar from "@/Components/SearchBar";
import { images } from "@/constants";
import { getCategories, getFeaturedMenu, getMenu, seed } from "@/lib/localDB";
import useLocalData from "@/lib/useLocalData";
import { MenuItem } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  // Simple params object - hook will auto-refetch when it changes
  const searchParams = useMemo(
    () => ({ category: categoryParam, query: queryParam }),
    [categoryParam, queryParam]
  );

  const { data, loading, refetch } = useLocalData({
    fn: getMenu,
    params: searchParams,
  });

  const { data: categories } = useLocalData({ fn: getCategories });
  const { data: freshDrops } = useLocalData({ fn: getFeaturedMenu, params: 6 });

  const [seeding, setSeeding] = useState(false);

  /**
   * Seeds the local database with demo data when the Seed button is pressed.
   */
  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seed();
      refetch(); // Refresh the data after seeding
      console.log("Seeding completed!");
    } catch (error) {
      console.error("Failed to seed:", error);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#F8F9FB] flex-1" edges={['top']}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;

          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-6" : "mt-0"
              )}
            >
              <MenuCard item={item as unknown as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={() => (
          <View className="px-5 pt-6 pb-4 gap-6">
            <View className="flex-between flex-row items-start">
              <View className="gap-1">
                <Text className="small-bold uppercase text-primary">Search</Text>
                <Text className="h3-bold text-dark-100">Find your next craving</Text>
                <Text className="body-regular text-gray-400">
                  Explore categories or jump straight to favorites.
                </Text>
              </View>

              <CartButton />
            </View>

            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                className="flex-row items-center gap-2 bg-primary/10 px-4 py-2 rounded-full"
                onPress={handleSeed}
                disabled={seeding}
                activeOpacity={0.85}
              >
                {seeding ? (
                  <ActivityIndicator size="small" color="#FE8C00" />
                ) : (
                  <Image
                    source={images.bag}
                    className="size-4"
                    resizeMode="contain"
                    tintColor="#FE8C00"
                  />
                )}
                <Text className="paragraph-medium text-primary">
                  {seeding ? 'Refreshing...' : 'Seed demo items'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center gap-2 px-3 py-2 rounded-full border border-gray-100"
                onPress={() => {
                  router.setParams({ category: undefined, query: undefined });
                  refetch();
                }}
                activeOpacity={0.85}
              >
                <Image
                  source={images.arrowDown}
                  className="size-3 rotate-180"
                  resizeMode="contain"
                  tintColor="#5D5F6D"
                />
                <Text className="body-medium text-gray-200">Clear filters</Text>
              </TouchableOpacity>
            </View>

            <SearchBar />

            {freshDrops && freshDrops.length > 0 && (
              <View className="gap-3">
                <View className="section-heading">
                  <Text className="h3-bold text-dark-100">Fresh drops</Text>
                  <View className="flex-row items-center gap-1">
                    <Image
                      source={images.star}
                      className="size-3"
                      resizeMode="contain"
                      tintColor="#FE8C00"
                    />
                    <Text className="body-medium text-gray-200">Newest arrivals</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                  {freshDrops.map((item: MenuItem) => (
                    <FreshDropCard key={item.$id} item={item} />
                  ))}
                </ScrollView>
              </View>
            )}

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

            <View className="section-heading mt-4">
              <Text className="h3-bold text-dark-100">All items</Text>
              <Text className="body-medium text-gray-200">{data?.length || 0} found</Text>
            </View>
          </View>
        )}
        ListHeaderComponentStyle={{ paddingHorizontal: 0 }}
        columnWrapperStyle={{ paddingHorizontal: 20, gap: 16 }}
        ListEmptyComponent={() =>
          !loading && (
            <View className="items-center justify-center py-10">
              <Image
                source={images.emptyState}
                className="size-32 mb-4"
                resizeMode="contain"
              />
              <Text className="paragraph-bold text-dark-100 mb-2">No results found</Text>
              <Text className="body-regular text-gray-400 text-center">
                Try adjusting your search or filters
              </Text>
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Search;
