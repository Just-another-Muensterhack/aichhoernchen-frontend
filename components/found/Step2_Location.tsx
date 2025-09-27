import type {FoundItemData} from '@/pages/found';
import {MapPin, Loader2} from 'lucide-react';
import {useState} from 'react';
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
    ssr: false, // disable server-side rendering
});

interface Step2Props {
    formData: FoundItemData;
    updateFormData: (data: Partial<FoundItemData>) => void;
}

export function Step2_Location({formData, updateFormData}: Step2Props) {
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    const handleGetDeviceLocation = () => {
        if (navigator.geolocation) {
            setIsFetchingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    const locationString = `Near coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    updateFormData({location: locationString});
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
        <div className="flex-col-6 w-full">
            <div>
                <h2 className="title-lg">Wo und wann hast du es gefunden?</h2>
                <p className="mt-1 text-description">Versuche die Angaben so genau wie möglich zu machen.</p>
            </div>

            <div className={"flex-col-2"}>
                <label htmlFor="location" className="title-sm flex-row-1 itmes-center">
                    {"Ort / Position"}
                    <span className={"text-primary"}>*</span>
                </label>
                <div className={"flex-row-2 w-full"}>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        className="min-w-none max-w-none w-full"
                        placeholder="e.g., Prinzipalmarkt, in front of the city hall"
                        value={formData.location}
                        onChange={(e) => updateFormData({location: e.target.value})}
                        required
                    />
                    <button
                        type="button"
                        onClick={handleGetDeviceLocation}
                        disabled={isFetchingLocation}
                        className={"disabled:bg-primary disabled:text-on-primary"}
                    >
                        {isFetchingLocation ? (
                            <Loader2 className="min-h-5 min-w-5 animate-spin"/>
                        ) : (
                            <MapPin className="min-h-5 min-w-5"/>
                        )}
                        Genau hier! (GPS)
                    </button>
                </div>

                <Map onMapClickAction={(lat, long) => updateFormData({location: `${lat},${long}`})}/>

                <div className={"flex-col-2"}>
                    <label htmlFor="time" className="title-sm flex-row-1 items-center">
                        {"Zeitpunkt"}
                        <span className={"text-primary"}>*</span>
                    </label>
                    <div className={"flex-row-2 w-full"}>
                        <input
                            type="datetime-local"
                            name="time"
                            id="time"
                            className="min-w-none max-w-none w-full"
                            value={formData.time}
                            onChange={(e) => updateFormData({time: e.target.value})}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => {
                                updateFormData({time: (new Date()).toISOString().slice(0, 19)})
                            }}
                        >
                            {"Jetzt"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
