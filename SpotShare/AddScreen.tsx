import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'; // Installer via 'npm install react-native-image-picker'

const AddScreen: React.FC = () => {
    const [image, setImage] = useState<any>(null);
    const [text, setText] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');

    const handleChooseImage = () => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo', // Vous pouvez choisir 'photo', 'video' ou 'mixed'
                quality: 1, // Optionnel: qualité de l'image de 0 à 1
            },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    setImage(response.assets[0].uri);
                }
            }
        );
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

            <Button title="Soumettre" onPress={() => console.log({ image, text, address, price })} />
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
});

export default AddScreen;
