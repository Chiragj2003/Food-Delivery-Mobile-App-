import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

interface FreshDropCardProps {
    item: MenuItem;
    onPressDetails?: (item: MenuItem) => void;
}

/**
 * Compact card used in horizontal lists to spotlight newly added menu items.
 */
const FreshDropCard = ({ item, onPressDetails }: FreshDropCardProps) => {
    const { addItem } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addItem({
            id: item.$id,
            name: item.name,
            price: item.price,
            imageSource: item.image,
            customizations: [],
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 600);
    };

    return (
        <View
            className="w-36 h-40 mr-3 bg-white rounded-2xl p-3 shadow-md shadow-black/10"
            style={Platform.OS === "android" ? { elevation: 5, shadowColor: "#878787" } : {}}
        >
            <TouchableOpacity
                className="flex-1"
                activeOpacity={0.85}
                onPress={() => onPressDetails?.(item)}
            >
                <Text className="text-[10px] font-quicksand-bold text-primary uppercase">Fresh drop</Text>
                <Text className="text-sm font-quicksand-bold text-dark-100 mt-1" numberOfLines={2}>
                    {item.name}
                </Text>
                <Text className="text-xs font-quicksand text-gray-200 mt-0.5" numberOfLines={1}>
                    ${item.price.toFixed(2)}
                </Text>
            </TouchableOpacity>

            <View className="flex-row items-end justify-between">
                <Image source={item.image} className="size-12" resizeMode="contain" />
                <TouchableOpacity
                    className={`px-2.5 py-1.5 rounded-full ${isAdded ? 'bg-green-500' : 'bg-primary'}`}
                    onPress={handleAdd}
                    activeOpacity={0.9}
                >
                    <Text className="text-xs font-quicksand-bold text-white">{isAdded ? '✓' : 'Add'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FreshDropCard;
