import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';

const permissions = {
    permissions: {
        read: [
            AppleHealthKit.Constants.Permissions.SleepAnalysis,
            AppleHealthKit.Constants.Permissions.AppleExerciseTime,
            AppleHealthKit.Constants.Permissions.Weight
        ],
    }
} as HealthKitPermissions

AppleHealthKit.initHealthKit(permissions, (error: string) => {
    if (error) {
        console.warn('[ERROR] Cannot grant permissions!')
    }
});

export default function HealthKitTest() {
    const options: any = { startDate: (new Date(2021, 1, 1)).toISOString() }
    const [sleep, setSleep] = useState<HealthValue | any>();
    const [sleepLoaded, setSleepLoaded] = useState<boolean>(false);
    const [weight, setWeight] = useState<HealthValue | string | any>();
    const [weightLoaded, setWeightLoaded] = useState<boolean>(false);
    const [exercise, setExercise] = useState<HealthValue[] | any[]>();
    const [exerciseLoaded, setExerciseLoaded] = useState<boolean>(false);

    // TODO: add undefined values if there is no data entered.
    useEffect(() => {
        AppleHealthKit.getSleepSamples(options, (err: string, results: HealthValue) => {
            try {
                setSleep(results);
                setSleepLoaded(true);
            } catch {
                console.error(err);
            }
        });
        AppleHealthKit.getAppleExerciseTime(options, (err: string, results: HealthValue[]) => {
            try {
                setExercise(results);
                setExerciseLoaded(true);
            } catch {
                console.error(err);
            }
        });
        AppleHealthKit.getLatestWeight(options, (err: string, results: HealthValue) => {
            try {
                if (results !== undefined) {

                    setWeight(results);
                } else {
                    setWeight("No weight recorded");
                }
                setWeightLoaded(true);
            } catch {
                console.error(err);
            }
        });
    }, []);

    return (
        <View style={{ padding: 12 }}>
            <Text style={{ fontStyle: 'italic', }}>This data comes from Apple HealthKit. While not currently used by our application, we plan to implement this data in future versions of the app.</Text>
            <Text style={{ fontStyle: 'italic', }}>The range for this data is the past year.</Text>
            {sleepLoaded &&
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Sleep data:</Text>
                    {sleep.length > 0 ?
                        // <Text>{JSON.stringify(sleep)}</Text>
                        sleep.map(function (sleepEvent: any) {
                            return (
                            <View style={{padding: 6, backgroundColor: 'lightgray', margin: 6}}>
                                <Text>Start Date: {sleepEvent.startDate}</Text>
                                <Text>End Date: {sleepEvent.startDate}</Text>
                                <Text>Status: {sleepEvent.value}</Text>
                            </View>
                            )
                        })
                    :
                        <Text>No sleep data recorded.</Text>
                    }
                    
                </View>
            }
            {exerciseLoaded &&
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Energy Burned data:</Text>
                    {exercise!.length > 0 ?
                        <Text>{JSON.stringify(exercise).toString()}</Text>
                        :
                        <Text>No exercise data recorded.</Text>
                    }

                </View>
            }
            {weightLoaded &&
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Weight data:</Text>
                    {weight ?
                        <Text>User's weight: {weight.value} lbs.</Text>
                        :
                        <Text>No user weight recorded.</Text>
                    }

                </View>
            }
        </View>
    )
}