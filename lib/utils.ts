import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deterministic color index for avatars based on string hash
 */
export function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    'bg-[#0D7377]/15 text-[#0D7377] dark:bg-[#14B8A6]/20 dark:text-[#14B8A6]',
    'bg-[#2563EB]/15 text-[#2563EB] dark:bg-[#60A5FA]/20 dark:text-[#60A5FA]',
    'bg-[#E8A33D]/20 text-[#A86400] dark:bg-[#F59E0B]/20 dark:text-[#F59E0B]',
    'bg-[#15803D]/15 text-[#15803D] dark:bg-[#22C55E]/20 dark:text-[#22C55E]',
    'bg-[#8B5CF6]/15 text-[#8B5CF6] dark:bg-[#A78BFA]/20 dark:text-[#A78BFA]',
    'bg-[#D97706]/15 text-[#D97706] dark:bg-[#FBBF24]/20 dark:text-[#FBBF24]',
  ];
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export function getInitials(name: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

