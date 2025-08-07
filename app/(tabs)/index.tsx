import { useAuth } from '@/utils/context/AuthContext';

import { Redirect } from 'expo-router';

import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const { user, signOut, loading } = useAuth();

  if (!user && !loading) {
    return <Redirect href="/auth" />;
  }

  if (loading) {
    return <View style={styles.center}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.center}>
      <Text style={styles.email}>Welcome, {user?.email}</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  email: { fontSize: 18, marginBottom: 16 },
}); 