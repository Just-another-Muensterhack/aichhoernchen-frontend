// components/found/Step1_Image.tsx
import { useState } from 'react';
import type { FoundItemData } from '@/app/found/page';
import { UploadCloud, Loader2 } from 'lucide-react';

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
            updateFormData({ caption: "Analyzing image..." });
            setTimeout(() => {
                const aiCaption = "A set of silver keys on a black keyfob, possibly car keys.";
                updateFormData({ caption: aiCaption });
                setIsIndexing(false);
            }, 2500);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium text-gray-900">Mach ein Foto!</h2>
                <p className="mt-1 text-sm text-gray-500">Ein gutes Foto hilft den Suchenden das Objekt besser zu identifizieren.</p>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="Preview of found item" className="h-full w-full object-cover rounded-lg" />
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
                <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Beschreibung</label>
                <div className="mt-1 relative">
                    <textarea
                        id="caption"
                        name="caption"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-100 text-blue-500 p-2"
                        value={formData.caption}
                    />
                    {isIndexing && <Loader2 className="absolute top-3 right-3 h-5 w-5 text-gray-800 animate-spin" />}
                </div>
                <p className="mt-2 text-sm text-gray-500">Unsere KI erstellt automatisch eine Beschreibung des Fundstücks.</p>
            </div>
        </div>
    );
}
