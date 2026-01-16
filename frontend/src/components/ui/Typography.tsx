import React from 'react';
import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
    children: React.ReactNode;
}

export const H1: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
    <Text
        className={`text-3xl font-bold text-neutral-900 dark:text-neutral-50 ${className}`}
        {...props}
    >
        {children}
    </Text>
);

export const H2: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
    <Text
        className={`text-2xl font-bold text-neutral-900 dark:text-neutral-50 ${className}`}
        {...props}
    >
        {children}
    </Text>
);

export const H3: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
    <Text
        className={`text-xl font-semibold text-neutral-900 dark:text-neutral-50 ${className}`}
        {...props}
    >
        {children}
    </Text>
);

export const P: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
    <Text
        className={`text-base text-neutral-600 dark:text-neutral-400 leading-6 ${className}`}
        {...props}
    >
        {children}
    </Text>
);

export const Small: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
    <Text
        className={`text-sm text-neutral-500 dark:text-neutral-500 ${className}`}
        {...props}
    >
        {children}
    </Text>
);
