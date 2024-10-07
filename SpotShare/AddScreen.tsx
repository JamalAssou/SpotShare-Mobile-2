import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Utilisation du module d'Expo
import { Picker } from '@react-native-picker/picker'; // Pour la sélection de catégories
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './firebaseConfig';
import axios from 'axios'; // Importer axios pour les requêtes HTTP

const AddScreen: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('urbex'); // Valeur par défaut
    const [loading, setLoading] = useState(false);

    const firestore = getFirestore(app);
    const storage = getStorage(app);

    const GEOCODE_API_KEY = '401c85cf0f7b477696b22d5ac2603fcb'; // Remplace par ta clé OpenCage

    useEffect(() => {
        requestPermissions();
    }, []);

    // Demander les permissions d'accès à la galerie pour Expo
    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Erreur', 'Nous avons besoin des permissions pour accéder à vos photos.');
        }
    };

    // Fonction pour ouvrir la galerie et choisir une image
    const handleChooseImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            } else {
                Alert.alert('Aucune image sélectionnée', 'Veuillez sélectionner une image.');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la sélection de l\'image.');
        }
    };

    // Fonction pour traduire l'adresse en latitude et longitude
    const geocodeAddress = async (address: string) => {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${GEOCODE_API_KEY}`;
        try {
            const response = await axios.get(url);
            const { lat, lng } = response.data.results[0].geometry; // Récupérer latitude et longitude
            return { lat, lng };
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de géocoder cette adresse.');
            return null;
        }
    };

    // Fonction pour soumettre les données
    const handleSubmit = async () => {
        if (!image || !text || !address || !price || !category) {
            Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
            return;
        }

        setLoading(true);

        try {
            // Géocoder l'adresse pour obtenir les coordonnées
            const coordinates = await geocodeAddress(address);
            if (!coordinates) {
                setLoading(false);
                return;
            }

            // Télécharger l'image vers Firebase Storage
            const response = await fetch(image);
            const blob = await response.blob();
            const storageRef = ref(storage, `images/${Date.now()}`);
            await uploadBytes(storageRef, blob);

            // Obtenir l'URL de l'image téléchargée
            const downloadURL = await getDownloadURL(storageRef);

            // Ajouter les données à Firestore, y compris les coordonnées géographiques
            await addDoc(collection(firestore, 'spots'), {
                image: downloadURL,
                text,
                address,
                price: parseFloat(price),
                category,
                latitude: coordinates.lat, // Ajouter latitude
                longitude: coordinates.lng, // Ajouter longitude
                createdAt: new Date(),
            });

            Alert.alert('Succès', 'Élément ajouté avec succès');
            setImage(null);
            setText('');
            setAddress('');
            setPrice('');
            setCategory('urbex');
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imagePicker} onPress={handleChooseImage}>
                {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text>Choisir une image</Text>}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Ajouter un texte"
                value={text}
                onChangeText={setText}
            />
            <TextInput
                style={styles.input}
                placeholder="Ajouter une adresse"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Ajouter un prix"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />
            <Text style={styles.label}>Sélectionner une catégorie :</Text>
            <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Urbex" value="urbex" />
                <Picker.Item label="Park" value="park" />
                <Picker.Item label="Ville" value="ville" />
                <Picker.Item label="Campagne" value="campagne" />
            </Picker>

            <Button title="Soumettre" onPress={handleSubmit} disabled={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    imagePicker: {
        height: 200,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
});

export default AddScreen;