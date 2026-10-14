import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import { selectAnimeFilter, setAnimeFilter } from '../store/animeSlice';
import { selectMangaFilter, setMangaFilter } from '../store/mangaSlice';
import type { AppDispatch } from '../store/store';

interface Props {
    listType: string;
    listCount: number;
}

type Activenames = {
    singleName: string
    pluralName: string
};

type Status = "completed" | "in-progress" | "archived";

const ListHeader = ({ listType, listCount }:Props):React.ReactElement => {
    const [listNames, setListNames] = React.useState<Activenames>({
        singleName: '',
        pluralName: ''
    });
    const filter = listType === "anime" ? useSelector(selectAnimeFilter) : useSelector(selectMangaFilter);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if(listType === 'anime') {
            setListNames({singleName: 'anime', pluralName: 'animes'});
        }

        if(listType === 'manga') {
            setListNames({singleName: 'manga', pluralName: 'mangas'});
        }
    }, []);

    const handleFilterChange = (value: Status):void => {
        if(listType === "anime") {
            dispatch(setAnimeFilter(value))
        }

        if(listType === "manga") {
            dispatch(setMangaFilter(value))
        }
    };

    return(
        <View style={styles.mainContainer}>
            <SegmentedButtons
                value={filter}
                onValueChange={(value) => handleFilterChange(value)}
                buttons={[
                    { value: 'completed', label: 'Completed' },
                    { value: 'in-progress', label: 'In-Progress' },
                    { value: 'archived', label: 'Archived' },
                ]}
            />
            <View style={styles.counterContainer}>
                <Text style={{ color: 'white' }}>
                    { listCount} {listCount === 1 ? listNames.singleName : listNames.pluralName }
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 20,
    },
    counterContainer: {
        flex: 1,
        margin: 10,
    },
});

export default ListHeader;
