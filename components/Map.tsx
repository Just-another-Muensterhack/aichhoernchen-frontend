"use client"

import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import {useState} from "react";
import {Plus} from "lucide-react";

type MapProps = {
    zoom?: number
    position?: [number, number],
    onMapClickAction?: (lat: number, long: number) => void,
}

export default function Map({
                                zoom = 13,
                                position = [51.9607, 7.6261] as const,
                                onMapClickAction,
                            }: MapProps) {
    const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);

    // Custom component to handle clicks
    function ClickHandler() {
        useMapEvents({
            click(e) {
                setMarkerPos([e.latlng.lat, e.latlng.lng]);
            },
        });
        return null;
    }

    return (
        <MapContainer center={position} zoom={zoom} style={{height: "500px", width: "100%"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickHandler/>

            {markerPos && (
                <Marker position={markerPos}>
                    <Popup>
                        <div className="flex flex-col gap-2">
                            <span className={"title-sm"}>
                                Position: {markerPos[0].toFixed(5)}, {markerPos[1].toFixed(5)}
                            </span>
                            <button
                                type={"button"}
                                className="bg-primary text-white px-2 py-1 rounded"
                                onClick={() => onMapClickAction?.(markerPos[0], markerPos[1])}
                            >
                                <Plus/>
                                {"Bestätigen"}
                            </button>
                        </div>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    )
}