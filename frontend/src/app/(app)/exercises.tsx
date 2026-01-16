import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { createExercise, fetchAllExercises } from "../../api/reqs";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { H1, H2, H3, P, Small } from "@/components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";

interface Exercise {
    id: string;
    name: string;
    description: string;
}

export default function ExercisesScreen() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [newExerciseName, setNewExerciseName] = useState("");
    const [newExerciseDescription, setNewExerciseDescription] = useState("");

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
        setLoading(true);
        try {
            const data = await fetchAllExercises();
            if (data && Array.isArray(data)) setExercises(data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateExercise = async () => {
        if (!newExerciseName.trim()) return;
        try {
            const newExercise = await createExercise(newExerciseName, newExerciseDescription, 'reps_sets_weight');
            setExercises([...exercises, newExercise]);
            resetForm();
        } catch (error) {
            console.error("Error creating exercise:", error);
        }
    };

    const resetForm = () => {
        setNewExerciseName("");
        setNewExerciseDescription("");
        setModalVisible(false);
    };

    const filteredExercises = exercises.filter(ex =>
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: Exercise }) => (
        <Card variant="elevated" className="mb-4">
            <View className="flex-row justify-between items-start">
                <View className="flex-1">
                    <H3 className="text-base mb-1">{item.name}</H3>
                    <Small numberOfLines={2}>{item.description || "No description provided."}</Small>
                </View>
                <View className="w-8 h-8 rounded-full bg-neutral-50 dark:bg-neutral-800 items-center justify-center">
                    <Ionicons name="barbell-outline" size={16} color="#71717a" />
                </View>
            </View>
        </Card>
    );

    return (
        <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
            <View className="px-6 pt-16 pb-6 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                <View className="flex-row justify-between items-end mb-6">
                    <View>
                        <Small className="uppercase tracking-widest mb-1 text-brand-500 font-bold">Library</Small>
                        <H1>Exercises</H1>
                    </View>
                    <Button
                        label="Add New"
                        size="sm"
                        icon={<Ionicons name="add" size={18} color="white" />}
                        onPress={() => setModalVisible(true)}
                    />
                </View>
                <Input
                    placeholder="Search library..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    inputClassName="h-10 py-0"
                    containerClassName="mb-0"
                />
            </View>

            <View className="flex-1 px-6">
                {loading && exercises.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator color="#4361ee" />
                    </View>
                ) : filteredExercises.length === 0 ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <View className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl items-center justify-center mb-4">
                            <Ionicons name="search-outline" size={32} color="#a1a1aa" />
                        </View>
                        <H3 className="text-neutral-400">No exercises found</H3>
                        <P>Try a different search or add a new one.</P>
                    </View>
                ) : (
                    <FlatList
                        data={filteredExercises}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={resetForm}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <Card className="rounded-t-3xl p-8 bg-white dark:bg-neutral-900" style={{ paddingBottom: 40 }}>
                        <View className="flex-row justify-between items-center mb-8">
                            <H2>New Exercise</H2>
                            <TouchableOpacity onPress={resetForm} className="w-10 h-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                <Ionicons name="close" size={20} color="#71717a" />
                            </TouchableOpacity>
                        </View>

                        <Input
                            label="Name"
                            placeholder="e.g. Bench Press"
                            value={newExerciseName}
                            onChangeText={setNewExerciseName}
                            autoFocus
                        />

                        <Input
                            label="Description"
                            placeholder="Optional instructions..."
                            value={newExerciseDescription}
                            onChangeText={setNewExerciseDescription}
                            multiline
                            numberOfLines={3}
                        />

                        <Button label="Create Exercise" onPress={handleCreateExercise} disabled={!newExerciseName.trim()} className="mt-4" />
                    </Card>
                </View>
            </Modal>
        </View>
    );
}
