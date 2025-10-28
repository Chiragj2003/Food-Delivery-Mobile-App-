import cn from 'clsx';
import { router } from "expo-router";
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartButton from "@/Components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";

/**
 * Landing tab showcasing promotional offers and linking to cart actions.
 */
export default function Index() {
  const { user } = useAuthStore();
    const firstName = user?.name?.split(" ")[0] ?? "Foodie";

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
          <FlatList
              data={offers}
              renderItem={({ item, index }) => {
                  const isEven = index % 2 === 0;

                  return (
                      <View>
                          <Pressable
                              className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                              style={{ backgroundColor: item.color }}
                              android_ripple={{ color: "#fffff22"}}
                          >
                              {({ pressed }) => (
                                  <Fragment>
                                      <View className="h-full w-1/2">
                                        <Image source={item.image} className="size-full" resizeMode="contain" />
                                      </View>

                                      <View className={cn("offer-card__info", isEven ? 'pl-10': 'pr-10')}>
                                          <Text className="small-bold text-white uppercase opacity-80">
                                              Limited time
                                          </Text>
                                          <Text className="h1-bold text-white leading-tight">
                                              {item.title}
                                          </Text>
                                          <Text className="body-medium text-white/80">
                                              Stack up on sides and save more when you bundle.
                                          </Text>
                                          <Image
                                            source={images.arrowRight}
                                            className="size-10"
                                            resizeMode="contain"
                                            tintColor="#ffffff"
                                          />
                                      </View>
                                  </Fragment>
                              )}
                          </Pressable>
                      </View>
                  )
              }}
              contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
              ListHeaderComponent={() => (
                  <View className="gap-6 pt-6 pb-4">
                      <View className="flex-between flex-row items-center">
                          <View className="gap-1">
                              <Text className="small-bold text-primary uppercase">Hello {firstName}</Text>
                              <Text className="h3-bold text-dark-100">Craving something delicious?</Text>
                              <Text className="body-regular text-gray-400">Discover combos loved by the community.</Text>
                          </View>

                          <CartButton />
                      </View>

                      <View className="hero-card">
                          <Image
                              source={images.burgerTwo}
                              className="hero-card__image"
                              resizeMode="contain"
                          />
                          <Text className="hero-card__pill">Today&apos;s highlight</Text>
                          <Text className="h1-bold text-white mt-3 leading-tight">
                              Summer deals are landing fresh
                          </Text>
                          <Text className="body-medium text-white/80 mt-3">
                              We curated the juiciest picks for warm evenings. Grab them before they&apos;re gone.
                          </Text>
                          <View className="hero-actions">
                              <TouchableOpacity
                                  className="hero-btn--solid"
                                  onPress={() => router.push("/(tabs)/search")}
                              >
                                  <Text className="paragraph-bold text-primary">Browse menu</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                  className="hero-btn--ghost"
                                  onPress={() => router.push("/(tabs)/cart")}
                              >
                                  <Text className="paragraph-bold text-white">View cart</Text>
                              </TouchableOpacity>
                          </View>
                      </View>

                      <View className="section-heading">
                          <Text className="h3-bold text-dark-100">Top offers</Text>
                          <TouchableOpacity
                              className="flex-row items-center gap-2"
                              onPress={() => router.push("/(tabs)/search")}
                          >
                              <Text className="paragraph-medium text-primary">See all</Text>
                              <Image source={images.arrowRight} className="size-4" resizeMode="contain" tintColor="#FE8C00" />
                          </TouchableOpacity>
                      </View>
                  </View>
              )}
          />
      </SafeAreaView>
  );
}