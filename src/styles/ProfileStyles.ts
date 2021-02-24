
import { StyleSheet } from "react-native";

const ProfileStyles = StyleSheet.create({
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
