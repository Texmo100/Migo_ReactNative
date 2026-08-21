import React from 'react';
import { View, Text } from 'react-native';

interface Props {
    listCount: number
}

const ListFooter = ({ listCount }: Props):React.ReactElement => {
    if(listCount === 0) {
        return(
            <React.Fragment></React.Fragment>
        );
    }
    return(
        <View style={{height: 70, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Migo</Text>
        </View>
    );
};

export default ListFooter;
