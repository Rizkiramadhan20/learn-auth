import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

import React, { useState } from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { Ionicons } from '@expo/vector-icons';

import { router } from 'expo-router';

import Toast from 'react-native-toast-message';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const { forgotPassword, loading } = useAuth();

    const handleForgot = async () => {
        try {
            await forgotPassword(email);
            Toast.show({ type: 'success', text1: 'Cek email Anda untuk reset password.' });
        } catch {
            Toast.show({ type: 'error', text1: 'Email tidak ditemukan', text2: 'Pastikan email sudah terdaftar.' });
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-[#181A20]">
            <View className="w-[90%] max-w-[400px] bg-[#23262F] rounded-2xl p-7 shadow-md items-center">
                <Text className="text-[22px] font-bold mb-2 text-white">Forgot Password?</Text>
                <Text className="text-[#A1A5B7] mb-6 text-center">No worries, we&apos;ll send you reset instructions.</Text>
                <View className="w-full mb-2">
                    <View className="flex-row items-center bg-[#181A20] rounded-xl border border-[#343a40] px-3">
                        <Ionicons name="mail-outline" size={20} color="#A1A5B7" style={{ marginRight: 8 }} />
                        <TextInput
                            placeholder="Enter your email"
                            placeholderTextColor="#A1A5B7"
                            value={email}
                            onChangeText={setEmail}
                            className="flex-1 text-white py-4 text-[15px]"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleForgot}
                    className="bg-[#FF9228] rounded-xl p-3.5 w-full items-center mt-2 mb-2"
                    disabled={loading}
                >
                    <Text className="text-white font-bold text-[16px]">{loading ? 'Loading...' : 'Reset Password'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { router.navigate('/auth/signin') }}
                    className="border border-[#343a40] rounded-xl p-3.5 w-full items-center mt-3 mb-3 flex-row justify-center bg-transparent"
                >
                    <Ionicons name="arrow-back-outline" size={18} color="#A1A5B7" style={{ marginRight: 6 }} />
                    <Text className="text-[#A1A5B7] font-bold text-[16px]">Back to Login</Text>
                </TouchableOpacity>

                <View className="flex-row justify-center mt-4.5">
                    <Text className="text-[#A1A5B7]">Don&apos;t have account? </Text>
                    <Pressable onPress={() => { router.navigate('/auth/signup') }}>
                        <Text className="text-[#FF9228] font-bold">Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}