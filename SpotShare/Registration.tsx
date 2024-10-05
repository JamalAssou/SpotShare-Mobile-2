import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';  // Importing the already initialized auth object

const RegisterScreen: React.FC<{ goToLogin: () => void }> = ({ goToLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);  // Use imported auth
            console.log('User account created & signed in!');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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
            <Button title="Register" onPress={handleRegister} />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            {/* Lien pour revenir à la page de connexion */}
            <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.loginText}>
                    Déjà un compte ? Connectez-vous ici !
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        width: 500,
        maxWidth: 300,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    loginText: {
        marginTop: 20,
        fontSize: 16,
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

export default RegisterScreen;
