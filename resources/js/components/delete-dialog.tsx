import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    deleteUrl: string;
    onSuccess?: () => void;
}

export function DeleteDialog({
    open,
    onOpenChange,
    title,
    description,
    deleteUrl,
    onSuccess,
}: DeleteDialogProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(deleteUrl, {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange(false);
                onSuccess?.();
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={processing}
                        className="bg-destructive text-white hover:bg-destructive/90"
                    >
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
