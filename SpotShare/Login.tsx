import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';  // Importing the already initialized auth object

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);  // Use imported auth
            console.log('User signed in!');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',  // Centre verticalement
        alignItems: 'center',      // Centre horizontalement
        padding: 16,
        backgroundColor: '#f9f9f9', // Couleur de fond
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center', // Centre le titre
    },
    input: {
        height: 50,
        width: 500,          // Prend toute la largeur
        maxWidth: 300,         // Largeur maximale pour éviter d'être trop large
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center', // Centre le message d'erreur
    },
});

export default LoginScreen;
