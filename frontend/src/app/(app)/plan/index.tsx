import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    ScrollView,
    ActivityIndicator,
    Modal,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    createExerciseGroup,
    fetchExerciseGroupsByPlan,
    fetchExercisesByGroup,
    fetchAllExercises,
    addExerciseToGroup,
    Exercise,
    fetchPlans
} from "../../../api/reqs";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { H1, H2, H3, P, Small } from "@/components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";

interface Plan {
    id: string;
    name: string;
}

interface ExerciseGroup {
    id: string;
    name: string;
    day_of_week: number;
}

export default function PlanDetailScreen() {
    const params = useLocalSearchParams<{ plan: string }>();
    const [plan, setPlan] = useState<Plan | null>(null)
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<ExerciseGroup[]>([]);
    const [exercises, setExercises] = useState<Record<string, any[]>>({});
    const [allExercises, setAllExercises] = useState<Exercise[]>([]);
    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

    // Dialog states
    const [groupModalVisible, setGroupModalVisible] = useState(false);
    const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
    const [currentDay, setCurrentDay] = useState<number | null>(null);
    const [newGroupName, setNewGroupName] = useState("");
    const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
    const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
    const [exerciseSearch, setExerciseSearch] = useState("");

    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {
        const fetchData = async () => {
            if (params.plan) {
                const plans = await fetchPlans();
                const found = plans.find((p) => p.id === params.plan);
                setPlan(found || null);
            }
        };
        fetchData();
        fetchAvailableExercises();
    }, [params.plan]);

    useEffect(() => {
        if (plan) fetchExerciseGroups();
    }, [plan]);

    const fetchExerciseGroups = async () => {
        setLoading(true);
        try {
            const data = await fetchExerciseGroupsByPlan(plan!.id);
            if (data && Array.isArray(data)) setGroups(data);
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableExercises = async () => {
        try {
            const data = await fetchAllExercises();
            if (data && Array.isArray(data)) setAllExercises(data);
        } catch (error) {
            console.error("Error fetching all exercises:", error);
        }
    };

    const fetchExercisesForGroup = async (groupId: string) => {
        try {
            const data = await fetchExercisesByGroup(groupId);
            if (data) setExercises(prev => ({ ...prev, [groupId]: data.exercises }));
        } catch (error) {
            console.error("Error fetching exercises for group:", error);
        }
    };

    const handleAddGroup = async () => {
        if (currentDay === null || !newGroupName.trim() || !plan) return;
        try {
            const newGroup = await createExerciseGroup(plan.id, currentDay, newGroupName);
            setGroups((prev) => [...prev, newGroup]);
            setNewGroupName("");
            setGroupModalVisible(false);
        } catch (error) {
            console.error("Error creating group:", error);
        }
    };

    const handleAddExerciseToGroup = async () => {
        if (!currentGroupId || !selectedExerciseId) return;
        try {
            const result = await addExerciseToGroup(currentGroupId, selectedExerciseId);
            setExercises(prev => ({
                ...prev,
                [currentGroupId]: [...(prev[currentGroupId] || []), result.exercise],
            }));
            setExerciseModalVisible(false);
            setSelectedExerciseId(null);
        } catch (error) {
            console.error("Error adding exercise:", error);
        }
    };

    const toggleGroup = (groupId: string) => {
        if (expandedGroup === groupId) {
            setExpandedGroup(null);
        } else {
            setExpandedGroup(groupId);
            if (!exercises[groupId]) fetchExercisesForGroup(groupId);
        }
    };

    return (
        <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
            <View className="px-6 pt-16 pb-6 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                <View className="flex-row items-center mb-2">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="#71717a" />
                    </TouchableOpacity>
                    <Small className="uppercase tracking-widest text-brand-500 font-bold">Plan Details</Small>
                </View>
                <H1>{plan?.name || "Loading..."}</H1>
            </View>

            <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}>
                {weekdays.map((dayName, dayIndex) => {
                    const dayGroups = groups.filter(g => g.day_of_week === dayIndex);
                    return (
                        <View key={dayIndex} className="mb-8">
                            <View className="flex-row justify-between items-center mb-4">
                                <H2 className="text-xl">{dayName}</H2>
                                <TouchableOpacity
                                    onPress={() => { setCurrentDay(dayIndex); setGroupModalVisible(true); }}
                                    className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full"
                                >
                                    <Ionicons name="add" size={20} color="#71717a" />
                                </TouchableOpacity>
                            </View>

                            {dayGroups.length === 0 ? (
                                <View className="p-4 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 items-center">
                                    <Small className="italic">No routines scheduled</Small>
                                </View>
                            ) : (
                                dayGroups.map(group => (
                                    <Card key={group.id} variant="outline" className="mb-3 overflow-hidden p-0">
                                        <TouchableOpacity
                                            onPress={() => toggleGroup(group.id)}
                                            className="p-4 flex-row justify-between items-center"
                                        >
                                            <View className="flex-row items-center">
                                                <View className="w-8 h-8 rounded-full bg-brand-50 items-center justify-center mr-3">
                                                    <Ionicons name="flash" size={16} color="#4361ee" />
                                                </View>
                                                <H3 className="text-base">{group.name}</H3>
                                            </View>
                                            <Ionicons
                                                name={expandedGroup === group.id ? "chevron-up" : "chevron-down"}
                                                size={18} color="#a1a1aa"
                                            />
                                        </TouchableOpacity>

                                        {expandedGroup === group.id && (
                                            <View className="px-4 pb-4 border-t border-neutral-50 dark:border-neutral-800 pt-4">
                                                {exercises[group.id]?.map((ex, i) => (
                                                    <View key={i} className="py-2 flex-row items-center">
                                                        <View className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-3" />
                                                        <P className="text-sm font-medium">{ex.name}</P>
                                                    </View>
                                                )) || <ActivityIndicator size="small" color="#4361ee" />}

                                                <Button
                                                    label="Add Exercise"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="mt-4"
                                                    onPress={() => { setCurrentGroupId(group.id); setExerciseModalVisible(true); }}
                                                />
                                            </View>
                                        )}
                                    </Card>
                                ))
                            )}
                        </View>
                    );
                })}
            </ScrollView>

            {/* Modals */}
            <Modal visible={groupModalVisible} transparent animationType="fade">
                <View className="flex-1 bg-black/50 items-center justify-center px-6">
                    <Card className="w-full max-w-sm">
                        <H2 className="mb-4">New Routine</H2>
                        <P className="mb-6">Add an exercise group for {currentDay !== null ? weekdays[currentDay] : ''}.</P>
                        <Input label="Routine Name" value={newGroupName} onChangeText={setNewGroupName} autoFocus />
                        <View className="flex-row justify-end mt-4">
                            <Button label="Cancel" variant="ghost" onPress={() => setGroupModalVisible(false)} className="mr-2" />
                            <Button label="Create" onPress={handleAddGroup} disabled={!newGroupName.trim()} />
                        </View>
                    </Card>
                </View>
            </Modal>

            <Modal visible={exerciseModalVisible} transparent animationType="slide">
                <View className="flex-1 bg-black/50 justify-end">
                    <Card className="rounded-t-3xl p-8 bg-white dark:bg-neutral-900" style={{ height: '70%', paddingBottom: 40 }}>
                        <View className="flex-row justify-between items-center mb-6">
                            <H2>Add Exercise</H2>
                            <TouchableOpacity onPress={() => setExerciseModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#71717a" />
                            </TouchableOpacity>
                        </View>
                        <Input
                            placeholder="Search library..."
                            value={exerciseSearch}
                            onChangeText={setExerciseSearch}
                        />
                        <ScrollView className="flex-1 mt-4">
                            {allExercises
                                .filter(ex => ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()))
                                .map(ex => (
                                    <TouchableOpacity
                                        key={ex.id}
                                        onPress={() => setSelectedExerciseId(ex.id)}
                                        className={`p-4 rounded-xl mb-2 flex-row justify-between items-center ${selectedExerciseId === ex.id ? 'bg-brand-50 list-brand-500 border border-brand-200' : 'bg-neutral-50 dark:bg-neutral-800'
                                            }`}
                                    >
                                        <P className={selectedExerciseId === ex.id ? 'text-brand-500 font-bold' : ''}>{ex.name}</P>
                                        {selectedExerciseId === ex.id && <Ionicons name="checkmark-circle" size={20} color="#4361ee" />}
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                        <Button label="Add Selected" onPress={handleAddExerciseToGroup} disabled={!selectedExerciseId} className="mt-6" />
                    </Card>
                </View>
            </Modal>
        </View>
    );
}
