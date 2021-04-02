import { TabOptions } from "../../components/TabOptions";

type TabProps = {
    tab: TabOptions.home;
    previousPage?: keyof HomeStackParamList;
};
interface EditLogProps extends TabProps {
    date?: Date;
}
interface AddEditSeizureLog extends EditLogProps {
    seizure_id?: number;
    location_id?: number;
}
interface AddEditMedicationLog extends EditLogProps {
    medication_log_id?: number;
    medication_id?: number;
    dosage_unit_id?: number;
}
interface AddEditMedication extends TabProps {
    medication_id?: number;
    dosage_unit_id?: number;
}
type AddSurveyProps = {
    survey_id?: number;
};

export type EditSurveyProps = {
    survey?: number;
};

export type HomeStackParamList = {
    Home: TabProps;
    LogSeizure: AddEditSeizureLog;
    RecordMedication: AddEditMedicationLog;
    DailySurvey: TabProps;
    SurveyHistory: TabProps;
    HealthKitTest: TabProps;
    AddDosageUnit: TabProps;
    AddLocation: TabProps;
    AddMedication: AddEditMedication;
    PersonalSurveys: TabProps & AddSurveyProps;
    AddEditSurvey: TabProps & EditSurveyProps;
};
