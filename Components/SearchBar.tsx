import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

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
            <TextInput
                className="flex-1 p-5"
                placeholder="Search for pizzas, burgers..."
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                placeholderTextColor="#A0A0A0"
                returnKeyType="search"
            />
            <TouchableOpacity
                className="pr-5"
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
                <Image
                    source={images.search}
                    className="size-6"
                    resizeMode="contain"
                    tintColor="#5D5F6D"
                />
            </TouchableOpacity>
        </View>
    );
};

export default Searchbar;