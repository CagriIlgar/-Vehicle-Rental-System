import React, { useEffect, useRef } from "react";

interface MapComponentProps {
    center: google.maps.LatLng | google.maps.LatLngLiteral;
    zoom: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadMap = () => {
            if (typeof window !== "undefined" && window.google && mapRef.current) {
                new google.maps.Map(mapRef.current, {
                    center,
                    zoom,
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
    }, [center, zoom]);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;