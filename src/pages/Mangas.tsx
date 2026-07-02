import * as React from 'react';
import {Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Fab from '../components/Fab';
import CardItem from '../components/CardItem';

import { fakeMangaList } from '../types/fakeDatabase';
import CustomModal from '../components/CustomModal';
import CustomForm from '../components/CustomForm';
import CustomDialog from '../components/CustomDialog';

const ListHeader = ({listCount}:any):React.ReactElement => {
    return(
        <View style={{height: 50, width: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text style={{color: 'white'}}>{listCount} {listCount === 1 ? 'Manga' : 'Mangas'}</Text>
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

const Mangas = ():React.ReactElement => {
    const paperTheme = useTheme();
    const [mangas, setMangas] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [visibleDialog, setVisibleDialog] = React.useState(false);
    const [editingManga, setEditingManga] = React.useState(null);
    const [deletingManga, setDeletingManga] = React.useState(null);

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

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);
    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);

    const handleCreate = ():void => {
        setEditingManga(null);
        setDeletingManga(null);
        showModal();
    };

    const handleEdit = (cardItem:any):void => {
        setEditingManga(cardItem);
        showModal();
    };

    const handleDelete = (cardItem:any):void => {
        setEditingManga(null);
        setDeletingManga(cardItem);
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
                ListHeaderComponent={<ListHeader listCount={mangas.length}/>}
                data={mangas}
                renderItem={({ item }) => <CardItem type={'manga'} item={item} handleEdit={handleEdit} handleDelete={handleDelete}/>}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={<ListFooter />}
            />

            <CustomModal visible={visibleModal} hideModal={hideModal}>
                <CustomForm hideModal={hideModal} type="manga" mode={editingManga === null ? 'creation' : 'edition'} cardItem={editingManga}/>
            </CustomModal>

            <CustomDialog visible={visibleDialog} hideDialog={hideDialog} type="manga" itemToDelete={deletingManga} />

            <Fab onPressFunction={() => handleCreate()}/>
        </SafeAreaView>
    );
};

export default Mangas;
