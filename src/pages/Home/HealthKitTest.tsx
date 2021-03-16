import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions, HealthInputOptions, HealthUnit } from 'react-native-health';

type Props = {
    navigation: any;
};

const permissions = {
    permissions: {
        read: [
            AppleHealthKit.Constants.Permissions.SleepAnalysis,
            AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
            AppleHealthKit.Constants.Permissions.Weight
        ],
        write: [
            AppleHealthKit.Constants.Permissions.Steps,
        ],
    }
} as HealthKitPermissions

AppleHealthKit.initHealthKit(permissions, (error: string) => {
    if (error) {
        console.log('[ERROR] Cannot grant permissions!')
    }
});

export default function HealthKitTest(props: Props) {
    const options: any = { startDate: (new Date(2020, 1, 1)).toISOString() }
    const [sleep, setSleep] = useState<HealthValue>();
    const [sleepLoaded, setSleepLoaded] = useState<boolean>(false);
    const [weight, setWeight] = useState<HealthValue | string>();
    const [weightLoaded, setWeightLoaded] = useState<boolean>(false);
    const [energyBurned, setEnergyBurned] = useState<HealthValue[]>();
    const [energyLoaded, setEnergyLoaded] = useState<boolean>(false);

    // TODO: add undefined values if there is no data entered.
    useEffect(() => {
        AppleHealthKit.getSleepSamples(options, (err: string, results: HealthValue) => {
            try {
                console.log(results);
                setSleep(results);
                setSleepLoaded(true);
            } catch {
                console.error(err);
            }
        });
        AppleHealthKit.getActiveEnergyBurned(options, (err: string, results: HealthValue[]) => {
            try {
                console.log(results);
                setEnergyBurned(results);
                setEnergyLoaded(true);
            } catch {
                console.error(err);
            }
        });
        AppleHealthKit.getLatestWeight(options, (err: string, results: HealthValue) => {
            try {
                console.log(results);
                if (results !== undefined){

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
        <View>
            {sleepLoaded &&
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Sleep JSON data:</Text>
                    <Text>{JSON.stringify(sleep).toString()}</Text>
                </View>
            }
            {energyLoaded &&
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Energy Burned JSON data:</Text>
                    <Text>{JSON.stringify(energyBurned).toString()}</Text>
                </View>
            }
            {weightLoaded &&
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Weight JSON data:</Text>
                    <Text>{JSON.stringify(weight).toString()}</Text>
                </View>
            }
        </View>
    )
}