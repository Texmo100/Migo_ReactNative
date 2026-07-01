import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Chip } from 'react-native-paper';

interface Props {
    label: string,
    data: any[],
    mode: string,
    chipSelectorHandler: (label:string, selectedChips: any[]) => void,
}

const ChipSelector = ({label, data, mode, chipSelectorHandler}: Props):React.ReactElement => {
    const [selectedChips, setSelectedChips] = React.useState<any[]>([]);

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

    return(
        <React.Fragment>
            <Text variant='labelLarge' style={{marginBottom: 10}}>{label}</Text>
            <View style={styles.chipsContainer}>
                {
                    data.map(item => (
                        <Chip key={item.id} mode={selectedChips.includes(item) ? 'flat' : 'outlined'} onPress={() => handleOnPressChip(item)}>{item.name}</Chip>
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
