"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BusinessProfile {
    SellerID: number;
    BusinessName: string;
    Industry: string;
    ContactPersonName: string;
    ContactPersonSurname: string;
    BusinessEmail: string;
    BusinessPhone: string;
    BusinessCity: string;
    Approved: boolean;
}

const AdminPage: React.FC = () => {
    const { data: session, status } = useSession();
    const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchBusinesses = async () => {
            const response = await fetch("/api/admin/businesses");
            const data = await response.json();
            setBusinesses(data.businesses);
        };

        if (status === "authenticated") {
            fetchBusinesses();
        }
    }, [status]);

    const handleApprovalToggle = async (SellerID: number, approved: boolean) => {
        const response = await fetch("/api/admin/businesses", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ SellerID, approved: !approved }),
        });

        if (response.ok) {
            setBusinesses((prevBusinesses) =>
                prevBusinesses.map((business) =>
                    business.SellerID === SellerID
                        ? { ...business, Approved: !approved }
                        : business
                )
            );
        } else {
            alert("Failed to update approval status");
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session || !session.user?.isAdmin) {
        router.push("/profile");
        return null;
    }

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>

            <h2>Business Profiles</h2>
            <table className="business-table">
                <thead>
                    <tr>
                        <th>Business Name</th>
                        <th>Industry</th>
                        <th>Contact Person</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map((business) => (
                        <tr key={business.SellerID}>
                            <td>{business.BusinessName}</td>
                            <td>{business.Industry}</td>
                            <td>{`${business.ContactPersonName} ${business.ContactPersonSurname}`}</td>
                            <td>{business.BusinessEmail}</td>
                            <td>{business.BusinessPhone}</td>
                            <td>{business.BusinessCity}</td>
                            <td>{business.Approved ? "Approved" : "Pending"}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleApprovalToggle(business.SellerID, business.Approved)
                                    }
                                >
                                    {business.Approved ? "Disapprove" : "Approve"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;