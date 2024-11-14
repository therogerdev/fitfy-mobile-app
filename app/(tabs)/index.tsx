import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const primaryBackground = Colors[colorScheme ?? "light"].primaryBackground;

  return (
    <SafeAreaView
      style={{
        backgroundColor: primaryBackground,
      }}
      className="flex-1 "
    >
      <View className="px-4 pt-4">
        {/* Header Section */}
        <View className="flex-row justify-between mx-2">
          <Link href={"/class"}>
            <View className="flex-row items-center px-2 py-4 mb-6 bg-white border border-gray-500 rounded-xl">
              <View className="p-3 bg-gray-200 rounded-full">
                <Ionicons name="location-outline" size={24} color="black" />
              </View>
              <View className="ml-3">
                <Text className="text-2xl font-bold text-black">Classes</Text>
                <Text className="text-sm text-gray-500">Manage classes</Text>
              </View>
            </View>
          </Link>
        </View>
        {/* Today's Classes Section */}
        <Text className="mb-4 text-xl font-bold text-black">
          Today's Classes
        </Text>
        <ScrollView className="flex-1">
          <View className="p-4 mb-4 bg-gray-100 rounded-lg">
            <Text className="text-lg font-bold text-black">Crossfit</Text>
            <Text className="text-sm text-gray-700">09:00 AM</Text>
            <Text className="text-sm text-gray-700">John Doe</Text>
          </View>
          {/* Repeat similar View components for each class */}
        </ScrollView>

        {/* Bottom Navigation */}
      </View>
    </SafeAreaView>
  );
}
