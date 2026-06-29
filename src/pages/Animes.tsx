import * as React from 'react';
import {Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Fab from '../components/Fab';
import CardItem from '../components/CardItem';

import { fakeAnimeList } from '../types/fakeAnimes';

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
    const paperTheme = useTheme();
    const [animes, setAnimes] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
        // Simulate network delay with timeout
        await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
        
        setAnimes(fakeAnimeList);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if(loading){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} color={paperTheme.colors.primary} size={'large'}/>
                <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
            </View>
        );
    }

    return(
        <SafeAreaView style={{flex: 1, padding: 10 }}>
            <FlatList
                ListHeaderComponent={<ListHeader listCount={animes.length}/>}
                data={animes}
                renderItem={({ item }) => <CardItem type={'anime'} item={item}/>}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={<ListFooter />}
            />
            <Fab />
        </SafeAreaView>
    );
};

export default Animes;
