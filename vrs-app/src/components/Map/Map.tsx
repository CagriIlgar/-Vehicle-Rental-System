import React, { useEffect, useRef, useState } from "react";

interface Vehicle {
    VehicleID: number;
    Latitude: number;
    Longitude: number;
    Brand: string;
    Model: string;
}

interface MapComponentProps {
    center: google.maps.LatLng | google.maps.LatLngLiteral;
    zoom: number;
    vehicles: Vehicle[];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, vehicles }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadMap = () => {
            if (typeof window !== "undefined" && window.google && mapRef.current) {
                const map = new google.maps.Map(mapRef.current, {
                    center,
                    zoom,
                });

                // Loop through vehicles and add a marker for each one
                vehicles.forEach((vehicle) => {
                    const lat = parseFloat(vehicle.Latitude.toString());
                    const lng = parseFloat(vehicle.Longitude.toString());

                    // Ensure lat and lng are valid numbers
                    if (!isNaN(lat) && !isNaN(lng)) {
                        const marker = new google.maps.Marker({
                            position: { lat, lng },
                            map,
                            title: `${vehicle.Brand} ${vehicle.Model}`,
                        });
                    } else {
                        console.warn(`Invalid coordinates for vehicle: ${vehicle.VehicleID}`);
                    }
                });
            }
        };

        const existingScript = document.getElementById("google-maps-script");
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
            script.id = "google-maps-script";
            script.async = true;
            script.defer = true;
            script.onload = loadMap;
            document.head.appendChild(script);
        } else {
            loadMap();
        }
    }, [center, zoom, vehicles]);

    return <div ref={mapRef} style={{ width: "100%", height: "300px" }} />;
};

export default MapComponent;
