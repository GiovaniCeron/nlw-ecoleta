import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import axios from 'axios';

import styles from './styles';

interface UF {
    id: number;
    nome: string;
    sigla: string;
}

interface Cidade {
    id: number;
    nome: string;
}

const Home = () => {
    const naviation = useNavigation();

    const [ufs, setUfs] = useState<UF[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [uf, setSelectedUF] = useState('0');
    const [city, setSelectedCity] = useState('0');

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            setUfs(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
            setCidades(response.data);
        });
    }, [uf]);

    function handleNavigateToPoints() {
        naviation.navigate('Points', {uf, city});
    }

    return (
        <ImageBackground
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a entrarem pontos de coleta de forma eficiente</Text>
            </View>

            <View style={styles.footer}>

                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedUF(value)}
                        
                        style={{ inputAndroid: styles.pickerSelect }}
                        items={
                            ufs.map(uf => ({ label: uf.nome, value: uf.sigla }))
                        }
                    />

                    <RNPickerSelect
                        onValueChange={(value) => setSelectedCity(value)}
                        style={{ inputAndroid: styles.pickerSelect }}
                        items={
                            cidades.map(cidade => ({ label: cidade.nome, value: cidade.nome }))
                        }
                    />
                </View>

                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Feather name='arrow-right' color='#fff' size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>

        </ImageBackground>
    );
}

export default Home