import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchLogs, fetchPlans, fetchExerciseGroupsByPlan, fetchExercises } from "../../api/reqs";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { H1, H2, H3, P, Small } from "@/components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryScreen() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const [plans, setPlans] = useState([]);
  const [exerciseGroups, setExerciseGroups] = useState([]);
  const [exercises, setExercises] = useState([]);

  // Filter states
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedPlan, selectedGroup, selectedExercise, searchTerm]);

  const loadData = async () => {
    setLoading(true);
    try {
      const plansData = await fetchPlans();
      setPlans(plansData || []);

      const groupsData = await Promise.all(
        (plansData || []).map((plan) => fetchExerciseGroupsByPlan(plan.id))
      );
      setExerciseGroups(groupsData.flat() || []);

      const exercisesData = await fetchExercises();
      setExercises(exercisesData || []);

      const logsData = await fetchLogs();
      setLogs(logsData || []);
      setAllLogs(logsData || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allLogs];
    if (selectedPlan) filtered = filtered.filter(log => log.plan?.id === selectedPlan.id);
    if (selectedGroup) filtered = filtered.filter(log => log.routine?.id === selectedGroup.id);
    if (selectedExercise) filtered = filtered.filter(log => log.exercise_id === selectedExercise.id);
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(log => log.exercise?.name?.toLowerCase().includes(lower));
    }
    setLogs(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }) + " • " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderLogItem = ({ item }) => (
    <Card variant="elevated" className="mb-4">
      <View className="flex-row justify-between mb-2">
        <H3 className="text-base">{item.exercise?.name || "Exercise"}</H3>
        <Small>{formatDate(item.created_at)}</Small>
      </View>
      <View className="flex-row items-center mb-3">
        <Ionicons name="calendar-outline" size={14} color="#a1a1aa" />
        <Small className="ml-1">{item.plan?.name || "No Plan"} • {item.routine?.name || "No Group"}</Small>
      </View>

      <View className="flex-row bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3 justify-around">
        <View className="items-center">
          <H3 className="text-brand-500">{item.metrics.sets || "-"}</H3>
          <Small className="text-[10px] uppercase font-bold">Sets</Small>
        </View>
        <View className="items-center">
          <H3 className="text-brand-500">{item.metrics.reps || "-"}</H3>
          <Small className="text-[10px] uppercase font-bold">Reps</Small>
        </View>
        <View className="items-center">
          <H3 className="text-brand-500">{item.metrics.weight ? `${item.metrics.weight}kg` : "-"}</H3>
          <Small className="text-[10px] uppercase font-bold">Weight</Small>
        </View>
      </View>

      {item.metrics.notes && (
        <View className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-700">
          <P className="text-xs italic">"{item.metrics.notes}"</P>
        </View>
      )}
    </Card>
  );

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <View className="px-6 pt-16 pb-6 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <View className="flex-row justify-between items-end mb-4">
          <View>
            <Small className="uppercase tracking-widest mb-1 text-brand-500 font-bold">Archive</Small>
            <H1>History</H1>
          </View>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className={`w-10 h-10 items-center justify-center rounded-xl border ${showFilters ? 'bg-brand-50 border-brand-200' : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'}`}
          >
            <Ionicons name="filter" size={20} color={showFilters ? '#4361ee' : '#71717a'} />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View className="mt-4">
            <Input
              placeholder="Search exercise..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              inputClassName="h-10 py-0"
              containerClassName="mb-3"
            />
            <View className="flex-row space-x-2">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                <FilterChip
                  label="All Plans"
                  active={!selectedPlan}
                  onPress={() => setSelectedPlan(null)}
                />
                {plans.map(p => (
                  <FilterChip
                    key={p.id}
                    label={p.name}
                    active={selectedPlan?.id === p.id}
                    onPress={() => setSelectedPlan(p)}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      </View>

      <View className="flex-1 px-6">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color="#4361ee" />
          </View>
        ) : logs.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <H2 className="text-neutral-400">No logs found</H2>
            <P>Try adjusting your filters</P>
          </View>
        ) : (
          <FlatList
            data={logs}
            renderItem={renderLogItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const FilterChip = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full mr-2 border ${active
      ? 'bg-brand-500 border-brand-500'
      : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
      }`}
  >
    <Text className={`text-xs font-bold ${active ? 'text-white' : 'text-neutral-500'}`}>{label}</Text>
  </TouchableOpacity>
);
