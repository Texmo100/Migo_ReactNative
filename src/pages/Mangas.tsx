import * as React from 'react';
import {Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Fab from '../components/Fab';
import CardItem from '../components/CardItem';
import type { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { addManga, deleteManga, editManga, fetchMangas } from '../store/mangaSlice';

import CustomModal from '../components/CustomModal';
import CustomForm from '../components/CustomForm';
import CustomDialog from '../components/CustomDialog';
import { AnimeManga } from '../types/migoTypes';

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

    const [loading, setLoading] = React.useState(true);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [visibleDialog, setVisibleDialog] = React.useState(false);
    const [editingManga, setEditingManga] = React.useState<any | null>(null);
    const [deletingManga, setDeletingManga] = React.useState<any | null>(null);
    const mangas = useSelector((state: RootState) => state.mangaReducer.mangas);
    const dispatch = useDispatch();

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
        // Simulate network delay with timeout
        await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
        
        dispatch(fetchMangas());

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

    const handleConfirmCreate = (newItem:AnimeManga):void => {
        dispatch(addManga(newItem));
        hideModal();
    };

    const handleEdit = (cardItem:any):void => {
        setEditingManga(cardItem);
        showModal();
    };

    const handleConfirmEdit = (newItem:AnimeManga):void => {
        dispatch(editManga(newItem));
        hideModal();
    };

    const handleDelete = (cardItem:any):void => {
        setEditingManga(null);
        setDeletingManga(cardItem);
        showDialog();
    };

    const handleConfirmDelete = (): void => {
        if (deletingManga) {
            dispatch(deleteManga(deletingManga.id));
        }
        hideDialog();
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
                renderItem={({ item }) => <CardItem type={item.itemType} item={item} handleEdit={handleEdit} handleDelete={handleDelete}/>}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={<ListFooter />}
            />

            <CustomModal visible={visibleModal} hideModal={hideModal}>
                <CustomForm
                    hideModal={hideModal}
                    onCreation={handleConfirmCreate}
                    onEdition={handleConfirmEdit}
                    type="manga" mode={editingManga === null ? 'creation' : 'edition'}
                    cardItem={editingManga}
                    collectionSize={mangas.length}
                />
            </CustomModal>

            <CustomDialog visible={visibleDialog} hideDialog={hideDialog} onAction={handleConfirmDelete} type="manga" itemToDelete={deletingManga} />

            <Fab onPressFunction={() => handleCreate()}/>
        </SafeAreaView>
    );
};

export default Mangas;
