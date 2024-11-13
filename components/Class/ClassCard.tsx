import { Class } from "@/types";
import { format } from "date-fns";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";

const ClassCard = ({ classItem }: { classItem: Class }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/class/${classItem.id}`)}
      className="flex-row bg-gray-100 p-4 rounded-lg mb-4 items-center justify-between"
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
        <View className="items-start text-sm justify-center flex-1">
          <Text className="text-lg font-bold text-black">{classItem.name}</Text>
          <View className="flex-row gap-x-2 items-center">
            <ThemedText type="label">Coach:</ThemedText>
            <ThemedText type="label_description">
              {classItem.coach?.firstName} {classItem.coach?.lastName}
            </ThemedText>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <ThemedText type="label">Spots Available:</ThemedText>
            <ThemedText type="label_description">
              {classItem.capacity &&
                classItem.capacity - classItem.activeEnrollments}
            </ThemedText>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <ThemedText type="label">Time:</ThemedText>
            <ThemedText type="label_description">
              {format(new Date(classItem.date), "p")}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Enroll Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Button pressed")}
      >
        <Text style={styles.buttonText}>Enroll</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#D1FAE5", // Light green background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#065F46", // Dark green text
    fontWeight: "bold",
  },
});

export default ClassCard;
