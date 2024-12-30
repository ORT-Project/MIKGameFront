import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground } from 'react-native';

const IndexScreen: React.FC = () => {
    const headerAnimation = useRef(new Animated.Value(0)).current;
    const subtitleAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(headerAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        Animated.timing(subtitleAnimation, {
            toValue: 1,
            duration: 1500,
            delay: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/originals/3e/72/b3/3e72b311682500305a7e66444743381c.gif' }}
            style={styles.container}
        >
            <View style={styles.textContainer}>
                <Animated.Text
                    style={[
                        styles.header,
                        {
                            opacity: headerAnimation,
                            transform: [
                                {
                                    translateY: headerAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-50, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    Bienvenue sur MIKGame!
                </Animated.Text>

                <Animated.Text
                    style={[
                        styles.subtitle,
                        {
                            opacity: subtitleAnimation,
                            transform: [
                                {
                                    translateY: subtitleAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [50, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    Choisissez un jeu dans le menu ci-dessous
                </Animated.Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start', // Aligner les textes en haut
        alignItems: 'center',
        marginTop: 150, // Ajusté pour être légèrement plus bas
    },
    header: {
        fontSize: 36,
        fontFamily: 'Press Start 2P', // Police rétro
        color: '#0c72d5',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textAlign: 'center',
        borderWidth: 3,
        borderColor: '#0c72d5',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fond noir semi-transparent
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Press Start 2P',
        color: '#FF69B4',
        marginTop: 20, // Espace entre le header et le sous-titre
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#FF69B4',
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fond noir semi-transparent
    },
});

export default IndexScreen;
