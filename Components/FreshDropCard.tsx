import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
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

    const handleAdd = () => {
        addItem({
            id: item.$id,
            name: item.name,
            price: item.price,
            imageSource: item.image,
            customizations: [],
        });
    };

    return (
        <View
            className="w-44 h-48 mr-4 bg-white rounded-3xl p-4 shadow-md shadow-black/10"
            style={Platform.OS === "android" ? { elevation: 5, shadowColor: "#878787" } : {}}
        >
            <TouchableOpacity
                className="flex-1"
                activeOpacity={0.85}
                onPress={() => onPressDetails?.(item)}
            >
                <Text className="small-bold text-primary uppercase">Fresh drop</Text>
                <Text className="paragraph-bold text-dark-100 mt-2" numberOfLines={2}>
                    {item.name}
                </Text>
                <Text className="body-regular text-gray-200 mt-1" numberOfLines={2}>
                    ${item.price.toFixed(2)}
                </Text>
            </TouchableOpacity>

            <View className="flex-row items-end justify-between">
                <Image source={item.image} className="size-16" resizeMode="contain" />
                <TouchableOpacity
                    className="px-3 py-2 bg-primary rounded-full"
                    onPress={handleAdd}
                    activeOpacity={0.9}
                >
                    <Text className="small-bold text-white">Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FreshDropCard;
