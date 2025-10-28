import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

/**
 * Renders the icon and label for each bottom tab entry.
 */
const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
    <View className="tab-icon">
        <Image source={icon} className="size-7" resizeMode="contain" tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
        <Text className={cn('text-sm font-bold', focused ? 'text-primary':'text-gray-200')}>
            {title}
        </Text>
    </View>
)

/**
 * Wraps the tab navigator and guards access behind authentication.
 */
export default function TabLayout() {
    const { isAuthenticated } = useAuthStore();

    if(!isAuthenticated) return <Redirect href="/sign-in" />

    return (
        <Tabs screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    marginHorizontal: 10,
                    paddingTop: 10,
                    height: 70,
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 10,
                    borderTopWidth: 0,
                }
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Home" icon={images.home} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: 'Search',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Search" icon={images.search} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Cart" icon={images.bag} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Profile" icon={images.person} focused={focused} />
                }}
            />
        </Tabs>
    );
}