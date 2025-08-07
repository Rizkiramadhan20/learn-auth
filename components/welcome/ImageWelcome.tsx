import { LinearGradient } from 'expo-linear-gradient'

import React from 'react'

import { Image, View } from 'react-native'

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated'

import Welcome1 from "@/assets/images/welcome1.jpg"
import Welcome2 from "@/assets/images/welcome2.jpg"
import Welcome3 from "@/assets/images/welcome3.jpg"
import Welcome4 from "@/assets/images/welcome4.jpg"
import Welcome5 from "@/assets/images/welcome5.jpg"
import Welcome6 from "@/assets/images/welcome6.jpg"

export default function ImageWelcome() {
    const fadeAnim = useSharedValue(0)
    const scaleAnim = useSharedValue(0.8)
    const slideAnim = useSharedValue(50)

    // Entrance animations
    React.useEffect(() => {
        fadeAnim.value = withTiming(1, { duration: 1000 })
        scaleAnim.value = withSpring(1, { damping: 15, stiffness: 100 })
        slideAnim.value = withSpring(0, { damping: 15, stiffness: 100 })
    }, [fadeAnim, scaleAnim, slideAnim])

    const fadeStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeAnim.value,
        }
    })

    const scaleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleAnim.value }],
        }
    })

    const slideStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: slideAnim.value }],
        }
    })

    const floatingStyle = useAnimatedStyle(() => {
        const floating = withRepeat(
            withSequence(
                withTiming(10, { duration: 3000 }),
                withTiming(-10, { duration: 3000 })
            ),
            -1,
            true
        )
        return {
            transform: [{ translateY: floating }],
        }
    })

    return (
        <View className="flex-1 bg-[#0A0A0F]">
            {/* Animated Background Elements */}
            <Animated.View
                className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-full blur-3xl"
                style={floatingStyle}
            />
            <Animated.View
                className="absolute top-40 right-10 w-24 h-24 bg-gradient-to-br from-accent-secondary/15 to-accent-primary/15 rounded-full blur-2xl"
                style={floatingStyle}
            />

            {/* Hero Section with Enhanced Gradient */}
            <LinearGradient
                colors={[
                    'rgba(255, 107, 53, 0.15)',
                    'rgba(255, 146, 40, 0.08)',
                    'rgba(138, 43, 226, 0.05)',
                    'transparent'
                ]}
                className="absolute top-0 left-0 right-0 h-[500px]"
            />

            <Animated.View className="px-6 pt-10" style={[fadeStyle, slideStyle]}>
                <View className="space-y-4">
                    <View className="flex-row gap-2">
                        <Animated.View className="flex-1" style={scaleStyle}>
                            <View className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-3xl overflow-hidden h-40 border border-accent-primary/50 shadow-2xl mt-2">
                                <Image source={Welcome1} className="w-full h-full" resizeMode="cover" />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    className="absolute bottom-0 left-0 right-0 h-20"
                                />
                                <View className="absolute top-3 right-3 w-3 h-3 bg-accent-primary rounded-full shadow-lg" />
                            </View>
                        </Animated.View>
                        <Animated.View className="flex-1" style={scaleStyle}>
                            <View className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-3xl overflow-hidden h-40 border border-accent-primary/50 shadow-2xl -mt-1">
                                <Image source={Welcome2} className="w-full h-full" resizeMode="cover" />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    className="absolute bottom-0 left-0 right-0 h-20"
                                />
                                <View className="absolute top-3 right-3 w-3 h-3 bg-accent-secondary rounded-full shadow-lg" />
                            </View>
                        </Animated.View>
                        <Animated.View className="flex-1" style={scaleStyle}>
                            <View className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-3xl overflow-hidden h-40 border border-accent-primary/50 shadow-2xl mt-2">
                                <Image source={Welcome3} className="w-full h-full" resizeMode="cover" />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    className="absolute bottom-0 left-0 right-0 h-20"
                                />
                                <View className="absolute top-3 right-3 w-3 h-3 bg-accent-secondary rounded-full shadow-lg" />
                            </View>
                        </Animated.View>
                    </View>

                    {/* Bottom Row */}
                    <View className="flex-row gap-2 mt-2">
                        <Animated.View className="flex-1" style={scaleStyle}>
                            <View className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-3xl overflow-hidden h-40 border border-accent-primary/50 shadow-2xl">
                                <Image source={Welcome4} className="w-full h-full" resizeMode="cover" />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    className="absolute bottom-0 left-0 right-0 h-20"
                                />
                                <View className="absolute top-3 right-3 w-3 h-3 bg-accent-primary rounded-full shadow-lg" />
                            </View>
                        </Animated.View>
                        <Animated.View className="flex-1" style={scaleStyle}>
                            <View className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-3xl overflow-hidden h-48 border border-accent-primary/50 shadow-2xl">
                                <Image source={Welcome5} className="w-full h-full" resizeMode="cover" />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    className="absolute bottom-0 left-0 right-0 h-20"
                                />
                                <View className="absolute top-3 right-3 w-3 h-3 bg-accent-secondary rounded-full shadow-lg" />
                            </View>
                        </Animated.View>
                        <Animated.View className="flex-1" style={scaleStyle}>
                            <View className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-3xl overflow-hidden h-40 border border-accent-primary/50  shadow-2xl">
                                <Image source={Welcome6} className="w-full h-full" resizeMode="cover" />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    className="absolute bottom-0 left-0 right-0 h-20"
                                />
                                <View className="absolute top-3 right-3 w-3 h-3 bg-accent-secondary rounded-full shadow-lg" />
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}