import { StyleSheet } from "react-native";

const RadioButtonStyles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection: "row",
        alignItems:  "center",
    },
    button:{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
    },
    selected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    }
});

export default RadioButtonStyles;
