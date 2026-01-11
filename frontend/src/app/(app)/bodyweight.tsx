import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  fetchBodyweightLogs,
  logBodyweight,
} from "../../api/reqs";
import { WebDateTimeInput } from "../components/web-datetime-input";

const DateTimePicker =
  Platform.OS !== "web"
    ? require("@react-native-community/datetimepicker").default
    : null;

interface BodyweightLog {
  id: string;
  weight_kg: number;
  original_value: number;
  original_unit: "kg" | "lb";
  notes: string | null;
  recorded_at: string;
}

export default function BodyweightScreen() {
  const { top, bottom } = useSafeAreaInsets();

  const [logs, setLogs] = useState<BodyweightLog[]>([]);
  const [loading, setLoading] = useState(false);

  // modal state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [notes, setNotes] = useState("");
  const [recordedAt, setRecordedAt] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [webDateInput, setWebDateInput] = useState(
    recordedAt.toISOString().replace("T", " ").slice(0, 16)
  );

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await fetchBodyweightLogs();
      if (Array.isArray(data)) {
        setLogs(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setValue("");
    setUnit("kg");
    setNotes("");
    setRecordedAt(new Date());
    setDialogVisible(false);
  };

  const handleLogWeight = async () => {
    if (!value) return;

    const numericValue = Number(value);
    if (Number.isNaN(numericValue) || numericValue <= 0) return;

    const newLog = await logBodyweight(
      numericValue,
      unit,
      recordedAt.toISOString(),
      notes
    );

    setLogs([newLog, ...logs]);
    resetForm();
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      setWebDateInput(
        recordedAt.toISOString().replace("T", " ").slice(0, 16)
      );
    }
  }, [recordedAt]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const latest = logs[0];

  const renderItem = ({ item }: { item: BodyweightLog }) => (
    <View className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <Text className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
        {item.original_value} {item.original_unit}
      </Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {formatDate(item.recorded_at)}
      </Text>
      {item.notes && (
        <View className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
          <Text className="text-sm text-gray-700 dark:text-gray-300">
            {item.notes}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white dark:bg-gray-900"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      {/* Header */}
      <View className="items-center justify-center py-6">
        <Text className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">
          Trena
        </Text>
        <Text className="mt-2 text-gray-600 dark:text-gray-400">
          Bodyweight
        </Text>
      </View>

      {/* Current weight */}
      {latest && (
        <View className="items-center mb-6">
          <Text className="text-5xl font-bold text-gray-900 dark:text-white">
            {latest.original_value} {latest.original_unit}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Last recorded {formatDate(latest.recorded_at)}
          </Text>
        </View>
      )}

      {/* Log button */}
      <View className="px-6 mb-6">
        <TouchableOpacity
          className="py-3 bg-emerald-600 dark:bg-emerald-500 rounded-md items-center"
          onPress={() => setDialogVisible(true)}
        >
          <Text className="text-white font-medium">Log Weight</Text>
        </TouchableOpacity>
      </View>

      {/* History */}
      <View className="flex-1 px-4">
        <FlatList
          data={logs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>

      {/* Modal */}
      <Modal transparent visible={dialogVisible} animationType="fade">
        <View className="absolute inset-0 bg-black bg-opacity-50 items-center justify-center px-6">
          <View className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-sm p-6">
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Log Bodyweight
            </Text>

            {/* value */}
            <TextInput
              className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white mb-3"
              placeholder="Weight"
              keyboardType="numeric"
              value={value}
              onChangeText={setValue}
            />

            {/* unit toggle */}
            <View className="flex-row mb-3">
              {(["kg", "lb"] as const).map(u => (
                <TouchableOpacity
                  key={u}
                  className={`flex-1 py-2 items-center rounded-md ${
                    unit === u
                      ? "bg-emerald-600 dark:bg-emerald-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                  onPress={() => setUnit(u)}
                >
                  <Text
                    className={`font-medium ${
                      unit === u ? "text-white" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {u.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* date */}
            <TouchableOpacity
              className="mb-3"
              onPress={() => {
                if (Platform.OS === "web") return;
                setShowDatePicker(true);
              }}
            >
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                {recordedAt.toLocaleString()}
              </Text>
            </TouchableOpacity>

            {/* date */}
            {Platform.OS === "web" ? (
              <WebDateTimeInput
                value={webDateInput}
                onChange={(v) => {
                  setWebDateInput(v);
                  const parsed = new Date(v);
                  if (!isNaN(parsed.getTime())) {
                    setRecordedAt(parsed);
                  }
                }}
              />
            ) : (
              <>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text>{recordedAt.toLocaleString()}</Text>
                </TouchableOpacity>

                {showDatePicker && DateTimePicker && (
                  <DateTimePicker
                    value={recordedAt}
                    mode="datetime"
                    onChange={(_, d) => {
                      setShowDatePicker(false);
                      if (d) setRecordedAt(d);
                    }}
                  />
                )}
              </>
            )}

            {/* notes */}
            <TextInput
              className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white mb-4"
              placeholder="Notes (optional)"
              value={notes}
              onChangeText={setNotes}
              multiline
            />

            <View className="flex-row justify-end">
              <TouchableOpacity className="px-4 py-2" onPress={resetForm}>
                <Text className="text-gray-600 dark:text-gray-400">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-4 py-2 bg-emerald-600 dark:bg-emerald-500 rounded-md"
                onPress={handleLogWeight}
              >
                <Text className="text-white font-medium">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Back */}
      <View className="mb-4 items-center">
        <Link href="/" className="text-gray-500 dark:text-gray-400">
          Back to Home
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
