import CustomButton from "@/Components/CustomButton";
import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import type { ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileField = ({
    icon,
    label,
    value,
}: {
    icon: ImageSourcePropType;
    label: string;
    value: string;
}) => (
    <View className="profile-field bg-white rounded-2xl p-4 shadow-sm shadow-black/5">
        <View className="profile-field__icon">
            <Image source={icon} className="size-6" resizeMode="contain" />
        </View>
        <View>
            <Text className="body-regular text-gray-400">{label}</Text>
            <Text className="paragraph-bold text-dark-100">{value}</Text>
        </View>
    </View>
);

const Profile = () => {
    const { user, logout } = useAuthStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const displayName = useMemo(() => user?.name ?? "Guest", [user?.name]);
    const email = user?.email ?? "guest@example.com";

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            router.replace("/sign-in");
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to log out. Please try again.";
            Alert.alert("Logout failed", message);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FB]">
            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-32"
                showsVerticalScrollIndicator={false}
            >
                <View className="px-5 pt-4">
                    <View className="items-center">
                        <View className="profile-avatar shadow-lg shadow-black/10">
                            <Image
                                source={user?.avatar ? { uri: user.avatar } : images.avatar}
                                className="size-full rounded-full"
                                resizeMode="cover"
                            />
                            <TouchableOpacity className="profile-edit">
                                <Image
                                    source={images.pencil}
                                    className="size-3"
                                    resizeMode="contain"
                                    tintColor="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                        <Text className="h3-bold text-dark-100 mt-4">{displayName}</Text>
                        <Text className="body-regular text-gray-400">{email}</Text>
                    </View>

                    <View className="mt-8 gap-3">
                        <ProfileField
                            icon={images.person}
                            label="Full name"
                            value={displayName}
                        />
                        <ProfileField icon={images.envelope} label="Email" value={email} />
                        <ProfileField
                            icon={images.location}
                            label="Delivery address"
                            value="Add your delivery address"
                        />
                        <ProfileField
                            icon={images.phone}
                            label="Phone number"
                            value="Add your phone number"
                        />
                    </View>
                </View>

                <View className="px-5 mt-10 gap-4">
                    <CustomButton
                        title="Manage payment methods"
                        leftIcon={
                            <Image
                                source={images.dollar}
                                className="size-5 mr-3"
                                resizeMode="contain"
                            />
                        }
                        style="bg-white border border-gray-100"
                        textStyle="text-primary"
                        onPress={() =>
                            Alert.alert("Coming soon", "Payment management is on the way ✨")
                        }
                    />

                    <CustomButton
                        title="Order history"
                        leftIcon={
                            <Image
                                source={images.clock}
                                className="size-5 mr-3"
                                resizeMode="contain"
                            />
                        }
                        style="bg-white border border-gray-100"
                        textStyle="text-primary"
                        onPress={() =>
                            Alert.alert(
                                "Coming soon",
                                "We'll show your past orders here shortly!"
                            )
                        }
                    />

                    <CustomButton
                        title="Log out"
                        leftIcon={
                            <Image
                                source={images.logout}
                                className="size-5 mr-3"
                                resizeMode="contain"
                            />
                        }
                        style="bg-red-500"
                        onPress={handleLogout}
                        isLoading={isLoggingOut}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;