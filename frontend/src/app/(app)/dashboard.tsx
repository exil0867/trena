import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Modal,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createPlan, fetchPlans } from "../../api/reqs";
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

export default function PlansScreen() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPlanName, setNewPlanName] = useState("");
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();

    useEffect(() => {
        handleFetchPlans();
    }, []);

    const handleFetchPlans = async () => {
        setLoading(true);
        try {
            const data = await fetchPlans();
            if (data && Array.isArray(data)) {
                setPlans(data);
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePlan = async () => {
        if (!newPlanName.trim()) return;

        try {
            const newPlan = await createPlan(newPlanName);
            setPlans([...plans, newPlan]);
            setNewPlanName("");
            setModalVisible(false);
        } catch (error) {
            console.error("Error creating plan:", error);
        }
    };

    const renderItem = ({ item }: { item: Plan }) => (
        <Card variant="elevated" className="mb-4">
            <View className="flex-row justify-between items-center">
                <View className="flex-1">
                    <H3 className="mb-1">{item.name}</H3>
                    <Small>Workout Plan • {new Date().toLocaleDateString()}</Small>
                </View>
                <Button
                    label="View"
                    variant="secondary"
                    size="sm"
                    onPress={() => router.push(`/plan?plan=${item.id}`)}
                />
            </View>
        </Card>
    );

    return (
        <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
            {/* Header Area */}
            <View className="px-6 pt-16 pb-8 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                <View className="flex-row justify-between items-end">
                    <View>
                        <Small className="uppercase tracking-widest mb-1 text-brand-500 font-bold">Dashboard</Small>
                        <H1>Your Plans</H1>
                    </View>
                    <Button
                        label="New Plan"
                        size="sm"
                        icon={<Ionicons name="add" size={18} color="white" />}
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            </View>

            {/* Content Container */}
            <View className="flex-1 px-6">
                {loading && plans.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <P>Loading plans...</P>
                    </View>
                ) : plans.length === 0 ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <View className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-3xl items-center justify-center mb-6">
                            <Ionicons name="clipboard-outline" size={40} color="#a1a1aa" />
                        </View>
                        <H2 className="mb-2">No plans yet</H2>
                        <P className="text-center mb-8">Start by creating your first training plan to track your workouts.</P>
                        <Button
                            label="Create Plan"
                            onPress={() => setModalVisible(true)}
                        />
                    </View>
                ) : (
                    <FlatList
                        data={plans}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            {/* Create Plan Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 items-center justify-center px-6">
                    <Card variant="elevated" className="w-full max-w-sm p-6">
                        <H2 className="mb-4">Create New Plan</H2>
                        <P className="mb-6">Give your training plan a name like "Push & Pull" or "Leg Day".</P>

                        <Input
                            label="Plan Name"
                            placeholder="Enter plan name"
                            value={newPlanName}
                            onChangeText={setNewPlanName}
                            autoFocus
                        />

                        <View className="flex-row justify-end mt-4">
                            <Button
                                label="Cancel"
                                variant="ghost"
                                onPress={() => setModalVisible(false)}
                                className="mr-2"
                            />
                            <Button
                                label="Create"
                                onPress={handleCreatePlan}
                                disabled={!newPlanName.trim()}
                            />
                        </View>
                    </Card>
                </View>
            </Modal>
        </View>
    );
}
