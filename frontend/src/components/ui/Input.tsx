import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    containerClassName = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    ...props
}) => {
    return (
        <View className={`mb-4 ${containerClassName}`}>
            {label && (
                <Text className={`mb-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 ${labelClassName}`}>
                    {label}
                </Text>
            )}
            <TextInput
                className={`px-4 py-3 bg-white dark:bg-neutral-900 border ${error ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'
                    } rounded-xl text-neutral-900 dark:text-neutral-100 ${inputClassName}`}
                placeholderTextColor="#a1a1aa"
                {...props}
            />
            {error && (
                <Text className={`mt-1 text-xs text-red-500 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

export default Input;
