import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
    const navigation: any = useNavigation();

    // Simuler des images pour la démonstration
    const [images, setImages] = useState<string[]>([
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
    ]);

    // Fonction pour récupérer des images de la base de données (à implémenter plus tard)
    useEffect(() => {
        // Ici, tu vas récupérer les images depuis la base de données
    }, []);

    const renderImage = ({ item }: { item: string }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
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
                keyExtractor={(item, index) => index.toString()}
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
        backgroundColor: 'rgb(179,10,10)',
        paddingTop: 50,
        position: 'relative',
    },
    profileButton: {
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 1,
        //backgroundColor: '#ffffff',
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
        height: 150,
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
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
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
