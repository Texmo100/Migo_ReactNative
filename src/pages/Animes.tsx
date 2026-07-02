import * as React from 'react';
import {Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Fab from '../components/Fab';
import CardItem from '../components/CardItem';

import { fakeAnimeList } from '../types/fakeDatabase';
import CustomModal from '../components/CustomModal';
import CustomForm from '../components/CustomForm';
import CustomDialog from '../components/CustomDialog';

const ListHeader = ({listCount}:any):React.ReactElement => {
    return(
        <View style={{height: 50, width: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text style={{color: 'white'}}>{listCount} {listCount === 1 ? 'Anime' : 'Animes'}</Text>
        </View>
    );
};

const ListFooter = ():React.ReactElement => {
    return(
        <View style={{height: 70, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Migo</Text>
        </View>
    );
};

const Animes = ():React.ReactElement => {
    const paperTheme = useTheme();
    const [animes, setAnimes] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [visibleDialog, setVisibleDialog] = React.useState(false);
    const [editingAnime, setEditingAnime] = React.useState(null);
    const [deletingAnime, setDeletingAnime] = React.useState(null);

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

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);
    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);

    const handleCreate = ():void => {
        setEditingAnime(null);
        setDeletingAnime(null);
        showModal();
    };

    const handleEdit = (cardItem:any):void => {
        setEditingAnime(cardItem);
        showModal();
    };

    const handleDelete = (cardItem:any):void => {
        setEditingAnime(null);
        setDeletingAnime(cardItem);
        showDialog();
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
                renderItem={({ item }) => <CardItem type={'anime'} item={item} handleEdit={handleEdit} handleDelete={handleDelete}/>}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={<ListFooter />}
            />

            <CustomModal visible={visibleModal} hideModal={hideModal}>
                <CustomForm hideModal={hideModal} type="anime" mode={editingAnime === null ? 'creation' : 'edition'} cardItem={editingAnime}/>
            </CustomModal>

            <CustomDialog visible={visibleDialog} hideDialog={hideDialog} type="anime" itemToDelete={deletingAnime} />

            <Fab onPressFunction={handleCreate}/>
        </SafeAreaView>
    );
};

export default Animes;
