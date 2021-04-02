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

export enum HomeOptions {
    Home="Home",
    LogSeizure="LogSeizure",
    RecordMedication="RecordMedication",
    DailySurvey="DailySurvey",
    SurveyHistory="SurveyHistory",
    HealthKitTest="HealthKitTest",
    AddDosageUnit="AddDosageUnit",
    AddLocation="AddLocation",
    AddMedication="AddMedication",
    PersonalSurveys="PersonalSurveys",
    AddEditSurvey="AddEditSurvey",
}