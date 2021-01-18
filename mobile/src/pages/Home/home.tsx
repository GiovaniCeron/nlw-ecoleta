import React from 'react';
import { View, ImageBackground, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const Home = () => {
    const naviation = useNavigation();

    function handleNavigateToPoints(){
        naviation.navigate('Points');
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