import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';  // Importer les fonctions nécessaires
import { app } from './firebaseConfig';  // Importer l'instance Firebase

const HomeScreen: React.FC = () => {
    const navigation: any = useNavigation();
    const [images, setImages] = useState<any[]>([]);  // Utiliser un tableau d'objets pour inclure plus d'infos (texte, adresse, etc.)

    // Initialiser Firestore
    const firestore = getFirestore(app);

    // Fonction pour récupérer des images depuis Firestore
    useEffect(() => {
        const q = query(collection(firestore, 'spots'), orderBy('createdAt', 'desc'));  // Créer une requête
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedImages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setImages(fetchedImages);
        });

        // Nettoyer l'écouteur Firestore lors du démontage du composant
        return () => unsubscribe();
    }, []);

    const renderImage = ({ item }: { item: any }) => (
        <View style={styles.imageContainer}>
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
                <Text>Aucune image</Text>
            )}
            {/*<Text style={styles.imageText}>Prix: {item.price} €</Text>*/}
            <Text style={styles.imageText}>Adresse: {item.address}</Text>
            {/*<Text style={styles.imageText}>Catégorie: {item.category}</Text>*/}
            <Text style={styles.imageText}>Texte: {item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Bouton Profil */}
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                <Image source={require('./assets/profile.png')} style={styles.topBarIcon} />
            </TouchableOpacity>

            {/* Liste d'images avec défilement */}
            <FlatList
                data={images}
                renderItem={renderImage}
                keyExtractor={(item) => item.id}
                numColumns={2}  // Nombre de colonnes pour la grille
                style={styles.imageGrid}
            />

            {/* Bouton "add" */}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add')}>
                <Image source={require('./assets/add.png')} style={styles.addIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(149,85,85)',
        paddingTop: 50,
        position: 'relative',
    },
    profileButton: {
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 1,
        borderRadius: 40,
        width: 'auto',
    },
    topBarIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    imageGrid: {
        marginTop: 10,  // Laisser de la place pour le bouton de profil en haut
        paddingHorizontal: 10,
    },
    imageContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 240, // Augmenté pour mieux s'adapter à l'image
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: '70%',
        borderRadius: 15,
        resizeMode: 'cover',
    },
    imageText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        backgroundColor: '#100f0f',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    addIcon: {
        width: 30,
        height: 30,
        tintColor: '#fff',
    },
});

export default HomeScreen;
