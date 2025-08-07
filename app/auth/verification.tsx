import axios from 'axios';

import { LinearGradient } from 'expo-linear-gradient';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ActivityIndicator, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { db } from '@/utils/firebase/Firebase';

import Toast from 'react-native-toast-message';

import Check from '@/assets/images/check.json';

import LottieView from 'lottie-react-native';

function formatPhone(phone: string) {
    let p = phone.replace(/[^0-9]/g, '');
    if (p.startsWith('0')) {
        p = '62' + p.slice(1);
    }
    return p;
}

function OtpInput({ value, onChange, length = 6 }: { value: string; onChange: (v: string) => void; length?: number }) {
    const inputs = Array.from({ length });
    const refs = useRef<(TextInput | null)[]>([]);

    const handleChange = (text: string, idx: number) => {
        let newValue = value.split('');
        if (text.length > 1) {
            // Paste case
            newValue = text.split('').slice(0, length);
            onChange(newValue.join(''));
            Keyboard.dismiss();
            return;
        }
        if (text) {
            newValue[idx] = text;
            onChange(newValue.join('').slice(0, length));
            if (idx < length - 1) refs.current[idx + 1]?.focus();
        } else {
            newValue[idx] = '';
            onChange(newValue.join(''));
        }
    };

    const handleKeyPress = (e: any, idx: number) => {
        if (e.nativeEvent.key === 'Backspace' && !value[idx] && idx > 0) {
            refs.current[idx - 1]?.focus();
        }
    };

    return (
        <View className="flex-row justify-center mb-8 gap-3">
            {inputs.map((_, idx) => (
                <TextInput
                    key={idx}
                    ref={ref => { refs.current[idx] = ref; }}
                    value={value[idx] || ''}
                    onChangeText={text => handleChange(text, idx)}
                    onKeyPress={e => handleKeyPress(e, idx)}
                    keyboardType="number-pad"
                    maxLength={1}
                    className={`w-11 h-14 rounded-xl bg-[#23252B] text-white text-2xl text-center border-2 mx-0.5 ${value[idx] ? 'border-[#FF6B35]' : 'border-[#23252B]'} ${idx === value.length ? 'border-[#FF6B35]' : ''}`}
                    selectionColor="#FF6B35"
                    autoFocus={idx === 0}
                    returnKeyType="done"
                />
            ))}
        </View>
    );
}

export default function Verification() {
    const router = useRouter();
    let { phone } = useLocalSearchParams();
    // Ensure phone is always a string
    if (Array.isArray(phone)) phone = phone[0];
    const [displayName, setDisplayName] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const [resendPending, setResendPending] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const OTP_VALID_DURATION = 5 * 60; // 5 menit dalam detik
    const [otpExpiry, setOtpExpiry] = useState<Date | null>(null);
    const [otpTimeLeft, setOtpTimeLeft] = useState(0);

    const setOtpExpiryNow = useCallback(() => {
        const expiry = new Date(Date.now() + OTP_VALID_DURATION * 1000);
        setOtpExpiry(expiry);
        setOtpTimeLeft(OTP_VALID_DURATION);
    }, [OTP_VALID_DURATION]);

    useEffect(() => {
        const fetchPhone = async () => {
            setLoading(true);
            try {
                if (!phone) {
                    Toast.show({ type: 'error', text1: 'Parameter phone tidak ditemukan.' });
                    setLoading(false);
                    return;
                }
                const q = query(collection(db, 'accounts'), where('phoneNumber', '==', phone));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const userData = snap.docs[0].data();
                    setDisplayName(userData.displayName || '');
                    setCreatedAt(userData.createdAt || '');
                    setOtpExpiryNow();
                } else {
                    Toast.show({ type: 'error', text1: 'User tidak ditemukan.' });
                }
            } catch {
                Toast.show({ type: 'error', text1: 'Gagal mengambil data user.' });
            } finally {
                setLoading(false);
            }
        };
        if (phone) fetchPhone();
    }, [phone, setOtpExpiryNow]);

    useEffect(() => {
        if (resendPending) {
            timerRef.current = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        timerRef.current = null;
                        setResendPending(false);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [resendPending]);

    // Countdown OTP expiry
    useEffect(() => {
        if (!otpExpiry) return;
        setOtpTimeLeft(Math.max(0, Math.floor((otpExpiry.getTime() - Date.now()) / 1000)));
        const interval = setInterval(() => {
            setOtpTimeLeft((prev) => {
                const newVal = Math.max(0, Math.floor((otpExpiry.getTime() - Date.now()) / 1000));
                if (newVal <= 0) {
                    clearInterval(interval);
                }
                return newVal;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [otpExpiry]);

    const handleVerify = async () => {
        setVerifying(true);
        try {
            if (otpTimeLeft <= 0) {
                Toast.show({ type: 'error', text1: 'OTP sudah kadaluarsa. Silakan resend.' });
                setVerifying(false);
                return;
            }
            const res = await axios.post('https://bot-rizverse-production.up.railway.app/verify-otp', { phone: formatPhone(phone), otp });
            if (res.data.success) {
                const q = query(collection(db, 'accounts'), where('phoneNumber', '==', phone));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const userDoc = snap.docs[0];
                    await updateDoc(doc(db, 'accounts', userDoc.id), { isVerified: true });
                }
                Toast.show({ type: 'success', text1: 'Verifikasi berhasil!', text2: 'Silakan login.' });
                router.replace('/auth/verification-success');
            } else {
                Toast.show({ type: 'error', text1: 'OTP salah atau gagal verifikasi.' });
            }
        } catch {
            Toast.show({ type: 'error', text1: 'OTP salah atau gagal verifikasi.' });
        } finally {
            setVerifying(false);
        }
    };

    const handleResend = async () => {
        if (!phone) return;
        setResendPending(true);
        setResendTimer(30);
        try {
            await axios.post('https://bot-rizverse-production.up.railway.app/send-otp', { phone: formatPhone(phone), displayName, createdAt });
            Toast.show({ type: 'success', text1: 'OTP baru dikirim ke WhatsApp Anda.' });
            setOtpExpiryNow(); // Reset expiry saat resend
        } catch {
            Toast.show({ type: 'error', text1: 'Gagal mengirim ulang OTP.' });
        }
    };

    if (loading) {
        return <View className="flex-1 justify-center items-center bg-[#181A20]"><ActivityIndicator size="large" color="#FF6B35" /></View>;
    }

    return (
        <LinearGradient
            colors={["#181A20", "#23252B", "#FF6B35"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1.5 }}
            className="flex-1"
        >
            <Pressable className="flex-1 items-center justify-center p-6" onPress={Keyboard.dismiss}>
                <View className="mb-6">
                    <LottieView source={Check} autoPlay loop style={{ width: 100, height: 100 }} />
                </View>
                <Text className="text-2xl font-bold text-white mb-2 text-center">Verification Code</Text>
                <Text className="text-gray-300 text-base mb-7 text-center">Enter the verification code sent to you ******</Text>
                <OtpInput value={otp} onChange={setOtp} length={6} />
                <Text className="text-gray-400 text-center mb-2">
                    {otpTimeLeft > 0
                        ? `Kode OTP berlaku ${Math.floor(otpTimeLeft / 60)}:${(otpTimeLeft % 60).toString().padStart(2, '0')}`
                        : 'Kode OTP sudah kadaluarsa. Silakan resend.'}
                </Text>
                <TouchableOpacity
                    onPress={handleVerify}
                    className={`bg-[#FF6B35] rounded-2xl py-4 w-full items-center mb-4 mt-0.5 ${verifying || otp.length < 6 || otpTimeLeft <= 0 ? 'opacity-70' : ''}`}
                    disabled={verifying || otp.length < 6 || otpTimeLeft <= 0}
                >
                    <Text className="text-white font-bold text-lg">{otpTimeLeft <= 0 ? 'OTP Expired' : (verifying ? 'Verifying...' : 'Verify')}</Text>
                </TouchableOpacity>
                <Text className="text-gray-300 text-base text-center">
                    Didn&apos;t receive a code?{' '}
                    <Text
                        className={`font-bold ${resendPending ? 'text-gray-400' : 'text-[#FF6B35]'}`}
                        onPress={!resendPending ? handleResend : undefined}
                    >
                        Resend{resendPending ? `(${resendTimer})` : ''}
                    </Text>
                </Text>
            </Pressable>
        </LinearGradient>
    );
}