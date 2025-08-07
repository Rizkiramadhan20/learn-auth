import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../utils/context/AuthContext';

export default function SignIn() {
    const { signIn, loading, error, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show({ type: 'error', text1: 'Email dan password wajib diisi' });
            return;
        }
        const res = await signIn(email, password);
        if (res && res.user) {
            setLoginSuccess(true);
            Toast.show({ type: 'success', text1: 'Login berhasil!' });
        } else if (error) {
            Toast.show({ type: 'error', text1: 'Login gagal', text2: error });
        }
    };

    useEffect(() => {
        if (user && loginSuccess) {
            router.replace('/');
        }
    }, [user, loginSuccess]);

    if (user) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
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
                <Button title="Sign In" onPress={handleLogin} />
            )}
            <Button title="Go to Sign Up" onPress={() => router.replace('/auth/signup')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    title: { fontSize: 24, marginBottom: 24 },
    input: { width: '100%', maxWidth: 300, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
    error: { color: 'red', marginBottom: 12 },
}); 