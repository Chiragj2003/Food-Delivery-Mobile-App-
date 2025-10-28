import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

/**
 * Search input that keeps local state in sync with router query parameters.
 */
const Searchbar = () => {
    const params = useLocalSearchParams<{ query?: string | string[] }>();
    const rawQuery = Array.isArray(params.query) ? params.query[0] : params.query ?? "";
    const queryParam = rawQuery && rawQuery !== "undefined" ? rawQuery : "";
    const [query, setQuery] = useState(queryParam);

    useEffect(() => {
        setQuery(queryParam);
    }, [queryParam]);

    /**
     * Updates the input field and clears the query param when the value becomes empty.
     */
    const handleSearch = (text: string) => {
        setQuery(text);

        if(!text && queryParam) {
            router.setParams({ query: undefined });
        }
    };

    /**
     * Commits the trimmed search term to the route when it differs from the current value.
     */
    const handleSubmit = () => {
        const trimmed = query.trim();
        if(trimmed && trimmed !== queryParam) {
            router.setParams({ query: trimmed });
        }
    }

    return (
        <View className="searchbar">
            <View className="size-11 rounded-full bg-primary/10 items-center justify-center ml-2">
                <Image
                    source={images.search}
                    className="size-5"
                    resizeMode="contain"
                    tintColor="#FE8C00"
                />
            </View>
            <TextInput
                className="flex-1 py-4 px-3"
                placeholder="Search for pizzas, burgers..."
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                placeholderTextColor="#A0A0A0"
                returnKeyType="search"
            />
            <TouchableOpacity
                className="flex-row items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mr-2"
                onPress={() => {
                    const trimmed = query.trim();
                    if(!trimmed && queryParam) {
                        router.setParams({ query: undefined });
                    }
                    if(trimmed && trimmed !== queryParam) {
                        router.setParams({ query: trimmed });
                    }
                }}
            >
                <Text className="paragraph-medium text-primary">Search</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Searchbar;