import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
    textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    className = '',
    textClassName = '',
    disabled,
    ...props
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return 'bg-brand-500 active:bg-brand-600';
            case 'secondary':
                return 'bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:active:bg-neutral-700';
            case 'outline':
                return 'bg-transparent border border-neutral-300 active:bg-neutral-100 dark:border-neutral-700 dark:active:bg-neutral-900';
            case 'ghost':
                return 'bg-transparent active:bg-neutral-100 dark:active:bg-neutral-900';
            case 'danger':
                return 'bg-red-500 active:bg-red-600';
            default:
                return 'bg-brand-500';
        }
    };

    const getTextStyles = () => {
        switch (variant) {
            case 'primary':
            case 'danger':
                return 'text-white';
            case 'secondary':
            case 'outline':
            case 'ghost':
                return 'text-neutral-900 dark:text-neutral-100';
            default:
                return 'text-white';
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 rounded-lg';
            case 'md':
                return 'px-4 py-2.5 rounded-xl';
            case 'lg':
                return 'px-6 py-3.5 rounded-2xl';
            default:
                return 'px-4 py-2.5 rounded-xl';
        }
    };

    const getTextSizeStyles = () => {
        switch (size) {
            case 'sm':
                return 'text-sm font-medium';
            case 'md':
                return 'text-base font-semibold';
            case 'lg':
                return 'text-lg font-bold';
            default:
                return 'text-base font-semibold';
        }
    };

    return (
        <TouchableOpacity
            className={`flex-row items-center justify-center ${getSizeStyles()} ${getVariantStyles()} ${disabled || loading ? 'opacity-50' : ''
                } ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? 'white' : '#6366f1'} />
            ) : (
                <>
                    {icon && <View className="mr-2">{icon}</View>}
                    <Text className={`${getTextStyles()} ${getTextSizeStyles()} ${textClassName}`}>
                        {label}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

export default Button;
