import { DateObject } from 'react-native-calendars';
import { TabOptions } from "../../components/TabOptions";

type TabProps = {
    tab: TabOptions.trends;
    previousPage?: keyof TrendsStackParamList;
};
interface DateHistoryProps extends TabProps {
    date: DateObject;
}
interface EditSeizureLogProps extends TabProps {
    seizure_id: number;
}

export type TrendsStackParamList = {
    Trends: TabProps;
    DateHistory: DateHistoryProps;
    Charts: TabProps;
    UpdateSeizureLog: EditSeizureLogProps;
};

export enum TrendOptions {
    Trends="Trends",
    DateHistory="DateHistory",
    Chart="Charts",
    UpdateSeizureLog="UpdateSeizureLog"
}