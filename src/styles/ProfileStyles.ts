
import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const ProfileStyles = StyleSheet.create({
    ProfileContainer:{
        backgroundColor: COLORS.darkBlue,
        height:Dimensions.get('window').height,
        padding: 30,
    },
    
    customDateOptions: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    dateWithLabel: {
        paddingLeft: 10,
        paddingRight: 5,
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    dateLabel: {
        marginRight: 15,
    },
    date: {
        flex: 1,
    }
});

export default ProfileStyles;
