import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Fab from '../components/Fab';

const Mangas = () => {
    const { colors } = useTheme();
    
    return(
        <View style={{ flex: 1, padding: 10 }}>
            {/* Screen content */}
            <Fab />
        </View>
    );
};

export default Mangas;
