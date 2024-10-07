import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { app } from './firebaseConfig';

const HomeScreen: React.FC = () => {
    const navigation: any = useNavigation();
    const [images, setImages] = useState<any[]>([]);

    const firestore = getFirestore(app);

    useEffect(() => {
        const q = query(collection(firestore, 'spots'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedImages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setImages(fetchedImages);
        });

        return () => unsubscribe();
    }, []);

    const renderImage = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => navigation.navigate('Detail', {
                image: item.image,
                price: item.price,
                description: item.text,
                category: item.category,
                address: item.address,
                latitude: item.latitude,
                longitude: item.longitude,
            })}
        >
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
                <Text>Aucune image</Text>
            )}
            <Text style={styles.imageText}>{item.text}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>SpotShare</Text>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('./assets/profile.png')} style={styles.topBarIcon} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={images}
                renderItem={renderImage}
                keyExtractor={(item) => item.id}
                numColumns={2}
                style={styles.imageGrid}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add')}>
                <Image source={require('./assets/add.png')} style={styles.addIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
        paddingTop: 50,
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 0,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000000',
    },
    profileButton: {
        borderRadius: 40,
        width: 'auto',
    },
    topBarIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    imageGrid: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    imageContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: '#d6d6d6',
        borderRadius: 15,
        height: 240,
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
        height: '80%',
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