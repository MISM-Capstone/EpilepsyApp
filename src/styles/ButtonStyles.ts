import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

const ButtonStyles = StyleSheet.create({
    navigationButtonContainer:{
        backgroundColor: COLORS.darkBlue
    },
    navigationButton:{
        marginRight:10,
        marginLeft:10,
        marginTop:10,
        marginBottom:10,
        paddingTop:25,
        paddingBottom:25,
        backgroundColor:"#FFFFFF",
        borderRadius:10,
        borderWidth: 1,
        shadowColor: '#192e63',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    navigationButtonText:{
        color:"#000000",
        textAlign:"left",
        paddingLeft : 10,
        paddingRight : 10,
        fontSize: 28,
    },
    navigationButtonRow:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 20
    },
    largeButton:{
        marginRight:30,
        marginLeft:30,
        marginTop:20,
        marginBottom:10,
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:"#FFFFFF",
        borderRadius:10,
        borderWidth: 1,
    },
    largeButtonText:{
        color:"#000000",
        textAlign:"center",
        paddingLeft : 10,
        paddingRight : 10,
        fontSize: 25,
    }
});

export default ButtonStyles;
