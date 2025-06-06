"use client";
import React from "react";
import Image from "next/image";
import "../../(pages)/about/about.css";
import ClientLayout from "@/app/client-layout";

const RelaxNature: React.FC = () => {
    return (
        <ClientLayout>
            <div className="aboutContainer">
                <section className="intro-section">
                    <h1 className="about-title">Relax on the Beach & Nature</h1>
                    <p className="about-subtitle">
                        Discover the natural wonders and tranquil beaches of North Cyprus.
                    </p>
                </section>

                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Lefkoşa:</h2>
                        <p>
                            Nicosia may not be a beach city, but it offers plenty of spots for peaceful walks, scenic beauty, and heritage-rich surroundings.
                            Exploring the Arabahmet Neighborhood is a great way to unwind — this quiet area is full of restored Ottoman houses, cobblestone alleys,
                            and small gardens, perfect for a relaxing stroll away from the busy avenues.

                        </p>
                        <p>
                            The city&#39;s mix of Venetian walls, tree-lined streets, and shady squares provides a sense of calm in the middle of the capital.
                            Whether you&#39;re wandering through markets or sitting at a café in the old city, Nicosia offers urban relaxation with a historical twist.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/büyükhan1.jpg"
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
                            Kyrenia is the perfect destination for those seeking coastal beauty and mountain scenery.
                            The stunning Kyrenia Harbour, with its peaceful marina, offers beautiful views and a calm seaside breeze — ideal for strolls or watching the sunset by the water.
                        </p>
                        <p>
                            For beach lovers, Escape Beach and Alagadi Turtle Beach are must-visits.
                            Escape is a popular spot with facilities and clear water, while Alagadi is known for its sea turtle nesting sites, where you might even spot baby turtles in summer.
                        </p>
                        <p>
                            Nature also shines inland — the St. Hilarion Castle, perched in the mountains, offers breathtaking views over the coast, making it one of the most scenic spots on the island.
                            Surrounded by pine forests and rocky cliffs, it&#39;s perfect for light hiking or photography.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/kale.jpg"
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
                            Karpaz is known as North Cyprus&#39;s untouched paradise, and it&#39;s easy to see why.
                            With open landscapes, golden beaches, and winding coastal roads, this region is ideal for those seeking natural beauty and peace.
                        </p>
                        <br />
                        <p>
                            One of the most famous spots is Golden Beach — a vast, quiet stretch of soft sand and turquoise water.
                            Often nearly empty, it’s perfect for swimming, sunbathing, or enjoying the silence of the sea breeze.
                        </p>
                        <br />
                        <p>
                            The region is also home to the wild Karpaz donkeys, which roam freely through the national park.
                            Seeing them on the roadside while driving adds to the charm and serenity of the journey.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/altınkum.jpg"
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
                            Famagusta is one of North Cyprus’s best destinations for sun, sea, and calm escapes. Just a short drive from the city center, you’ll find some of the most peaceful beaches on the island, including:
                        </p>
                        <p>• Palm Beach – A quiet sandy stretch right near the edge of Varosha	</p>
                        <p>• Silver Beach – Calm, shallow waters perfect for swimming</p>
                        <p>• Glapsides Beach – A local favorite for both families and young people</p>
                        <p>• Derinya Public Beach – With the borders of the Maraş region and a relaxing atmosphere</p>
                        <p>
                            These beaches are perfect for swimming, sunbathing, or simply relaxing by the blue Mediterranean.
                            The warm sea breeze and low-key surroundings make Famagusta a great place for nature lovers and beachgoers alike.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/palmbeach.jpg"
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
                            Güzelyurt is a nature lover&#39;s retreat. Surrounded by endless orange, lemon, and grapefruit orchards, the region is known as the agricultural heart of North Cyprus.
                            During citrus season, the air is filled with a sweet aroma, and roadside stands sell fresh fruit and juice.
                        </p>
                        <p>
                            The town&#39;s green parks, walking trails, and open views of the Troodos mountain slopes provide a calming escape from busy coastal cities. Though Güzelyurt itself isn&#39;t a beach town, nearby areas along Morphou Bay offer quiet coastal spots ideal for swimming, picnicking, or enjoying a scenic sunset. It&#39;s perfect for those seeking slow travel, fresh air, and open landscapes.
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

export default RelaxNature;
