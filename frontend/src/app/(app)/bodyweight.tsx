import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  fetchBodyweightLogs,
  logBodyweight,
} from "../../api/reqs";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { H1, H2, H3, P, Small } from "@/components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [notes, setNotes] = useState("");

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
    setModalVisible(false);
  };

  const handleLogWeight = async () => {
    if (!value) return;
    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue <= 0) return;

    try {
      const newLog = await logBodyweight(
        numericValue,
        unit,
        new Date().toISOString(),
        notes
      );
      setLogs([newLog, ...logs]);
      resetForm();
    } catch (error) {
      console.error("Error logging weight:", error);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const latest = logs[0];

  const renderItem = ({ item }: { item: BodyweightLog }) => (
    <View className="mb-4 pb-4 border-b border-neutral-100 dark:border-neutral-900 flex-row justify-between items-center">
      <View>
        <H3 className="text-base">{item.original_value} {item.original_unit}</H3>
        <Small>{formatDate(item.recorded_at)}</Small>
      </View>
      {item.notes && (
        <View className="bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded-full">
          <Small className="text-[10px] italic">Notes</Small>
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <View className="px-6 pt-16 pb-8 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <Small className="uppercase tracking-widest mb-1 text-brand-500 font-bold">Metrics</Small>
        <H1>Bodyweight</H1>
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}>
        {/* Hero Card with latest weight */}
        <Card variant="elevated" className="mb-8 items-center py-10 bg-brand-500 shadow-xl shadow-brand-500/30">
          <Small className="text-brand-100 uppercase font-bold tracking-widest mb-2">Current Weight</Small>
          {latest ? (
            <>
              <H1 className="text-6xl text-white">{latest.original_value}</H1>
              <H3 className="text-brand-100">{latest.original_unit}</H3>
              <Small className="mt-4 text-brand-200">Logged on {formatDate(latest.recorded_at)}</Small>
            </>
          ) : (
            <H2 className="text-white">No data yet</H2>
          )}
        </Card>

        <Button label="Log New Weight" onPress={() => setModalVisible(true)} className="mb-10" />

        <H2 className="text-xl mb-6">History</H2>

        {loading && logs.length === 0 ? (
          <ActivityIndicator color="#4361ee" />
        ) : logs.length === 0 ? (
          <View className="py-10 items-center">
            <P>No weight history found.</P>
          </View>
        ) : (
          logs.map(log => <View key={log.id}>{renderItem({ item: log })}</View>)
        )}
      </ScrollView>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <Card className="rounded-t-3xl p-8 bg-white dark:bg-neutral-900" style={{ paddingBottom: 40 + bottom }}>
            <View className="flex-row justify-between items-center mb-8">
              <H2>Log Bodyweight</H2>
              <TouchableOpacity onPress={resetForm} className="w-10 h-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <Ionicons name="close" size={20} color="#71717a" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-end space-x-3 mb-6">
              <View className="flex-1">
                <Input
                  label="Value"
                  placeholder="00.0"
                  value={value}
                  onChangeText={setValue}
                  keyboardType="numeric"
                  autoFocus
                />
              </View>
              <View className="flex-row mb-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
                {(["kg", "lb"] as const).map(u => (
                  <TouchableOpacity
                    key={u}
                    onPress={() => setUnit(u)}
                    className={`px-4 py-2 rounded-lg ${unit === u ? 'bg-white dark:bg-neutral-700 shadow-sm' : ''}`}
                  >
                    <Text className={`text-xs font-bold ${unit === u ? 'text-brand-500' : 'text-neutral-500'}`}>{u.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Input label="Notes" placeholder="Optional notes" value={notes} onChangeText={setNotes} multiline />

            <Button label="Save Recording" onPress={handleLogWeight} className="mt-4" />
          </Card>
        </View>
      </Modal>
    </View>
  );
}
