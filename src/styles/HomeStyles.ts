import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

const HomeStyles = StyleSheet.create({
    HomeContainer:{
        backgroundColor: COLORS.darkBlue,
        paddingBottom: 400
    },
    welcomeMessageContainer:{
        marginHorizontal: 12,
        paddingTop: 10
    },
    welcomeMessageText:{
        fontSize: 45, fontWeight: '700', color: '#fff'
    }
});

export default HomeStyles;
