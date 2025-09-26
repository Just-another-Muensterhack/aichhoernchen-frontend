import { useState } from 'react';
import type { FoundItemData } from '@/pages/found';
import { UploadCloud, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Step1Props {
    formData: FoundItemData;
    updateFormData: (data: Partial<FoundItemData>) => void;
}

type IndexState = "notStarted" | "indexing" | "finished" | "failed";

export function Step1_Image({ formData, updateFormData }: Step1Props) {
    const [indexState, setIndexState] = useState<IndexState>("notStarted");

    const allowEditing = indexState === "finished" || indexState === "failed";

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            updateFormData({ imageFile: file, imageUrl });

            setIndexState("indexing");
            updateFormData({ caption: "Ich überlege..." });
            setTimeout(() => {
                const aiCaption = "Was auch immer ich als dumme KI mir hierbei gedacht habe...";
                updateFormData({ caption: aiCaption });
                setIndexState("finished");
            }, 2500);
        }
    };

    return (
        <div className="flex-col-8">
            <div>
                <h2 className="title-lg">Mach ein Foto!</h2>
                <p className="mt-1 text-description">Ein gutes Foto hilft den Suchenden das Objekt besser zu identifizieren.</p>
                <div className="flex flex-col items-center justify-center w-full mt-2">
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-foreground/30 hover:border-foreground/50 border-dashed rounded-lg cursor-pointer">
                        {formData.imageUrl ? (
                            <Image src={formData.imageUrl} alt="Preview of found item" className="h-full w-full object-cover rounded-lg" width="720" height="480" />
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-10 h-10 mb-3 text-description" />
                                <p className="mb-2 text-sm text-description"><span className="font-semibold">Hochladen</span> oder drag-n-drop</p>
                                <p className="text-xs text-description">PNG or JPG</p>
                            </div>
                        )}
                        <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageChange} />
                    </label>
                </div>
            </div>

            <div>
                <label htmlFor="caption" className="title-md">Beschreibung</label>
                <p className="text-description">Unsere KI erstellt automatisch eine Beschreibung des Fundstücks, nachdem das Bild hochgeladen wurde.</p>
                <div className="mt-2 relative w-full">
                    <textarea
                        id="caption"
                        name="caption"
                        rows={3}
                        placeholder={"z.B. Auf der Rückseite befindet sich ein grüner Sticker "}
                        className="block w-full max-w-full min-h-48 rounded-lg"
                        value={formData.caption}
                        onChange={(e) => updateFormData({ caption: e.target.value })}
                        disabled={!allowEditing}
                    />
                    {indexState === "indexing" && <Loader2 className="absolute top-3 right-3 h-5 w-5 text-description animate-spin" />}
                    {indexState === "failed" && <p className="text-negative">Die KI konnte keine Beschreibung generieren, bitte gebe sie manuel ein.</p>}
                </div>
            </div>
        </div>
    );
}
