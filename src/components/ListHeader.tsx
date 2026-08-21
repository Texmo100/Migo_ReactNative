import React from 'react';
import { View, Text } from 'react-native';

interface Props {
    listType: string
    listCount: number
}

const ListHeader = ({listType, listCount}:Props):React.ReactElement => {
    const [listNames, setListNames] = React.useState({
        singleName: '',
        pluralName: ''
    });

    React.useEffect(() => {
        if(listType === 'anime') {
            setListNames({singleName: 'anime', pluralName: 'animes'});
        }

        if(listType === 'manga') {
            setListNames({singleName: 'manga', pluralName: 'mangas'});
        }
    }, []);

    if(listCount === 0) {
        return(
            <React.Fragment></React.Fragment>
        );
    }

    return(
        <View style={{height: 50, width: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text style={{color: 'white'}}>
                {listCount} {listCount === 1 ? listNames.singleName : listNames.pluralName}
            </Text>
        </View>
    );
};

export default ListHeader;
