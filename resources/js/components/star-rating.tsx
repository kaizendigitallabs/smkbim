import { useState } from 'react';
import { Star } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface StarRatingProps {
    value: number;
    onChange: (rating: number) => void;
    label?: string;
    error?: string;
    maxStars?: number;
    readonly?: boolean;
}

export function StarRating({
    value,
    onChange,
    label,
    error,
    maxStars = 5,
    readonly = false,
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (rating: number) => {
        if (!readonly) {
            onChange(rating);
        }
    };

    const handleMouseEnter = (rating: number) => {
        if (!readonly) {
            setHoverRating(rating);
        }
    };

    const handleMouseLeave = () => {
        if (!readonly) {
            setHoverRating(0);
        }
    };

    const displayRating = hoverRating || value;

    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}
            <div className="flex items-center gap-1">
                {Array.from({ length: maxStars }, (_, index) => {
                    const starValue = index + 1;
                    const isFilled = starValue <= displayRating;

                    return (
                        <button
                            key={starValue}
                            type="button"
                            onClick={() => handleClick(starValue)}
                            onMouseEnter={() => handleMouseEnter(starValue)}
                            onMouseLeave={handleMouseLeave}
                            disabled={readonly}
                            className={cn(
                                'transition-all duration-200',
                                !readonly && 'cursor-pointer hover:scale-110',
                                readonly && 'cursor-default'
                            )}
                        >
                            <Star
                                className={cn(
                                    'h-8 w-8 transition-colors',
                                    isFilled
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'fill-none text-gray-300 dark:text-gray-600'
                                )}
                            />
                        </button>
                    );
                })}
                <span className="ml-2 text-sm text-muted-foreground">
                    {value > 0 ? `${value}/${maxStars}` : 'Belum diberi rating'}
                </span>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
