import { addDays, format } from "date-fns";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const generateDates = (days: number) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
      const date = addDays(new Date(), i);
      dates.push({
        fullDate: date,
        day: format(date, "EEE"),
        month: format(date, "MMM"),
        dateNumber: format(date, "d"),
      });
    }
    return dates;
  };
  
  const DateSelector = ({
    onDateSelect,
  }: {
    onDateSelect: (date: Date) => void;
  }) => {
    const dates = generateDates(14);
  
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mb-6 pt-10"
      >
        {dates.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onDateSelect(item.fullDate)}
          >
            <View className="w-20 px-4 py-2 bg-gray-200 rounded-full mr-2 items-center">
              <Text className="text-xs font-bold text-black">{item.month}</Text>
              <Text className="text-lg font-bold text-black">
                {item.dateNumber}
              </Text>
              <Text className="text-xs text-black">{item.day}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };


  export default DateSelector