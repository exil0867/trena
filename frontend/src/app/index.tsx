import { Link } from "expo-router";
import React from "react";
import { View, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { H1, H2, H3, P, Small } from "@/components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white dark:bg-neutral-950">
      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="px-6 pt-24 pb-16 items-center">
          <View className="w-20 h-20 bg-brand-500 rounded-3xl items-center justify-center mb-8 shadow-2xl shadow-brand-500/40 rotate-6">
            <Ionicons name="fitness" size={40} color="white" />
          </View>
          <H1 className="text-5xl text-center mb-4 leading-tight">Elevate Your Training</H1>
          <P className="text-center text-lg mb-10 text-neutral-500 dark:text-neutral-400">
            The simple, powerful, open-source companion for your fitness journey.
          </P>
          <View className="flex-row space-x-4 w-full px-4">
            <Link href="/login" asChild>
              <Button label="Get Started" className="flex-1 h-14" />
            </Link>
            <Button label="Learn More" variant="outline" className="flex-1 h-14" />
          </View>
        </View>

        {/* Features Section */}
        <View className="px-6 py-16 bg-neutral-50 dark:bg-neutral-900/50">
          <Small className="uppercase tracking-widest text-brand-500 font-bold mb-2 text-center">Features</Small>
          <H2 className="text-3xl text-center mb-12">Everything you need</H2>

          <View className="space-y-4">
            <FeatureItem
              icon="stats-chart"
              title="Progress Tracking"
              description="Monitor your strength gains and body composition over time with beautiful charts."
            />
            <FeatureItem
              icon="list"
              title="Routine Management"
              description="Create and organize custom workout plans that fit your specific goals and schedule."
            />
            <FeatureItem
              icon="shield-checkmark"
              title="Privacy First"
              description="Your data is yours. Trena is open-source and respects your privacy above all else."
            />
            <FeatureItem
              icon="people"
              title="Community Driven"
              description="Built by enthusiasts for enthusiasts. Join our growing community of lifters."
            />
          </View>
        </View>

        {/* Status Section */}
        <View className="px-6 py-20 items-center">
          <Card variant="outline" className="w-full p-8 border-brand-200 bg-brand-50/50 dark:bg-brand-950/20 items-center">
            <View className="w-12 h-12 bg-brand-500 rounded-full items-center justify-center mb-4">
              <Ionicons name="construct" size={24} color="white" />
            </View>
            <H3 className="mb-2">Active Development</H3>
            <P className="text-center text-sm">
              Trena is constantly evolving with new features and improvements added weekly.
            </P>
          </Card>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 border-t border-neutral-100 dark:border-neutral-900 items-center" style={{ paddingBottom: 24 + bottom }}>
        <Small className="text-neutral-400">© {new Date().getFullYear()} Trena • Open Source Fitness</Small>
      </View>
    </View>
  );
}

const FeatureItem = ({ icon, title, description }) => (
  <Card variant="elevated" className="flex-row items-start p-6 mb-4">
    <View className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-2xl items-center justify-center mr-4">
      <Ionicons name={icon as any} size={24} color="#4361ee" />
    </View>
    <View className="flex-1">
      <H3 className="text-lg mb-1">{title}</H3>
      <P className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{description}</P>
    </View>
  </Card>
);