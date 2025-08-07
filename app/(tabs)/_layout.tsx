import { Tabs } from 'expo-router';

import React from 'react';

import { Platform } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size ?? 28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size ?? 28} color={color} />,
                }}
            />
        </Tabs>
    );
}