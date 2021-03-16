import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const LoginStyles = StyleSheet.create({
    mainContainer:{
        backgroundColor: COLORS.darkBlue,
        height:Dimensions.get('window').height,
        padding: 40,
    },
    input: {
        marginBottom: 40,
        padding: 10,
        backgroundColor: "#FFFFFF",
        fontSize: 30,
        borderRadius: 8,
    },
});

export default LoginStyles;
