import * as React from 'react';
import {Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Fab from '../components/Fab';
import CardItem from '../components/CardItem';

import { fakeMangaList } from '../types/fakeMangas';

const ListHeader = ({listCount}:any) => {
    return(
        <View style={{height: 50, width: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text style={{color: 'white'}}>{listCount} {listCount === 1 ? 'Manga' : 'Mangas'}</Text>
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

const Mangas = () => {
    const paperTheme = useTheme();
    const [mangas, setMangas] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
        // Simulate network delay with timeout
        await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
        
        setMangas(fakeMangaList);
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
                ListHeaderComponent={<ListHeader listCount={mangas.length}/>}
                data={mangas}
                renderItem={({ item }) => <CardItem type={'manga'} item={item}/>}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={<ListFooter />}
            />
            <Fab />
        </SafeAreaView>
    );
};

export default Mangas;
