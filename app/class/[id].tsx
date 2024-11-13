import ParallaxScrollView from "@/components/ParallaxScrollView";
import { apiClient } from "@/config/axios.config";
import { Class, ClientError } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";

const fetchClassDetail = async (id: string): Promise<Class> => {
  const response = await apiClient.get(`/class/${id}`);
  return response.data?.data;
};

const ClassDetail = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const colorScheme = useColorScheme();

  const {
    data: classDetail,
    error,
    isLoading,
  } = useQuery<Class, AxiosError<ClientError>>({
    queryKey: ["classDetail", id],
    queryFn: () => fetchClassDetail(id),
  });

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.response?.data.error}</Text>;

  console.log("ID.....", id);

  console.log(classDetail);

  const iconBackground = Colors[colorScheme ?? "light"].text;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/muaythai.jpg")}
          style={{ width: "100%", height: 290 }}
        />
      }
    >
      <View className="bg-white rounded-t-[2rem] py-3 px-3 -mt-8">
        <ThemedView className="mt-4">
          <ThemedText type="title">{classDetail?.name}</ThemedText>
        </ThemedView>
        <ThemedText className="mt-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
          architecto ab quibusdam exercitationem commodi neque dolorem optio
          non, obcaecati vero placeat sed, temporibus vel possimus facere quos
          soluta ex atque!
        </ThemedText>
        <View className="flex flex-col gap-y-1 my-4">
          <View className=" flex-row items-center  gap-x-2">
            <Ionicons name="people-outline" size={28} color={iconBackground} />
            <ThemedText type="default">{`Available ${classDetail?.activeEnrollments} of ${classDetail?.capacity} spots`}</ThemedText>
          </View>
          <View className=" flex-row items-center  gap-x-2">
            <Ionicons
              name="location-outline"
              size={28}
              color={iconBackground}
            />
            <ThemedText type="default">{`{Location goes here}`}</ThemedText>
          </View>
          <View className=" flex-row items-center  gap-x-2">
            <Ionicons
              name="calendar-outline"
              size={28}
              color={iconBackground}
            />
            <ThemedText type="default">
              {format(new Date(classDetail?.date || ""), "PPPP")}
            </ThemedText>
          </View>
        </View>
        <Collapsible title="File-based routing">
          <ThemedText>
            This app has two screens:{" "}
            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
            and{" "}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/explore.tsx
            </ThemedText>
          </ThemedText>
          <ThemedText>
            The layout file in{" "}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/_layout.tsx
            </ThemedText>{" "}
            sets up the tab navigator.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        <Collapsible title="Android, iOS, and web support">
          <ThemedText>
            You can open this project on Android, iOS, and the web. To open the
            web version, press <ThemedText type="defaultSemiBold">w</ThemedText>{" "}
            in the terminal running this project.
          </ThemedText>
        </Collapsible>
        <Collapsible title="Images">
          <ThemedText>
            For static images, you can use the{" "}
            <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
            <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
            provide files for different screen densities
          </ThemedText>
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={{ alignSelf: "center" }}
          />
          <ExternalLink href="https://reactnative.dev/docs/images">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        <Collapsible title="Custom fonts">
          <ThemedText>
            Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText>{" "}
            to see how to load{" "}
            <ThemedText style={{ fontFamily: "SpaceMono" }}>
              custom fonts such as this one.
            </ThemedText>
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Button pressed")}
        >
          <Text style={styles.buttonText}>Enroll </Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
};

export default ClassDetail;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
