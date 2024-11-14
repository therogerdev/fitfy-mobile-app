import { Class } from "@/types";
import { format } from "date-fns";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";

const ClassCard = ({ classItem }: { classItem: Class }) => {
  const isAthleteEnrolled = true;
  return (
    <TouchableOpacity
      onPress={() => router.push(`/class/${classItem.id}`)}
      className="flex-row items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg"
    >
      {/* Avatar and Details */}
      <View className="flex-row items-center flex-1">
        <TouchableOpacity onPress={() => alert("modal profile pic")}>
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
                backgroundColor: "#d2d2d2",
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
      {!isAthleteEnrolled ? (
        <TouchableOpacity
          style={styles.enrolledButton}
          onPress={() => alert("Book class")}
          disabled
        >
          <Text style={styles.buttonTextEnrolled}>Enrolled</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.enrollButton}
          onPress={() => alert("Enroll in class")}
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
    backgroundColor: "#b2b2b2", // Light green background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  enrollButton: {
    backgroundColor: "#D1FAE5", // Light green background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#065F46", // Dark green text
    fontWeight: "bold",
  },
  buttonTextEnrolled: {
    color: "#585858", // Dark green text
    fontWeight: "bold",
  },
});

export default ClassCard;
