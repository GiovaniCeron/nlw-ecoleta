import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';
import styles from './styles';

interface Params {
    idpoint: number;
}

interface PointData{
    point:{
        name: string;
        email: string;
        whatshapp: number;
        city: string;
        uf: string;
    };
    items: {
        title: string;
    }[]
}

const Detail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParms = route.params as Params;

    const [point, setPoint] = useState<PointData>({} as PointData);

    useEffect(() => {
        api.get(`points/${routeParms.idpoint}`).then(response =>{
            setPoint(response.data);
        });
    }, [])


    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleWhatshapp(){
        Linking.openURL(`whatsapp://send?phone=${point.point.whatshapp}&text=Tenho interesse no seu teste NLW Ecoleta`);
    }

    function handleComposeMail(){
        MailComposer.composeAsync({
            subject: "Interesse no Teste NLW-Ecoleta",
            recipients:[point.point.email]
        });
    }

    if(!point.point){
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Feather name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Image style={styles.pointImage} source={{ uri: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=667&q=80' }} />

                <Text style={styles.pointName}>{point.point.name}</Text>
                <Text style={styles.pointItems}>
                    {point.items.map(item => item.title).join(', ')}
                </Text>

                <View>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{point.point.city}, {point.point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatshapp}>
                    <FontAwesome name="whatsapp" size={20} color='#fff' />
                    <Text style={styles.buttonText}>Whatshapp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Feather name="mail" size={20} color='#fff' />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </>
    );
}

export default Detail;