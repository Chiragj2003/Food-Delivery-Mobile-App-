import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

/**
 * Presents a menu item with imagery and a shortcut to add it to the cart.
 */
const MenuCard = ({ item }: { item: MenuItem }) => {
    const { addItem } = useCartStore();
    const { $id, image, name, price, rating, isNew } = item;

    return (
        <View
            className="menu-card"
            style={
                Platform.OS === "android"
                    ? { elevation: 8, shadowColor: "#878787" }
                    : {}
            }
        >
            <Image source={image} className="size-32 absolute -top-10 right-5" resizeMode="contain" />
            <View className="flex-row items-center justify-between w-full">
                <Text className="small-bold text-primary uppercase">
                    {isNew ? "New" : "Popular"}
                </Text>
                {rating ? (
                    <View className="flex-row items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                        <Image
                            source={images.star}
                            className="size-3"
                            resizeMode="contain"
                            tintColor="#FE8C00"
                        />
                        <Text className="small-bold text-primary">{rating.toFixed(1)}</Text>
                    </View>
                ) : null}
            </View>
            <Text className="base-bold text-dark-100 mt-1" numberOfLines={1}>{name}</Text>
            <Text className="body-regular text-gray-200 mt-2">Starts at</Text>
            <View className="flex-row items-center justify-between w-full mt-4">
                <Text className="h3-bold text-dark-100">${price.toFixed(2)}</Text>
                <TouchableOpacity
                    className="flex-row items-center gap-1 bg-primary/10 px-3 py-2 rounded-full"
                    onPress={() =>
                        addItem({
                            id: $id,
                            name,
                            price,
                            imageSource: image,
                            customizations: [],
                        })
                    }
                    activeOpacity={0.9}
                >
                    <Text className="paragraph-bold text-primary">Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default MenuCard