"use client";
import React from "react";
import Image from "next/image";
import "../../(pages)/about/about.css";
import ClientLayout from "@/app/client-layout";

const Cuisine: React.FC = () => {
    return (
        <ClientLayout>
            <div className="aboutContainer">
                <section className="intro-section">
                    <h1 className="about-title">North Cyprus Cuisine</h1>
                    <p className="about-subtitle">
                        Discover the rich and diverse culinary traditions of North Cyprus — a fusion of Mediterranean, Ottoman, and Cypriot village flavors.
                    </p>
                </section>
                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Lefkoşa: Street Flavors & Coffee Traditions</h2>
                        <p>
                            As the capital, Nicosia is a melting pot of street food, marketplaces, and urban taverns. Around Arasta Street and Bandabuliya, you’ll find authentic Cypriot snacks and bold spices.
                        </p>

                        <p>• Makarina bulli – A local dessert made with semolina and syrup, often served with coffee</p>
                        <p>• Grilled köfte and şiş kebab – Popular as both street and sit-down meals</p>
                        <p>• Homemade olives, cheeses, jams, and Cypriot spiced nuts sold in local bazaars</p>
                        <p>• Turkish coffee – Rich, strong, and served in cafés across the city</p>
                        <p>
                            Nicosia offers an authentic taste of Cypriot culture, both in its food and atmosphere.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Food in Lefkoşa"
                            width={300}
                            height={200}
                            className="image"
                        />
                    </div>
                </section>
                <br />
                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Girne: Coastal Cuisine & Carob Delights</h2>
                        <p>
                            Kyrenia, located by the sea, is famous for its fresh seafood, relaxed harbor dining, and traditional sweets. The influence of coastal life shines in every bite.
                        </p>

                        <p>• Grilled seabass and calamari – Often served with olive oil and lemon</p>
                        <p>• Halloumi cheese with wild herbs – Locally produced and lightly grilled</p>
                        <p>• Carob molasses desserts – Such as carob cake and carob syrup-drizzled pastries</p>
                        <p>• Zivania – A strong Cypriot spirit served cold with meze or grilled meats</p>
                        <p>
                            Dining in Kyrenia blends stunning views with fresh, sea-inspired flavors.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Seafood in Girne"
                            width={300}
                            height={200}
                            className="image"
                        />
                    </div>
                </section>
                <br />
                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Karpaz: Simple Ingredients, Deep Flavor</h2>
                        <p>
                            The Karpaz Peninsula is known for its natural simplicity, and the cuisine reflects this with farm-to-table freshness and slow, outdoor meals.
                        </p>

                        <p>• Grilled lamb kebabs and whole fresh fish, often caught the same day</p>
                        <p>• Halloumi with mint – Made locally, often served uncooked or lightly fried</p>
                        <p>• Homemade jams – Especially citrus marmalade, carob syrup, and wild honey</p>
                        <p>• Organic olives and seasonal greens – Served with olive oil and lemon</p>
                        <p>
                            Dining in Karpaz means enjoying food slowly, under olive trees or beside the sea, in tune with the land.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Traditional food in Karpaz"
                            width={300}
                            height={200}
                            className="image"
                        />
                    </div>
                </section>
                <br />
                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Mağusa: Historic Bites & Hearty Meals</h2>
                        <p>
                            Famagusta combines history and flavor, with meals served in stone-arched taverns or courtyard cafés near ancient ruins.
                        </p>

                        <p>• Şeftali kebabı – A Cypriot sausage made from lamb and wrapped in caul fat</p>
                        <p>• Molohiya – A traditional stew made from jute leaves and chicken or lamb</p>
                        <p>• Macun – Thick, sweet spoon desserts in flavors like rose, walnut, and quince</p>
                        <p>• Lokma – Fried dough balls soaked in syrup, especially enjoyed during festivals</p>
                        <p>
                            Famagusta’s dishes are comforting, rich in tradition, and perfect after a day of exploring ruins or beaches.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Cuisine in Mağusa"
                            width={300}
                            height={200}
                            className="image"
                        />
                    </div>
                </section>
                <br />
                <section className="about-section">
                    <div className="about-text">
                        <h2 className="section-title">Güzelyurt: Farm Fresh & Citrus-Rich</h2>
                        <p>
                            Known as the agricultural capital of North Cyprus, Güzelyurt’s cuisine is built on village cooking and citrus produce.
                        </p>
                        <p>• Gözleme – Freshly made flatbread stuffed with cheese, potato, or herbs</p>
                        <p>• Molohiya and şeftali kebabı – Common in village kitchens</p>
                        <p>• Fresh citrus juice – Especially orange and grapefruit, straight from the groves</p>
                        <p>• Citrus jams, fruit preserves, and carob sweets – Often sold at local markets</p>
                        <p>
                            With its farming roots, Güzelyurt offers food that is rustic, fresh, and full of homemade flavor.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="/beach.jpg"
                            alt="Local food in Güzelyurt"
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

export default Cuisine;
