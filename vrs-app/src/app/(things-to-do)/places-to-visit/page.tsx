"use client";
import React from "react";
import Image from "next/image";
import "../../(pages)/about/about.css";
import ClientLayout from "@/app/client-layout";

const PlacesToVisit: React.FC = () => {
    return (
        <ClientLayout>
            <div className="aboutContainer">
                <section className="intro-section">
                    <h1 className="about-title">Places to visit</h1>
                    <p className="about-subtitle">
                        Discover the places to visit of North Cyprus.
                    </p>
                </section>

                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Lefkoşa:</h2>
                        <p>
                            Nicosia is steeped in history — every street and building reflects the city’s layered cultural identity. Key places to explore include:
                        </p>
                        <p>• Büyük Han – A beautifully preserved 16th-century Ottoman inn now functioning as a center for arts and culture, filled with cafés, artisan shops, and galleries</p>
                        <p>
                            • Selimiye Mosque (formerly St. Sophia Cathedral) – A remarkable structure blending Gothic and Islamic architecture, with towering minarets and a spiritual presence.
                        </p>
                        <p>
                            • Kyrenia Gate – Once the city’s main northern entrance, now a small museum and photo-worthy landmark.
                        </p>
                        <p>
                            • Derviş Paşa Mansion – A renovated Ottoman-era home offering a window into traditional Cypriot life with antiques and embroidery.
                        </p>
                        <p>
                            • Lusignan House – A 15th-century Gothic mansion reflecting the legacy of French rule on the island.
                        </p>
                        <p>
                            • Haydar Pasha Mosque – A peaceful and lesser-known gem with a serene courtyard and beautiful stonework.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Beach in North Cyprus"
                            width={300}
                            height={200}
                            className="image"
                        />
                    </div>
                </section>
                <br />
                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Girne:</h2>
                        <p>
                            Kyrenia is full of historical and cultural landmarks, starting with the Kyrenia Castle, a massive 7th-century fort that includes a shipwreck museum, chapel, and rooftop views over the harbor and sea.
                        </p>
                        <p>
                            A short drive away lies the serene Bellapais Abbey, a beautiful 13th-century Gothic monastery. Nestled in a quiet village and surrounded by cypress trees, it hosts occasional classical concerts in its peaceful courtyard.
                        </p>
                        <p>
                            Other highlights include:
                        </p>
                        <p>• Lapta Coastal Walkway – Ideal for walking, cycling, or catching the sunset
                        </p>
                        <p>• Karmi Village – A hillside village full of renovated homes, art studios, and shaded cafés</p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Beach in North Cyprus"
                            width={300}
                            height={200}
                            className="image"
                        />
                    </div>
                </section>
                <br />
                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Karpaz:</h2>
                        <p>
                            Karpaz is filled with spiritual sites, historic ruins, and beautiful coastal views. Notable places to visit include:
                        </p>
                        <p>
                            • Apostolos Andreas Monastery – A quiet, seaside pilgrimage site located at the eastern tip of the peninsula. Its remote setting and peaceful energy make it a must-see.
                        </p>
                        <p>
                            • Ayios Philon Church & Ancient City – The seaside remains of a once-thriving Byzantine town, offering stone ruins, peaceful surroundings, and a glimpse into the past.
                        </p>
                        <p>
                            • Villages of Avtepe and Sipahi – Traditional hillside and seaside settlements where visitors can explore stone houses, olive groves, and local crafts.
                        </p>
                        <p>
                            • Dipkarpaz Village – A multicultural village where Turkish Cypriots and Greek Cypriots live side by side, reflecting peaceful coexistence and traditional life.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Beach in North Cyprus"
                            width={300}
                            height={200}
                            className="image"
                        />
                    </div>
                </section>
                <br />
                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Mağusa:</h2>
                        
                        <p>
                            Famagusta is a city rich in history, architecture, and ancient ruins — a true treasure for culture lovers. Top landmarks include:
                        </p>
                        <p>
                            • Lala Mustafa Pasha Mosque – Originally the 14th-century St. Nicholas Cathedral, now a stunning mosque with a dramatic Gothic façade.
                        </p>
                        <p>
                            • Othello Castle – A seaside fortress said to have inspired Shakespeare’s play, offering views over the city and sea.
                        </p>
                        <p>
                            • Varosha – The mysterious ghost town sealed since the 1970s. Parts have reopened for walking tours, giving visitors a unique glimpse into frozen history.
                        </p>
                        <p>
                            • Salamis Ruins – Just outside Famagusta, this vast ancient Roman city features mosaics, bathhouses, and a theater.
                        </p>
                        <p>
                            • Enkomi (Tuzla) – The remains of a Bronze Age city-state, ideal for those interested in ancient Cypriot civilization.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Beach in North Cyprus"
                            width={300}
                            height={200}
                            className="image"
                        />
                    </div>
                </section>
                <br />
                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Güzelyurt:</h2>
                        <p>
                            Güzelyurt has a strong connection to ancient history and Cypriot heritage. Key places to visit include:
                        </p>
                        <p>
                            • St. Mamas Church & Museum: Home to religious frescoes and an archaeological museum showcasing statues, coins, pottery, and burial artifacts discovered in the region.
                        </p>
                        <p>
                            • Soli Ruins: Just outside the city, this ancient Roman site features a mosaic-covered basilica, amphitheater, and seaside ruins that take you back centuries.
                        </p>
                        <p>
                            • Vouni Palace: Perched on a hill, these Persian-era ruins offer panoramic views of Morphou Bay and a glimpse into Cyprus&#39;s ancient political intrigue.
                        </p>
                        <p>
                            • Güzelyurt Town Center: Known for its friendly outdoor markets, traditional shops, and a laid-back feel where you can truly observe local daily life.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Beach in North Cyprus"
                            width={300}
                            height={200}
                            className="image"
                        />
                    </div>
                </section>
            </div>
        </ClientLayout>
    );
};
export default PlacesToVisit;
