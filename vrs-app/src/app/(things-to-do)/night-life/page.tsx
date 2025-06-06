"use client";
import React from "react";
import Image from "next/image";
import "../../(pages)/about/about.css";
import ClientLayout from "@/app/client-layout";

const Nightlife: React.FC = () => {
    return (
        <ClientLayout>
            <div className="aboutContainer">
                <section className="intro-section">
                    <h1 className="about-title">Nightlife</h1>
                    <p className="about-subtitle">
                        Discover the nightlife of North Cyprus.
                    </p>
                </section>

                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Lefkoşa:</h2>
                        <p>
                            Nicosia has a unique and vibrant nightlife scene centered around Zahra Street, one of the city’s most social and artistic neighborhoods. After sunset, the area comes alive with street food vendors, rooftop lounges, cozy bars, and live music venues

                        </p>
                        <p>
                            It&#39;s especially popular with students, young locals, and artists, creating a diverse and lively atmosphere. You can start your night at a meze tavern, then move on to a bar with acoustic performances, an open mic night, or even a DJ under fairy lights. For those who enjoy a chill evening, there are also quirky coffee shops and tea spots that stay open late.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/zahra.jpg"
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
                            Kyrenia offers a lively yet tasteful nightlife experience. In the evening, the town comes alive with rooftop bars, live music venues, and beach clubs that keep the coastal energy going after dark.
                        </p>
                        <p>
                            Many seaside restaurants and taverns offer live traditional music in the evenings, and you can enjoy drinks by the water or in the quaint streets of the old town. For those looking for excitement, luxury hotels house casinos and late-night lounges, blending leisure and entertainment for a diverse crowd.
                        </p>
                        <p>
                            Kyrenia&#39;s nightlife has something for everyone — from romantic evenings and casual drinks, to more festive nights out.
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
                        <h2 className="section-title">Karpaz:</h2>
                        <p>
                            Karpaz isn’t a place for loud music or big nightclubs — instead, its nightlife is peaceful, local, and simple. Evenings are spent in village squares, quiet cafés, and small taverns, where locals gather over tea or wine, often under the stars.
                        </p>
                        <p>
                            You might find a small live music performance at a coastal eatery, or hear traditional Cypriot songs playing quietly in the background while enjoying a late meal. In Karpaz, nightlife means slowing down, not speeding up — perfect for those who enjoy tranquility over excitement.
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
                            Famagusta offers relaxed, atmospheric nightlife rather than a party scene. As the sun sets, the city becomes more alive with tea gardens, outdoor taverns, and seaside cafés where locals and visitors come to unwind.
                        </p>
                        <p>
                            You can enjoy live traditional music, soft lighting, and the sound of the sea in the background while sipping coffee, wine, or local drinks. Most nightlife spots are in the old town or along the beach, creating a peaceful yet vibrant setting for your evenings.
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
                            Güzelyurt offers a very quiet, local-style nightlife experience.
                            Instead of clubs and bars, evenings here are spent in cozy cafés and tea gardens,
                            where locals gather to play backgammon, chat, or enjoy a peaceful night with friends and family.
                        </p>
                        <p>
                            For a more social night out, family-run restaurants often remain open late and serve food with soft background music.
                            During the Citrus Festival in May, the city becomes more festive, with music, dancing, and evening events that bring the town together.
                            Güzelyurt is ideal for travelers who prefer relaxed, authentic evenings over busy nightlife scenes.
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

export default Nightlife;
