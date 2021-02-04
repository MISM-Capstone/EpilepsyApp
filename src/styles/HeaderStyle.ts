import { StackNavigationOptions } from "@react-navigation/stack";

const HeaderStyle:StackNavigationOptions = {
    headerTitleAllowFontScaling: true,
    headerStyle: {
        backgroundColor: 'rgba(46, 77, 158, 0.2)',
        height: 100
    },
    headerTitleStyle: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    headerTitleContainerStyle : {
        height: 85,
        paddingTop: 20
    },
    headerLeftContainerStyle : {
        paddingBottom: 14
    }
  };

export default HeaderStyle;