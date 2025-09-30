import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from 'react-native';

const Filter = ({ categories }: { categories: Category[] }) => {
    const searchParams = useLocalSearchParams<{ category?: string | string[] }>();
    const rawCategory = Array.isArray(searchParams.category)
        ? searchParams.category[0]
        : searchParams.category ?? 'all';
    const categoryParam = rawCategory && rawCategory !== 'undefined' ? rawCategory : 'all';

    const [active, setActive] = useState(categoryParam);

    useEffect(() => {
        setActive(categoryParam);
    }, [categoryParam]);

    const handlePress = (id: string) => {
        setActive(id);

        if(id === 'all' && categoryParam !== 'all') {
            router.setParams({ category: undefined });
        }

        if(id !== 'all' && id !== categoryParam) {
            router.setParams({ category: id });
        }
    };

    const filterData: (Category | { $id: string; name: string })[] = categories
        ? [{ $id: 'all', name: 'All' }, ...categories]
        : [{ $id: 'all', name: 'All' }]

    return (
        <FlatList
            data={filterData}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-x-2 pb-3"
            renderItem={({ item }) => (
                <TouchableOpacity
                    key={item.$id}
                    className={cn('filter', active === item.$id ? 'bg-amber-500' : 'bg-white')}
                    style={Platform.OS === 'android' ? { elevation: 5, shadowColor: '#878787'} : {}}
                    onPress={() => handlePress(item.$id)}
                >
                    <Text className={cn('body-medium', active === item.$id ? 'text-white' : 'text-gray-200')}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    )
}
export default Filter