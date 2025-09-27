"use client"

import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";
import L from "leaflet"
import {useState} from "react";

//
// Marker
//
export const DefaultIcon = new L.Icon({
    iconUrl: "/nuss.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [40, 40],
    iconAnchor: [15, 40],
    popupAnchor: [28, 0],
    shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

//
// Map
//
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
    const [markerPos, setMarkerPos] = useState<[number, number] | null>(position);

    // Custom component to handle clicks
    function ClickHandler() {
        useMapEvents({
            click(e) {
                if(!onMapClickAction) return
                const pos: [number, number] = [e.latlng.lat, e.latlng.lng]
                setMarkerPos(pos);
                onMapClickAction(...pos)
            },
        });
        return null;
    }

    return (
        <MapContainer center={position} zoom={zoom} className={"w-full h-64 tablet:h-96 desktop:h-128 rounded-lg overflow-hidden"}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickHandler/>

            {markerPos && (
                <Marker position={markerPos}/>
            )}
        </MapContainer>
    )
}