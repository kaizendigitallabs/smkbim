import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export function PopupBanner() {
    const { props } = usePage();
    const siteSetting = props.siteSetting as any;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Check if popup should be shown
        if (siteSetting?.enable_popup_banner && siteSetting?.popup_banner_image) {
            // Check if user has already seen the popup today
            const lastSeen = localStorage.getItem('popup_banner_last_seen');
            const today = new Date().toDateString();
            
            if (lastSeen !== today) {
                // Show popup after a short delay
                const timer = setTimeout(() => {
                    setOpen(true);
                }, 1000);
                
                return () => clearTimeout(timer);
            }
        }
    }, [siteSetting]);

    const handleClose = () => {
        setOpen(false);
        // Remember that user has seen the popup today
        localStorage.setItem('popup_banner_last_seen', new Date().toDateString());
    };

    const handleBannerClick = () => {
        if (siteSetting?.popup_banner_url) {
            window.open(siteSetting.popup_banner_url, '_blank');
        }
    };

    if (!siteSetting?.enable_popup_banner || !siteSetting?.popup_banner_image) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden border-0">
                <div className="relative">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Banner Image */}
                    <div 
                        className={siteSetting.popup_banner_url ? 'cursor-pointer' : ''}
                        onClick={siteSetting.popup_banner_url ? handleBannerClick : undefined}
                    >
                        <img
                            src={`/storage/${siteSetting.popup_banner_image}`}
                            alt="Popup Banner"
                            className="w-full h-auto max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
