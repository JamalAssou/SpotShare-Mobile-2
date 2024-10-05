// App.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Login';
import RegisterScreen from './Registration';
import HomeScreen from './HomeScreen';
import AddScreen from './AddScreen'; // Importer le nouvel écran de formulaire

const Stack = createStackNavigator();

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setIsRegistering(false); // Réinitialiser quand l'utilisateur est connecté
            }
        });
        return unsubscribe; // Nettoyer l'abonnement
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    // Si l'utilisateur est connecté, afficher l'écran d'accueil et le formulaire
                    <>
                        <Stack.Screen
                            name="Home"
                            options={{ headerShown: false }}  // Cacher le titre de l'écran d'accueil
                        >
                            {() => <HomeScreen onLogout={() => setUser(null)} />}
                        </Stack.Screen>
                        <Stack.Screen name="Add" component={AddScreen} options={{ title: 'Ajouter un élément' }} />
                    </>
                ) : (
                    // Si l'utilisateur n'est pas connecté, afficher les écrans de connexion et d'inscription
                    <>
                        <Stack.Screen name="Login" options={{ title: 'Connexion' }}>
                            {({ navigation }) => ( // <--- récupère l'objet navigation ici
                                <>
                                    <LoginScreen />
                                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                        <Text style={styles.registerText}>Pas de compte ? Inscrivez-vous ici !</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Stack.Screen>

                        <Stack.Screen name="Register" options={{ title: 'Inscription' }}>
                            {() => <RegisterScreen goToLogin={() => setIsRegistering(false)} />}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>

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
    registerText: {
        marginTop: 20,
        fontSize: 16,
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

//AppRegistry.registerComponent('main', () => App);

export default App;
