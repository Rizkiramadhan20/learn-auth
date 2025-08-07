import React, { useEffect } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useRouter } from 'expo-router';

import { useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

import verification from '@/assets/images/verified.json';

import LottieView from 'lottie-react-native';

export default function VerificationSuccess() {
    const router = useRouter();
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.15, { duration: 700 }),
                withTiming(1, { duration: 700 })
            ),
            -1,
            true
        );
    }, [scale]);

    return (
        <LinearGradient
            colors={["#181A20", "#23252B", "#FF6B35"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1.5 }}
            className="flex-1"
        >
            <View className="flex-1 justify-center items-center px-6">
                <View className="mb-8 mt-8">
                    <LottieView source={verification} style={{ width: 100, height: 100 }} autoPlay loop />
                </View>
                <Text className="text-2xl font-bold text-white mb-2 text-center">Verification Success</Text>
                <Text className="text-gray-300 text-base mb-8 text-center">From now on, you are part of us!</Text>
                <TouchableOpacity
                    onPress={() => router.replace("/auth/signin")}
                    className="bg-[#FF6B35] rounded-2xl py-4 w-full items-center mb-4 mt-0.5"
                >
                    <Text className="text-white font-bold text-lg">Login Now</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
} 