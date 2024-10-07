import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps'; // Importer MapView et Marker

type DetailScreenRouteProp = RouteProp<{ Detail: { image: string, price: number, description: string, category: string, address: string, latitude?: number, longitude?: number } }, 'Detail'>;

const DetailScreen: React.FC = () => {
    const route = useRoute<DetailScreenRouteProp>();
    const { image, price, description, category, address, latitude, longitude } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />

            <View style={styles.priceCategoryContainer}>
                <Text style={styles.priceCategoryText}>Prix: {price} €</Text>
                <Text style={styles.priceCategoryText}>Catégorie: {category}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.address}>(Commentaire section just below)</Text>
            {/*<Text style={styles.address}>Address: {address}</Text>

            {/* Vérification si les coordonnées sont disponibles */}
            {latitude && longitude ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                        }}
                        title={address}
                        description={description}
                    />
                </MapView>
            ) : (
                <Text style={styles.noMapText}>Carte non disponible pour cet emplacement.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: 250,
        borderRadius: 20,
        marginBottom: 20,
    },
    description: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'left',
        color: '#343a40',
        fontWeight: 'black',
    },
    priceCategoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 15,
    },
    priceCategoryText: {
        fontSize: 18,
        color: '#6c757d',
        fontWeight: '500',
    },
    address: {
        fontSize: 18,
        color: '#343a40',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    map: {
        width: Dimensions.get('window').width * 0.9,
        height: 300,
        marginTop: 50,
        borderRadius: 20,
    },
    noMapText: {
        fontSize: 16,
        color: '#6c757d',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default DetailScreen;
