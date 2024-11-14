import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { format } from "date-fns";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { Class } from "@/types";
import useEnrollMutation from "@/hooks/useEnrollMutation"; // Assuming this hook is in the hooks folder

const ClassCard = ({ classItem }: { classItem: Class }) => {
  const athleteId = "9b288f28-1970-4706-b375-c673d190b363"; // Hardcoded athlete ID
  // Check if athlete is already enrolled in the class
  const { enrollMutation } = useEnrollMutation(classItem.id);

  // TODO: Update as needed to check athlete's enrollment status
  const isAthleteEnrolled = classItem.enrollments?.some(
    (enrollment) => enrollment.athlete.id === athleteId
  );

  console.log("classItem", classItem.enrollments);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/class/${classItem.id}`)}
      className="flex-row items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg"
    >
      {/* Avatar and Details */}
      <View className="flex-row items-center flex-1">
        <TouchableOpacity onPress={() => Alert.alert("Profile Picture")}>
          <Image
            source={{
              uri:
                classItem.coach?.profileImageUrl ||
                require("@/assets/images/muaythai.jpg"),
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View className="items-start justify-center flex-1 text-sm">
          <Text className="text-lg font-bold text-black">{classItem.name}</Text>
          <View className="flex-row items-center gap-x-2">
            <ThemedText type="label">Coach:</ThemedText>
            <ThemedText type="label_description">
              {classItem.coach?.firstName} {classItem.coach?.lastName}
            </ThemedText>
          </View>
          <View className="flex-row items-center gap-x-2">
            <View
              className="flex-row items-center gap-x-2"
              style={{
                backgroundColor: "#D1FAE5",
                paddingHorizontal: 4,
                borderRadius: 10,
              }}
            >
              <Ionicons name="calendar-outline" size={15} />
              <ThemedText type="label">Spots:</ThemedText>
              <ThemedText type="label_description">
                {classItem.capacity &&
                  classItem.capacity - classItem.activeEnrollments}
              </ThemedText>
            </View>
            <View
              className="flex-row items-center p-1 gap-x-2"
              style={{
                backgroundColor: styles.enrolledButton.backgroundColor,
                paddingHorizontal: 4,
                borderRadius: 10,
              }}
            >
              <Ionicons name="time-outline" size={15} />
              <ThemedText type="label_description">
                {format(new Date(classItem.date), "p")}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Enroll Button */}
      {isAthleteEnrolled ? (
        <TouchableOpacity style={styles.enrolledButton} disabled>
          <Text style={styles.buttonTextEnrolled}>Enrolled</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.enrollButton}
          onPress={() =>
            enrollMutation.mutate(athleteId, {
              onSuccess: () =>
                Alert.alert(
                  "Enrollment Success",
                  "You have been enrolled successfully"
                ),
              onError: (error) =>
                Alert.alert(
                  "Enrollment Error",
                  error.message || "Error occurred during enrollment"
                ),
            })
          }
        >
          <Text style={styles.buttonText}>Enroll</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  enrolledButton: {
    backgroundColor: "#d2d2d2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  enrollButton: {
    backgroundColor: "#D1FAE5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#065F46",
    fontWeight: "bold",
  },
  buttonTextEnrolled: {
    color: "#585858",
    fontWeight: "bold",
  },
});

export default ClassCard;
