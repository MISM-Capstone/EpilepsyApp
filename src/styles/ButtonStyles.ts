import { StyleSheet } from "react-native";

const ButtonStyles = StyleSheet.create({
    surveyButtonContainer:{
        backgroundColor: "#2E4D9E",
        paddingTop: 40,
        paddingBottom: 40
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

export default ButtonStyles;
