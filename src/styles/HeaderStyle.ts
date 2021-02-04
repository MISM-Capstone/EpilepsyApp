import { StackNavigationOptions } from "@react-navigation/stack";

const HeaderStyle:StackNavigationOptions = {
    headerTitleAllowFontScaling: true,
    headerStyle: {
        backgroundColor: 'rgba(46, 77, 158, 0.2)',
        height: 100
    },
    headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    headerTitleContainerStyle : {
        height: 100,
        paddingTop: 20
    },
    headerLeftContainerStyle : {
        paddingBottom: 15
    }
  };

export default HeaderStyle;