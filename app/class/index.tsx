import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import {
  addDays,
  endOfDay,
  endOfToday,
  format,
  isSameDay,
  startOfDay,
  startOfToday,
} from "date-fns";

import "nativewind";
import { apiClient } from "@/config/axios.config";
import { Class, ClassResponse } from "@/types";
import { useNavigation, router, Link } from "expo-router";
import ClassCard from "@/components/Class/ClassCard";
import DateSelector from "@/components/Class/ClassDateSelector";
import ClassesScreenSkeleton from "./ClassCardLoading";

// Fetch classes from the API
// Fetch classes based on selected date
const fetchClasses = async (
  startDate: string,
  endDate: string
): Promise<ClassResponse> => {
  const response = await apiClient.get(
    `/class/list?startTime=${startDate}&endTime=${endDate}`
  );
  return response.data;
};

export default function ClassesScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const startDate = startOfDay(selectedDate).toISOString();
  const endDate = endOfDay(selectedDate).toISOString();
  const {
    data: classList,
    error,
    isLoading,
  } = useQuery<ClassResponse>({
    queryKey: ["classList", startDate, endDate],
    queryFn: () => fetchClasses(startDate, endDate),
    refetchOnWindowFocus: true,
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const sortedClasses = classList?.data
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (isLoading) return <ClassesScreenSkeleton />;
  if (error instanceof Error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <DateSelector onDateSelect={handleDateSelect} />
      <Text className="text-2xl font-bold text-black mb-4">
        Classes Available
      </Text>
      {sortedClasses && sortedClasses.length > 0 ? (
        sortedClasses.map((classItem) => (
          <ClassCard key={classItem.id} classItem={classItem} />
        ))
      ) : (
        <Text className="text-gray-500">
          No classes available for the selected date.
        </Text>
      )}
    </ScrollView>
  );
}
