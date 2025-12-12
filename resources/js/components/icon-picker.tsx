import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconPickerProps {
    value?: string;
    onChange: (icon: string) => void;
    label?: string;
    error?: string;
}

// Popular icons for school programs
const popularIcons = [
    'GraduationCap',
    'BookOpen',
    'Trophy',
    'Users',
    'Laptop',
    'Lightbulb',
    'Target',
    'Award',
    'Star',
    'Heart',
    'Zap',
    'Globe',
    'Briefcase',
    'Palette',
    'Music',
    'Camera',
    'Code',
    'Database',
    'Cpu',
    'Rocket',
    'Shield',
    'Flag',
    'Crown',
    'Sparkles',
    'TrendingUp',
    'CheckCircle',
    'Circle',
    'Square',
    'Triangle',
    'Hexagon',
];

export function IconPicker({ value, onChange, label, error }: IconPickerProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredIcons = popularIcons.filter((icon) =>
        icon.toLowerCase().includes(search.toLowerCase())
    );

    const getIconComponent = (iconName: string) => {
        const IconComponent = Icons[iconName as keyof typeof Icons] as any;
        return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
    };

    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        <div className="flex items-center gap-2">
                            {value ? (
                                <>
                                    {getIconComponent(value)}
                                    <span>{value}</span>
                                </>
                            ) : (
                                <span className="text-muted-foreground">Pilih icon...</span>
                            )}
                        </div>
                        <Icons.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                    <div className="p-2">
                        <Input
                            placeholder="Cari icon..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="mb-2"
                        />
                    </div>
                    <ScrollArea className="h-[300px]">
                        <div className="grid grid-cols-5 gap-2 p-2">
                            {filteredIcons.map((iconName) => (
                                <button
                                    key={iconName}
                                    type="button"
                                    onClick={() => {
                                        onChange(iconName);
                                        setOpen(false);
                                        setSearch('');
                                    }}
                                    className={cn(
                                        'flex flex-col items-center gap-1 rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors',
                                        value === iconName && 'bg-accent'
                                    )}
                                    title={iconName}
                                >
                                    {getIconComponent(iconName)}
                                    <span className="text-[10px] text-center truncate w-full">
                                        {iconName}
                                    </span>
                                </button>
                            ))}
                        </div>
                        {filteredIcons.length === 0 && (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                                Tidak ada icon yang ditemukan
                            </div>
                        )}
                    </ScrollArea>
                </PopoverContent>
            </Popover>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
