import React from 'react';
import { Text, View } from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions, HealthInputOptions } from 'react-native-health';

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
  
    const options: HealthInputOptions = {
      startDate: (new Date(2020, 1, 1)).toISOString(),
    }
  
    AppleHealthKit.getSleepSamples(undefined, (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
      console.log('SLEEP SAMPLES: ', results);
    });
  });

export default function HealthKitTest(props: Props) {
    return (
        <View>
            <Text>Healthkit Test</Text>
        </View>
    )
}
