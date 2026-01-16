import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
    children: React.ReactNode;
    variant?: 'elevated' | 'flat' | 'outline';
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'flat',
    className = '',
    ...props
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'elevated':
                return 'bg-white dark:bg-neutral-900 shadow-sm';
            case 'flat':
                return 'bg-neutral-50 dark:bg-neutral-800';
            case 'outline':
                return 'bg-transparent border border-neutral-200 dark:border-neutral-800';
            default:
                return 'bg-neutral-50 dark:bg-neutral-800';
        }
    };

    return (
        <View
            className={`p-4 rounded-2xl ${getVariantStyles()} ${className}`}
            {...props}
        >
            {children}
        </View>
    );
};

export default Card;
