import { TabOptions } from "../../components/TabOptions";

type TabProps = {
    tab: TabOptions.home;
    id?: number;
};
interface EditLogProps extends TabProps {
    date?: Date;
}


export type HomeStackParamList = {
    Home: TabProps;
    LogSeizure: EditLogProps;
    RecordMedication: EditLogProps;
    DailySurvey: TabProps;
    SurveyHistory: TabProps;
    HealthKitTest: TabProps;
    AddDosageUnit: TabProps;
    AddLocation: TabProps;
    AddMedication: TabProps;
    PersonalSurveys: TabProps;
    AddEditSurvey: TabProps;
};
