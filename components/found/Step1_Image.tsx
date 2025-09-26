import { useState } from 'react';
import type { FoundItemData } from '@/pages/found/index';
import { UploadCloud, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Step1Props {
    formData: FoundItemData;
    updateFormData: (data: Partial<FoundItemData>) => void;
}

export function Step1_Image({ formData, updateFormData }: Step1Props) {
    const [isIndexing, setIsIndexing] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            updateFormData({ imageFile: file, imageUrl });

            setIsIndexing(true);
            updateFormData({ caption: "Ich überlege..." });
            setTimeout(() => {
                const aiCaption = "Was auch immer ich als dumme KI mir hierbei gedacht habe...";
                updateFormData({ caption: aiCaption });
                setIsIndexing(false);
            }, 2500);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium">Mach ein Foto!</h2>
                <p className="mt-1 text-sm text-description">Ein gutes Foto hilft den Suchenden das Objekt besser zu identifizieren.</p>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    {formData.imageUrl ? (
                        <Image src={formData.imageUrl} alt="Preview of found item" className="h-full w-full object-cover rounded-lg" width="720" height="480" />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Hochladen</span> oder drag-n-drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
                        </div>
                    )}
                    <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
                </label>
            </div>

            <div>
                <label htmlFor="caption" className="block text-sm font-medium">Beschreibung</label>
                <div className="mt-1 relative">
                    <textarea
                        id="caption"
                        name="caption"
                        rows={3}
                        className="shadow-sm bg-surface block w-full sm:text-sm rounded-md p-2"
                        value={formData.caption}
                        readOnly
                    />
                    {isIndexing && <Loader2 className="absolute top-3 right-3 h-5 w-5 text-gray-800 animate-spin" />}
                </div>
                <p className="mt-2 text-sm text-gray-500">Unsere KI erstellt automatisch eine Beschreibung des Fundstücks.</p>
            </div>
        </div>
    );
}
