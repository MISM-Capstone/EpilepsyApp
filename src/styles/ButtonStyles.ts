import { StyleSheet } from "react-native";

const ButtonStyles = StyleSheet.create({
    surveyButtonContainer:{
        backgroundColor: "#2E4D9E"
    },
    surveyButton:{
        marginRight:10,
        marginLeft:10,
        marginTop:5,
        marginBottom:10,
        paddingTop:25,
        paddingBottom:25,
        backgroundColor:"#FFFFFF",
        borderRadius:10,
        borderWidth: 1,
    },
    surveyButtonText:{
        color:"#000000",
        textAlign:"left",
        paddingLeft : 10,
        paddingRight : 10,
        fontSize: 30,
    }
});

export default ButtonStyles;
