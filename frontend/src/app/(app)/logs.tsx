import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Modal,
    TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchPlans, fetchExerciseGroupsByPlan, fetchExercisesByGroup, logExercise, fetchRecentLogs } from "../../api/reqs";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { H1, H2, H3, P, Small } from "@/components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Plan {
    id: string;
    name: string;
}

interface ExerciseGroup {
    id: string;
    name: string;
    day_of_week: number;
}

interface Exercise {
    id: string;
    name: string;
    description?: string;
}

export default function LogsScreen() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [exerciseGroups, setExerciseGroups] = useState<ExerciseGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<ExerciseGroup | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Step-based UI state
    const [step, setStep] = useState(1);

    // Log form state
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [logModalVisible, setLogModalVisible] = useState(false);
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [notes, setNotes] = useState('');

    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {
        handleFetchPlans();
        fetchRecentLogsData();
    }, []);

    useEffect(() => {
        if (selectedPlan) {
            fetchGroups();
            setStep(2);
        }
    }, [selectedPlan]);

    useEffect(() => {
        if (selectedGroup) {
            fetchExercises();
            setStep(3);
        }
    }, [selectedGroup]);

    const handleFetchPlans = async () => {
        setLoading(true);
        try {
            const data = await fetchPlans();
            if (data && Array.isArray(data)) setPlans(data);
        } catch (error) {
            console.error("Error fetching plans:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGroups = async () => {
        if (!selectedPlan) return;
        setLoading(true);
        try {
            const data = await fetchExerciseGroupsByPlan(selectedPlan.id);
            if (data && Array.isArray(data)) setExerciseGroups(data);
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExercises = async () => {
        if (!selectedGroup) return;
        setLoading(true);
        try {
            const data = await fetchExercisesByGroup(selectedGroup.id);
            if (data && data.exercises) setExercises(data.exercises);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentLogsData = async () => {
        try {
            const data = await fetchRecentLogs(5);
            if (data && Array.isArray(data)) setLogs(data);
        } catch (error) {
            console.error("Error fetching recent logs:", error);
        }
    };

    const handleLogExercise = async () => {
        if (!selectedExercise || !selectedGroup || !sets || !reps) return;
        try {
            const newLog = await logExercise(selectedExercise.id, selectedGroup.id, sets, reps, weight || null, notes);
            setLogs([newLog, ...logs.slice(0, 4)]);
            resetForm();
            fetchRecentLogsData();
        } catch (error) {
            console.error("Error logging exercise:", error);
        }
    };

    const resetForm = () => {
        setSets('');
        setReps('');
        setWeight('');
        setNotes('');
        setLogModalVisible(false);
        setSelectedExercise(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • ' + date.toLocaleDateString();
    };

    return (
        <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 64, paddingBottom: 100 }}>
                <View className="px-6 mb-8">
                    <Small className="uppercase tracking-widest mb-1 text-brand-500 font-bold">Progress</Small>
                    <H1>Log Session</H1>
                </View>

                {/* Step indicators */}
                <View className="flex-row px-6 mb-8 items-center space-x-2">
                    {[1, 2, 3].map((s) => (
                        <View key={s} className="flex-row items-center">
                            <View
                                className={`w-8 h-8 rounded-full items-center justify-center ${step >= s ? 'bg-brand-500' : 'bg-neutral-200 dark:bg-neutral-800'
                                    }`}
                            >
                                <Text className={`font-bold ${step >= s ? 'text-white' : 'text-neutral-500'}`}>{s}</Text>
                            </View>
                            {s < 3 && <View className={`w-8 h-0.5 ${step > s ? 'bg-brand-500' : 'bg-neutral-200 dark:bg-neutral-800'}`} />}
                        </View>
                    ))}
                </View>

                {/* Main Flow */}
                <View className="px-6">
                    {step === 1 && (
                        <View>
                            <H3 className="mb-4">Choose a Plan</H3>
                            {plans.map(plan => (
                                <TouchableOpacity key={plan.id} onPress={() => setSelectedPlan(plan)} className="mb-3">
                                    <Card variant="outline" className="flex-row items-center justify-between">
                                        <H3 className="text-base">{plan.name}</H3>
                                        <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
                                    </Card>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {step === 2 && (
                        <View>
                            <View className="flex-row items-center justify-between mb-4">
                                <H3>Choose Day/Group</H3>
                                <Button label="Back" variant="ghost" size="sm" onPress={() => setStep(1)} />
                            </View>
                            {exerciseGroups.map(group => (
                                <TouchableOpacity key={group.id} onPress={() => setSelectedGroup(group)} className="mb-3">
                                    <Card variant="outline" className="flex-row items-center justify-between">
                                        <View>
                                            <H3 className="text-base">{group.name}</H3>
                                            <Small>{weekdays[group.day_of_week]}</Small>
                                        </View>
                                        <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
                                    </Card>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {step === 3 && (
                        <View>
                            <View className="flex-row items-center justify-between mb-4">
                                <H3>Select Exercise</H3>
                                <Button label="Back" variant="ghost" size="sm" onPress={() => setStep(2)} />
                            </View>
                            {exercises.map(ex => (
                                <TouchableOpacity
                                    key={ex.id}
                                    onPress={() => {
                                        setSelectedExercise(ex);
                                        setLogModalVisible(true);
                                    }}
                                    className="mb-3"
                                >
                                    <Card variant="elevated" className="flex-row items-center justify-between">
                                        <View className="flex-1">
                                            <H3 className="text-base">{ex.name}</H3>
                                            {ex.description && <Small numberOfLines={1}>{ex.description}</Small>}
                                        </View>
                                        <View className="w-8 h-8 rounded-full bg-brand-50 items-center justify-center">
                                            <Ionicons name="add" size={20} color="#4361ee" />
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Recent Logs Summary */}
                {logs.length > 0 && (
                    <View className="mt-12 px-6">
                        <View className="flex-row justify-between items-end mb-6">
                            <H2 className="text-xl">Recent Logs</H2>
                            <TouchableOpacity onPress={() => router.push('/history')}>
                                <Small className="text-brand-500 font-bold">View History</Small>
                            </TouchableOpacity>
                        </View>
                        {logs.map(log => (
                            <View key={log.id} className="mb-4 pb-4 border-b border-neutral-100 dark:border-neutral-900">
                                <View className="flex-row justify-between mb-1">
                                    <H3 className="text-sm">{log.exercise?.name || "Exercise"}</H3>
                                    <Small>{formatDate(log.created_at)}</Small>
                                </View>
                                <P className="text-xs">
                                    {log.metrics?.sets} sets × {log.metrics?.reps} reps {log.metrics?.weight ? `@ ${log.metrics?.weight}kg` : ''}
                                </P>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Log Modal */}
            <Modal
                visible={logModalVisible}
                transparent
                animationType="slide"
                onRequestClose={resetForm}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <Card className="rounded-t-3xl p-8 bg-white dark:bg-neutral-900" style={{ paddingBottom: 40 + bottom }}>
                        <View className="flex-row justify-between items-center mb-6">
                            <View>
                                <H2 className="text-xl">{selectedExercise?.name}</H2>
                                <Small>Add your set metrics</Small>
                            </View>
                            <TouchableOpacity onPress={resetForm} className="w-10 h-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                <Ionicons name="close" size={20} color="#71717a" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row space-x-3 mb-6">
                            <View className="flex-1">
                                <Input label="Sets" placeholder="0" value={sets} onChangeText={setSets} keyboardType="numeric" />
                            </View>
                            <View className="flex-1">
                                <Input label="Reps" placeholder="0" value={reps} onChangeText={setReps} keyboardType="numeric" />
                            </View>
                            <View className="flex-1">
                                <Input label="Weight (kg)" placeholder="0" value={weight} onChangeText={setWeight} keyboardType="numeric" />
                            </View>
                        </View>

                        <Input label="Notes" placeholder="How did it feel?" value={notes} onChangeText={setNotes} multiline numberOfLines={2} />

                        <Button label="Save Entry" onPress={handleLogExercise} loading={loading} disabled={!sets || !reps} className="mt-4" />
                    </Card>
                </View>
            </Modal>
        </View>
    );
}
