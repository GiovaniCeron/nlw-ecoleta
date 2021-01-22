import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';

import api from '../../services/api';
import styles from './styles';

interface Item {
    iditem: number;
    title: string;
}

interface Point {
    idpoint: number;
    image: string;
    image_url: string;
    name: string;
    latitude: number;
    longitude: number;
}

interface Params {
    uf: string;
    city: string;
}

const Point = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParms = route.params as Params;

    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [inicialPosition, setInicialPosition] = useState<[number, number]>([0, 0]);
    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Precismos de sua permissão para obter a sua localização');
                return;
            }

            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;

            setInicialPosition([latitude, longitude]);
        }

        loadPosition();
    }, []);

    useEffect(() => {
        api.get('points', {
            params: {
                city: routeParms.city,
                uf: routeParms.uf,
                items: selectedItems
            }
        }).then(response => {
            setPoints(response.data);
        })
    }, [selectedItems]);


    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail(idpoint: number) {
        navigation.navigate('Detail', { idpoint: idpoint });
    }

    function handleSelectedItem(iditem: number) {
        const alreadySelected = selectedItems.findIndex(item => item === iditem);

        if (alreadySelected >= 0) {
            const filterItems = selectedItems.filter(item => item !== iditem);
            setSelectedItems(filterItems);
        } else {
            setSelectedItems([...selectedItems, iditem]);
        }
    }


    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Feather name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem Vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    {inicialPosition[0] !== 0 && (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: inicialPosition[0],
                                longitude: inicialPosition[1],
                                latitudeDelta: 0.014,
                                longitudeDelta: 0.014,
                            }}
                        >
                            {points.map(point => (
                                <Marker
                                    key={point.idpoint}
                                    onPress={() => handleNavigateToDetail(point.idpoint)}
                                    coordinate={{
                                        latitude: point.latitude,
                                        longitude: point.longitude,
                                    }}
                                >
                                    <View style={styles.mapMarkerContainer}>
                                        <Image style={styles.mapMarkerImage} source={{uri: point.image_url}} />
                                        <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    )}
                </View>
                <View style={styles.itemsContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {items.map(item => (
                            <TouchableOpacity
                                key={item.iditem}
                                style={[
                                    styles.item,
                                    selectedItems.includes(item.iditem) ? styles.selectedItem : {}
                                ]}
                                activeOpacity={0.5}
                                onPress={() => handleSelectedItem(item.iditem)}
                            >
                                <SvgUri width={42} height={42} uri="http://192.168.5.110:3333/uploads/oleo.svg" />
                                <Text style={styles.itemTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </>
    );
}

export default Point;