import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    Animated,
    Pressable,
} from "react-native";
import { Link, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useAuth } from "@/context/AuthContext";
import { H2, Small } from "./ui/Typography";

export default function Sidebar({ sidebarVisible, width }) {
    const { signOut } = useAuth();
    const sidebarAnimatedWidth = useRef(
        new Animated.Value(sidebarVisible ? width : 0)
    ).current;

    const { colorScheme } = useColorScheme();
    const pathname = usePathname();

    // Animate width on prop change
    useEffect(() => {
        Animated.spring(sidebarAnimatedWidth, {
            toValue: sidebarVisible ? width : 0,
            friction: 8,
            tension: 40,
            useNativeDriver: false,
        }).start();
    }, [sidebarVisible, width]);

    const NavLink = ({ href, iconName, label }) => {
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

        return (
            <Link href={href} asChild>
                <Pressable
                    className={`flex-row items-center py-3 px-4 rounded-xl mb-1 ${isActive
                        ? 'bg-brand-500 shadow-sm shadow-brand-500/20'
                        : 'active:bg-neutral-100 dark:active:bg-neutral-800'
                        }`}
                >
                    <Ionicons
                        name={iconName as any}
                        size={20}
                        color={isActive ? 'white' : (colorScheme === 'dark' ? '#a1a1aa' : '#52525b')}
                    />
                    <Text
                        className={`ml-3 text-base font-medium ${isActive
                            ? 'text-white'
                            : 'text-neutral-600 dark:text-neutral-400'
                            }`}
                    >
                        {label}
                    </Text>
                </Pressable>
            </Link>
        );
    };

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error: any) {
            console.error('Sign out error:', error.message);
        }
    };

    return (
        <Animated.View
            style={{
                width: sidebarAnimatedWidth,
                overflow: "hidden",
                height: "100%",
            }}
        >
            <View
                className="bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 rounded-r-3xl shadow-2xl shadow-black/20"
                style={{ width, height: "100%" }}
            >
                <View className="flex-1 p-6">
                    <View className="mb-8 flex-row items-center">
                        <View className="w-10 h-10 bg-brand-500 rounded-xl items-center justify-center mr-3 shadow-sm shadow-brand-500/20">
                            <View className="w-5 h-5 border-2 border-white rounded-full" />
                        </View>
                        <View>
                            <H2 className="text-xl leading-8">Trena</H2>
                            <Small className="text-[10px] uppercase tracking-wider text-neutral-400">Train smart</Small>
                        </View>
                    </View>

                    <ScrollView className="flex-1 -mx-2 px-2">
                        <NavLink href="/dashboard" iconName="navigate-outline" label="Plans" />
                        <NavLink href="/logs" iconName="add-circle-outline" label="Log Workout" />
                        <NavLink href="/history" iconName="time-outline" label="History" />
                        <NavLink href="/exercises" iconName="barbell-outline" label="Exercises" />
                        <NavLink href="/bodyweight" iconName="scale-outline" label="Bodyweight" />
                    </ScrollView>

                    <View className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
                        <Pressable
                            onPress={handleSignOut}
                            className="flex-row items-center py-3 px-4 rounded-xl active:bg-red-50 dark:active:bg-red-900/10"
                        >
                            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                            <Text className="ml-3 text-base font-medium text-red-500">Sign Out</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Animated.View >
    );
}
