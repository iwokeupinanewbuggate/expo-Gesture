import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";
import { Permission } from "react-native-health-connect/lib/typescript/types";
import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";

const useHealthData = () => {
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);
  const [androidPermissions, setAndroidPermissions] = useState<Permission[]>(
    []
  );
  const hasAndroidPermission = (recordType: string) => {
    return androidPermissions.some((perm) => perm.recordType === recordType);
  };

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    const init = async () => {
      // initialize the client
      const isInitialized = await initialize();
      if (!isInitialized) {
        console.log("Failed to initialize Health Connect");
        return;
      }

      // request permissions
      const grantedPermissions = await requestPermission([
        { accessType: "read", recordType: "Steps" },
        { accessType: "read", recordType: "Distance" },
        { accessType: "read", recordType: "FloorsClimbed" },
      ]);

      setAndroidPermissions(grantedPermissions);
    };

    init();
  }, []);

  useEffect(() => {
    if (!hasAndroidPermission("Steps")) {
      return;
    }
    const getHealthData = async () => {
      const today = new Date();
      const timeRangeFilter: TimeRangeFilter = {
        operator: "between",
        startTime: new Date(today.getTime() - 86400000).toISOString(),
        endTime: today.toISOString(),
      };

      // Steps
      const steps = await readRecords("Steps", { timeRangeFilter });
      const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
      setSteps(totalSteps);
    };

    getHealthData();
  }, [androidPermissions]);

  return { steps, flights, distance };
};

export default useHealthData;
