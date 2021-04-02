import { DateObject } from 'react-native-calendars';
import { TabOptions } from "../../components/TabOptions";

type TabProps = {
    tab: TabOptions.trends;
    id?:number;
};
interface DateHistoryProps extends TabProps {
    date: DateObject;
}

export type TrendsStackParamList = {
    Trends: TabProps;
    DateHistory: DateHistoryProps;
    Charts: TabProps;
    UpdateSeizureLog: TabProps;
};

export enum TrendOptions {
    Trends="Trends",
    DateHistory="DateHistory",
    Chart="Charts",
    UpdateSeizureLog="UpdateSeizureLog"
}