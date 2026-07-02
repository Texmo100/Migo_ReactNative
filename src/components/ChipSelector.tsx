import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Chip } from 'react-native-paper';

interface Props {
    label: string,
    data: any[],
    mode: string,
    chipSelectorHandler: (label:string, selectedChips: any[]) => void,
    value: any,
}

const ChipSelector = ({label, data, mode, chipSelectorHandler, value}: Props):React.ReactElement => {
    const [selectedChips, setSelectedChips] = React.useState<any[]>(
        mode === 'multiple'
        ? 
        value 
        : (value !== undefined ? [value] : [])
    );

    React.useEffect(() => {
        console.log(selectedChips);
    }, []);

    React.useEffect(()=> {
        chipSelectorHandler(label, selectedChips);
    }, [selectedChips]);

    const handleOnPressChip = (item:any): void => {
        if(mode == 'multiple') {
            setSelectedChips(prev => {
                if (prev.includes(item)) {
                    return prev.filter(chip => chip.id !== item.id);
                } else {
                    return [...prev, item];
                }
            });
        }

        if(mode === 'single') {
            setSelectedChips(prev => {
                if(prev.includes(item)) {
                    return []
                } else {
                    return [item]
                }
            });
        }
    };

    const isChipInSelectedChips = (chip:any):any => {
        if(selectedChips.length > 0) {
            const selectedChipsList = selectedChips.filter(selectedChip => selectedChip.name === chip.name);
            return selectedChipsList.length > 0 ? true : false;
        }

        return false;
    };

    return(
        <React.Fragment>
            <Text variant='labelLarge' style={{marginBottom: 10}}>{label}</Text>
            <View style={styles.chipsContainer}>
                {
                    data.map(item => (
                        <Chip key={item.id} mode={isChipInSelectedChips(item) ? 'flat' : 'outlined'} onPress={() => handleOnPressChip(item)}>{item.name}</Chip>
                    ))
                }
            </View>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    chipsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10,
    },
});

export default ChipSelector;
