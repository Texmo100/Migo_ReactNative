import * as React from 'react';
import {Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Fab from '../components/Fab';
import CardItem from '../components/CardItem';

import { fakeAnimeList } from '../assets/fakeDatabase/fakeAnimes';

const ListHeader = ({listCount}:any) => {
    return(
        <View style={{height: 50, width: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text style={{color: 'white'}}>{listCount} {listCount === 1 ? 'Anime' : 'Animes'}</Text>
        </View>
    );
};

const ListFooter = () => {
    return(
        <View style={{height: 70, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Migo</Text>
        </View>
    );
};

const Animes = () => {
    const { colors } = useTheme();
    const [animes, setAnimes] = React.useState(fakeAnimeList);

    return(
        <SafeAreaView style={{flex: 1, padding: 10 }}>
            <FlatList
                ListHeaderComponent={<ListHeader listCount={animes.length}/>}
                data={animes}
                renderItem={({ item }) => <CardItem item={item}/>}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={<ListFooter />}
            />
            <Fab />
        </SafeAreaView>
    );
};

export default Animes;
