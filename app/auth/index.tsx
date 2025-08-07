
import React from 'react'

import { ScrollView, Text, View } from 'react-native'

import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'

import Animated from 'react-native-reanimated'

import { LinearGradient } from 'expo-linear-gradient'

import ImageWelcome from '@/components/welcome/ImageWelcome'

import { useWelcomeState } from '@/components/welcome/lib/WelcomeState'

import { useRouter } from 'expo-router'

export default function WelcomeScreen() {
    const router = useRouter();
    const handleSliderComplete = () => {
        setTimeout(() => {
            router.navigate('/auth/signin');
        }, 100);
    };
    const {
        pan,
        sliderHandleStyle,
        progressStyle,
        fadeStyle,
        scaleStyle,
        slideStyle,
        SLIDER_WIDTH,
    } = useWelcomeState(handleSliderComplete)

    return (
        <View className="flex-1 bg-[#0A0A0F]">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <ImageWelcome />

                {/* Modern Welcome Content */}
                <Animated.View className="px-8 pt-5 pb-5" style={[fadeStyle, slideStyle]}>
                    <View className="space-y-10">
                        {/* Enhanced Main Title */}
                        <View className="space-y-6">
                            <Text className="text-4xl mb-2 font-black text-white text-center leading-tight tracking-tight">
                                Selamat Datang di{' '}
                                <Text className="text-accent-primary">
                                    RizVerse
                                </Text>
                            </Text>
                            <Text className="text-base text-gray-300 text-center leading-relaxed font-medium max-w-sm mx-auto">
                                Destinasi utama Anda untuk anime, manga, dan donghua. Temukan, tonton, dan jelajahi kemungkinan tak terbatas.
                            </Text>
                        </View>

                        {/* Modern Feature Cards with Enhanced Glassmorphism */}
                        <View className="space-y-6 mt-8">
                            {/* Feature Card 1 - Streaming */}
                            <Animated.View
                                className="relative overflow-hidden"
                                style={scaleStyle}
                            >
                                {/* Glassmorphism Background */}
                                <View className="bg-gradient-to-r from-[#1A1D29]/40 to-[#2A2D3A]/40 rounded-3xl p-6 border border-white/10 backdrop-blur-2xl shadow-2xl">
                                    {/* Subtle Inner Glow */}
                                    <View className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 rounded-3xl" />

                                    {/* Content */}
                                    <View className="flex-row items-center gap-4 relative z-10">
                                        {/* Enhanced Icon Container */}
                                        <View className="relative">
                                            <View className="w-16 h-16 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-2xl border border-accent-primary/30 flex items-center justify-center">
                                                <View className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center">
                                                    <Text className="text-white text-lg font-bold">▶</Text>
                                                </View>
                                            </View>
                                            {/* Floating Glow Effect */}
                                            <View className="absolute -inset-2 bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 rounded-2xl blur-xl opacity-50" />
                                        </View>

                                        {/* Text Content */}
                                        <View className="flex-1">
                                            <Text className="text-white text-xl font-bold mb-1">Streaming di Mana Saja</Text>
                                            <Text className="text-gray-300 text-base leading-relaxed">Tonton anime favorit Anda kapan saja, di mana saja dengan streaming berkualitas tinggi</Text>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>

                            {/* Feature Card 2 - Discovery */}
                            <Animated.View
                                className="relative overflow-hidden"
                                style={scaleStyle}
                            >
                                {/* Glassmorphism Background */}
                                <View className="bg-gradient-to-r from-[#1A1D29]/40 to-[#2A2D3A]/40 rounded-3xl p-6 border border-white/10 backdrop-blur-2xl shadow-2xl">
                                    {/* Subtle Inner Glow */}
                                    <View className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 rounded-3xl" />

                                    {/* Content */}
                                    <View className="flex-row items-center gap-4 relative z-10">
                                        {/* Enhanced Icon Container */}
                                        <View className="relative">
                                            <View className="w-16 h-16 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-2xl border border-accent-primary/30 flex items-center justify-center">
                                                <View className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center">
                                                    <Text className="text-white text-lg font-bold">🔍</Text>
                                                </View>
                                            </View>
                                            {/* Floating Glow Effect */}
                                            <View className="absolute -inset-2 bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 rounded-2xl blur-xl opacity-50" />
                                        </View>

                                        {/* Text Content */}
                                        <View className="flex-1">
                                            <Text className="text-white text-xl font-bold mb-1">Temukan Lebih Banyak</Text>
                                            <Text className="text-gray-300 text-base leading-relaxed">Jelajahi seri manga dan donghua baru dari seluruh dunia</Text>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>

                            {/* Feature Card 3 - Personalization */}
                            <Animated.View
                                className="relative overflow-hidden"
                                style={scaleStyle}
                            >
                                {/* Glassmorphism Background */}
                                <View className="bg-gradient-to-r from-[#1A1D29]/40 to-[#2A2D3A]/40 rounded-3xl p-6 border border-white/10 backdrop-blur-2xl shadow-2xl">
                                    {/* Subtle Inner Glow */}
                                    <View className="absolute inset-0 bg-gradient-to-r from-accent-secondary/5 to-accent-primary/5 rounded-3xl" />

                                    {/* Content */}
                                    <View className="flex-row items-center gap-4 relative z-10">
                                        {/* Enhanced Icon Container */}
                                        <View className="relative">
                                            <View className="w-16 h-16 bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 rounded-2xl border border-accent-secondary/30 flex items-center justify-center">
                                                <View className="w-8 h-8 bg-gradient-to-br from-accent-secondary to-accent-primary rounded-xl flex items-center justify-center">
                                                    <Text className="text-white text-lg font-bold">⭐</Text>
                                                </View>
                                            </View>
                                            {/* Floating Glow Effect */}
                                            <View className="absolute -inset-2 bg-gradient-to-br from-accent-secondary/30 to-accent-primary/30 rounded-2xl blur-xl opacity-50" />
                                        </View>

                                        {/* Text Content */}
                                        <View className="flex-1">
                                            <Text className="text-white text-xl font-bold mb-1">Rekomendasi Cerdas</Text>
                                            <Text className="text-gray-300 text-base leading-relaxed">Dapatkan rekomendasi yang dipersonalisasi khusus untuk Anda</Text>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>
                        </View>
                    </View>
                </Animated.View>

                {/* Enhanced Slider Button */}
                <View className="px-8">
                    <GestureHandlerRootView>
                        <GestureDetector gesture={pan}>
                            <View style={{ width: SLIDER_WIDTH, height: 80 }} className="mx-auto">
                                {/* Modern Slider Track with Enhanced Styling */}
                                <View className="relative bg-gradient-to-r from-[#1A1D29]/90 to-[#2A2D3A]/90 rounded-3xl h-20 border border-[#2A2D3A]/40 overflow-hidden backdrop-blur-xl">
                                    {/* Enhanced Progress Fill with Animation */}
                                    <Animated.View
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-secondary rounded-3xl"
                                        style={progressStyle}
                                    />

                                    {/* Animated Shimmer Effect */}
                                    <Animated.View
                                        className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl"
                                        style={progressStyle}
                                    />

                                    {/* Pulsing Glow Effect */}
                                    <Animated.View
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-primary/20 via-accent-secondary/20 to-accent-secondary/20 rounded-3xl"
                                        style={progressStyle}
                                    />

                                    {/* Modern Slider Text with Better Typography */}
                                    <View className="absolute inset-0 justify-center items-center">
                                        <Text className="text-white font-bold text-lg tracking-wide text-center px-4">
                                            Geser untuk Memulai
                                        </Text>
                                    </View>

                                    {/* Subtle Glow Effect */}
                                    <View className="absolute inset-0 rounded-3xl border border-white/10" />
                                </View>

                                {/* Enhanced Slider Handle with Better Design */}
                                <Animated.View
                                    className="absolute top-2 left-2 w-16 h-16 bg-white rounded-full justify-center items-center border-2 border-white/20 shadow-2xl"
                                    style={sliderHandleStyle}
                                >
                                    {/* Dynamic Gradient Background */}
                                    <View className="w-8 h-8 rounded-full overflow-hidden">
                                        <LinearGradient
                                            colors={['#FF6B35', '#FF9228', '#8A2BE2']}
                                            className="w-full h-full"
                                        />
                                    </View>

                                    {/* Inner Glow */}
                                    <View className="absolute inset-1 rounded-full bg-white/30" />

                                    {/* Animated Arrow Icon & Background Effects */}
                                    <Animated.View
                                        className="absolute inset-0 justify-center items-center"
                                        style={{}}
                                    >
                                        {/* Animated Background Effects (gradient & particles) inside handle */}
                                        {/* Arrow Icon */}
                                        <View className="w-3 h-3 border-r-2 border-t-2 border-white transform rotate-45" />
                                    </Animated.View>

                                    {/* Outer Glow Effect */}
                                    <View className="absolute -inset-2 bg-gradient-to-r from-accent-primary/30 via-accent-secondary/30 to-accent-secondary/30 rounded-full blur-lg" />
                                </Animated.View>
                            </View>
                        </GestureDetector>
                    </GestureHandlerRootView>
                </View>
            </ScrollView>
        </View>
    )
} 