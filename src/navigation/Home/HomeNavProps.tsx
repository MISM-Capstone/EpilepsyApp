import { TabOptions } from "../../components/TabOptions";

type TabProps = {
    tab: TabOptions.home;
    id?: number;
};
interface EditLogProps extends TabProps {
    date?: Date;
}
interface TakeSurveyLogProps extends EditLogProps {
    surveyId?: number;
}


export type HomeStackParamList = {
    Home: TabProps;
    LogSeizure: EditLogProps;
    RecordMedication: EditLogProps;
    TakeSurvey: TakeSurveyLogProps;
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
    TakeSurvey="TakeSurvey",
    SurveyHistory="SurveyHistory",
    HealthKitTest="HealthKitTest",
    AddDosageUnit="AddDosageUnit",
    AddLocation="AddLocation",
    AddMedication="AddMedication",
    PersonalSurveys="PersonalSurveys",
    AddEditSurvey="AddEditSurvey",
}