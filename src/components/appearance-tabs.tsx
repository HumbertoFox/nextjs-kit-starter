'use client';

import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { HTMLAttributes, useEffect, useState } from 'react';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const t = useTranslations('AppearanceToggleTab');
    useEffect(() => setMounted(true), []);
    const tabs: { value: 'light' | 'dark' | 'system'; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: t('Light') },
        { value: 'dark', icon: Moon, label: t('Dark') },
        { value: 'system', icon: Monitor, label: t('System') },
    ];
    if (!mounted) return null;
    return (
        <div className={cn("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800", className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    type="button"
                    key={value}
                    onClick={() => setTheme(value)}
                    className={cn(
                        "flex items-center rounded-md px-3.5 py-1.5 cursor-pointer transition-colors",
                        theme === value
                            ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100"
                            : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60",
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
