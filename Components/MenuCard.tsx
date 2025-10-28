import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

/**
 * Presents a menu item with imagery and a shortcut to add it to the cart.
 */
const MenuCard = ({ item }: { item: MenuItem }) => {
    const { addItem } = useCartStore();
    const { $id, image, name, price, rating, isNew } = item;
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({
            id: $id,
            name,
            price,
            imageSource: image,
            customizations: [],
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 600);
    };

    return (
        <View
            className="menu-card"
            style={
                Platform.OS === "android"
                    ? { elevation: 8, shadowColor: "#878787" }
                    : {}
            }
        >
            <Image source={image} className="size-20 absolute -top-8 right-3" resizeMode="contain" />
            <View className="flex-row items-center justify-between w-full">
                <Text className="text-[10px] font-quicksand-bold text-primary uppercase">
                    {isNew ? "New" : "Popular"}
                </Text>
                {rating ? (
                    <View className="flex-row items-center gap-1 bg-primary/10 px-1.5 py-0.5 rounded-full">
                        <Image
                            source={images.star}
                            className="size-2.5"
                            resizeMode="contain"
                            tintColor="#FE8C00"
                        />
                        <Text className="text-[10px] font-quicksand-bold text-primary">{rating.toFixed(1)}</Text>
                    </View>
                ) : null}
            </View>
            <Text className="text-sm font-quicksand-bold text-dark-100 mt-1" numberOfLines={1}>{name}</Text>
            <Text className="text-xs font-quicksand text-gray-200 mt-1">Starts at</Text>
            <View className="flex-row items-center justify-between w-full mt-2">
                <Text className="text-lg font-quicksand-bold text-dark-100">${price.toFixed(2)}</Text>
                <TouchableOpacity
                    className={`flex-row items-center gap-1 px-2.5 py-1.5 rounded-full ${isAdded ? 'bg-primary' : 'bg-primary/10'}`}
                    onPress={handleAddToCart}
                    activeOpacity={0.9}
                >
                    <Text className={`text-xs font-quicksand-bold ${isAdded ? 'text-white' : 'text-primary'}`}>
                        {isAdded ? 'Added!' : 'Add'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default MenuCard