import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../utils/context/AuthContext';

export default function SignUp() {
    const { signUp, loading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        if (!email || !password || !displayName || !phoneNumber) {
            Toast.show({ type: 'error', text1: 'Semua field wajib diisi' });
            return;
        }
        const res = await signUp(email, password, displayName, phoneNumber);
        if (res && res.user) {
            try {
                Toast.show({ type: 'success', text1: 'Registrasi berhasil!', text2: 'Silakan verifikasi akun Anda.' });
                router.replace('/auth/verification');
            } catch (e) {
                Toast.show({ type: 'error', text1: 'Gagal menyimpan data ke Firestore' });
            }
        } else if (error) {
            Toast.show({ type: 'error', text1: 'Registrasi gagal', text2: error });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Nama Lengkap"
                value={displayName}
                onChangeText={setDisplayName}
            />
            <TextInput
                style={styles.input}
                placeholder="No. HP"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {loading ? (
                <ActivityIndicator />
            ) : (
                <Button title="Sign Up" onPress={handleRegister} />
            )}
            <Button title="Go to Sign In" onPress={() => router.replace('/auth/signin')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    title: { fontSize: 24, marginBottom: 24 },
    input: { width: '100%', maxWidth: 300, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
    error: { color: 'red', marginBottom: 12 },
});
