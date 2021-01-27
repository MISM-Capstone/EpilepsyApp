import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    titleText:{
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(46, 77, 158, 0.2)"
    },
    surveyButtonContainer:{
        backgroundColor: "#2E4D9E",
        paddingTop: 40,
        paddingBottom: 40,
        minHeight: 770
    },
    surveyButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:30,
        marginBottom: 30,
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:"#FFFFFF",
        borderRadius:10,
        borderWidth: 1,
    },
    surveyButtonText:{
        color:"#000000",
        textAlign:"center",
        paddingLeft : 10,
        paddingRight : 10,
        fontSize: 30,
    }
});

export default styles;
