import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/config/axios.config";
import {
  ClassEnrollment,
  ClassEnrollmentResponse,
  ClassEnrollmentStatus,
  ClientError,
} from "@/types";
import { EndpointType } from "@/types/api";

const useEnrollMutation = (classId: string) => {
  const queryClient = useQueryClient();
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(
    null
  );

  const enrollMutation = useMutation<
    ClassEnrollment[],
    AxiosError<ClientError>,
    string
  >({
    mutationFn: async (athleteId) => {
      const response = await apiClient.post<ClassEnrollmentResponse>(
        `${EndpointType.Enroll}/${classId}/enroll`,
        { athleteId }
      );
      return Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
      queryClient.invalidateQueries({ queryKey: ["class-detail", classId] });

      data.forEach((enrollment) => {
        const message =
          enrollment.status === ClassEnrollmentStatus.WAITLISTED
            ? `${enrollment.athlete.firstName} ${enrollment.athlete.lastName} has been added to the waitlist`
            : `${enrollment.athlete.firstName} ${enrollment.athlete.lastName} has been enrolled successfully`;

        Alert.alert(
          enrollment.status === ClassEnrollmentStatus.WAITLISTED
            ? "WAITLIST!"
            : "Enrolled!",
          message
        );
      });

      setSelectedAthleteId(null);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred";

      Alert.alert("Enrollment Error", errorMessage);
    },
  });

  return { enrollMutation, selectedAthleteId, setSelectedAthleteId };
};

export default useEnrollMutation;
