import CustomButton from "@/Components/CustomButton";
import Custominput from "@/Components/Custominput";
import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActionSheetIOS,
    Alert,
    Image,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    const { user, logout, setUser } = useAuthStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    // Editable fields
    const [displayName, setDisplayName] = useState(user?.name ?? "");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [avatarUri, setAvatarUri] = useState(user?.avatar ?? "");

    const email = user?.email ?? "guest@example.com";

    useEffect(() => {
        setDisplayName(user?.name ?? "");
        setAvatarUri(user?.avatar ?? "");
    }, [user]);

    const pickImageFromLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need camera roll permissions to change your profile picture.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setAvatarUri(result.assets[0].uri);
            setIsEditing(true);
        }
    };

    const pickImageFromCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need camera permissions to take a photo.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setAvatarUri(result.assets[0].uri);
            setIsEditing(true);
        }
    };

    const handleEditAvatar = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Take Photo', 'Choose from Library'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        pickImageFromCamera();
                    } else if (buttonIndex === 2) {
                        pickImageFromLibrary();
                    }
                }
            );
        } else {
            Alert.alert(
                'Change Profile Picture',
                'Choose an option',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Take Photo', onPress: pickImageFromCamera },
                    { text: 'Choose from Library', onPress: pickImageFromLibrary },
                ]
            );
        }
    };

    const handleSaveChanges = () => {
        if (!displayName.trim()) {
            Alert.alert('Error', 'Name cannot be empty');
            return;
        }
        
        // Update user profile with new data
        if (user) {
            setUser({
                ...user,
                name: displayName,
                avatar: avatarUri,
            });
        }
        
        Alert.alert('Success', 'Your profile has been updated!');
        setIsEditing(false);
    };

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
        <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="px-5 pt-4">
                    <View className="items-center">
                        <View className="profile-avatar shadow-lg shadow-black/10">
                            <Image
                                source={avatarUri ? { uri: avatarUri } : images.avatar}
                                className="size-full rounded-full"
                                resizeMode="cover"
                            />
                            <TouchableOpacity 
                                className="profile-edit"
                                onPress={handleEditAvatar}
                            >
                                <Image
                                    source={images.pencil}
                                    className="size-3"
                                    resizeMode="contain"
                                    tintColor="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                        <Text className="h3-bold text-dark-100 mt-4">{displayName || 'Guest'}</Text>
                        <Text className="body-regular text-gray-400">{email}</Text>
                    </View>

                    <View className="mt-8 gap-3">
                        <Custominput
                            label="Full Name"
                            value={displayName}
                            onChangeText={(text) => {
                                setDisplayName(text);
                                setIsEditing(true);
                            }}
                            placeholder="Enter your name"
                        />
                        
                        <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5">
                            <View className="flex-row items-center gap-3 mb-2">
                                <Image source={images.envelope} className="size-6" resizeMode="contain" />
                                <Text className="body-regular text-gray-400">Email</Text>
                            </View>
                            <Text className="paragraph-bold text-dark-100 ml-9">{email}</Text>
                        </View>

                        <Custominput
                            label="Phone Number"
                            value={phoneNumber}
                            onChangeText={(text) => {
                                setPhoneNumber(text);
                                setIsEditing(true);
                            }}
                            placeholder="Enter your phone number"
                            keyboardType="phone-pad"
                        />

                        <Custominput
                            label="Delivery Address"
                            value={address}
                            onChangeText={(text) => {
                                setAddress(text);
                                setIsEditing(true);
                            }}
                            placeholder="Enter your delivery address"
                        />
                    </View>
                </View>

                <View className="px-5 mt-8 gap-4">
                    {isEditing && (
                        <CustomButton
                            title="Save Changes"
                            leftIcon={
                                <Image
                                    source={images.check}
                                    className="size-5 mr-3"
                                    resizeMode="contain"
                                />
                            }
                            style="bg-green-500"
                            onPress={handleSaveChanges}
                        />
                    )}

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