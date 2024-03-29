import {StyleSheet} from "react-native";

const HistoryStyles = StyleSheet.create({
    SectionHeader: {
        fontSize: 24, fontWeight: `bold`, paddingTop: 12, paddingLeft: 12
    },
    HistoryEventCard: {
        backgroundColor: `#ccc`, padding: 12, borderColor: `#000`, marginHorizontal: 20, marginVertical: 4
    },
    HistoryAlternateText: {
        marginHorizontal: 20
    },
    HistoryCardTitle: { 
        fontSize: 16, fontWeight: `bold` 
    }
});

export default HistoryStyles;