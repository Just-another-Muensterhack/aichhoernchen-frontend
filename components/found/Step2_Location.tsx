import type { FoundItemData } from '@/pages/found/index';
import { MapPin, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Step2Props {
    formData: FoundItemData;
    updateFormData: (data: Partial<FoundItemData>) => void;
}

export function Step2_Location({ formData, updateFormData }: Step2Props) {
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    const handleGetDeviceLocation = () => {
        if (navigator.geolocation) {
            setIsFetchingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationString = `Near coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    updateFormData({ location: locationString });
                    setIsFetchingLocation(false);
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    alert("Could not get your location. Please enter it manually.");
                    setIsFetchingLocation(false);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium">Wo hast du das gefunden?</h2>
                <p className="mt-1 text-sm text-description">Versuche die Adresse so detailiert wie möglich anzugeben.</p>
            </div>

            <div>
                <label htmlFor="location" className="block text-sm font-medium text-description">Ort / Position</label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="location"
                        id="location"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Prinzipalmarkt, in front of the city hall"
                        value={formData.location}
                        onChange={(e) => updateFormData({ location: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-surface px-2 text-sm">Oder</span>
                </div>
            </div>

            <button
                type="button"
                onClick={handleGetDeviceLocation}
                disabled={isFetchingLocation}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                {isFetchingLocation ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <MapPin className="mr-2 h-5 w-5" />
                )}
                Genau hier! (GPS)
            </button>
        </div>
    );
}
