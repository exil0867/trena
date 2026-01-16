import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signIn, signUp } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { H1, H2, P, Small } from "@/components/ui/Typography";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const { top, bottom } = useSafeAreaInsets();
    const { refreshUser } = useAuth();

    async function handleAuthentication() {
        if (!email || !password) return;
        setLoading(true);
        setError("");

        try {
            if (isLogin) {
                await signIn(email, password);
            } else {
                await signUp(email, password);
            }
            await refreshUser();
        } catch (err: any) {
            setError(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-neutral-50 dark:bg-neutral-950"
            style={{ paddingTop: top, paddingBottom: bottom }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
                <View className="mb-12 items-center">
                    <View className="w-16 h-16 bg-brand-500 rounded-2xl items-center justify-center mb-6 shadow-lg shadow-brand-500/20">
                        <View className="w-8 h-8 border-4 border-white rounded-full" />
                    </View>
                    <H1 className="text-center mb-2">Trena</H1>
                    <P className="text-center">Track your progress, achieve your goals.</P>
                </View>

                <Card variant="elevated" className="mb-8">
                    <H2 className="mb-6">{isLogin ? "Welcome back" : "Create account"}</H2>

                    <Input
                        label="Email"
                        placeholder="name@example.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        error={error && error.toLowerCase().includes('email') ? error : undefined}
                    />

                    <Input
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        error={error && error.toLowerCase().includes('password') ? error : undefined}
                    />

                    {error && !error.toLowerCase().includes('email') && !error.toLowerCase().includes('password') && (
                        <Small className="mb-4 text-red-500">{error}</Small>
                    )}

                    <Button
                        label={isLogin ? "Sign In" : "Sign Up"}
                        onPress={handleAuthentication}
                        loading={loading}
                        disabled={!email || !password}
                        className="mt-2"
                    />

                    <Button
                        label={isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
                        variant="ghost"
                        onPress={() => setIsLogin(!isLogin)}
                        className="mt-4"
                        size="sm"
                    />
                </Card>

                <View className="items-center">
                    <Link href="/" asChild>
                        <Button label="Back to Home" variant="ghost" size="sm" />
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
