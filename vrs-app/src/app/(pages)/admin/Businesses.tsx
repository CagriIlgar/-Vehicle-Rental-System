import React from 'react';
import './businesses_customers.css';


interface Business {
    SellerID: number;
    BusinessName: string;
    Industry: string;
    ContactPersonName: string;
    ContactPersonSurname: string;
    BusinessEmail: string;
    BusinessCity: string;
    BusinessAddress: string;
    BusinessPhone: string;
    Approved: boolean;
}

interface BusinessesProps {
    businesses: Business[];
    searchTerm: string;
    statusFilter: string;
    onApprove: (id: number) => void;
    onDisapprove: (id: number) => void;
    onEdit: (id: number) => void;
}

const Businesses = ({
    businesses,
    searchTerm,
    statusFilter,
    onApprove,
    onDisapprove,
    onEdit,
}: BusinessesProps) => {
    const filteredBusinesses = businesses.filter(
        (business) =>
            (business.BusinessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                business.ContactPersonName.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (statusFilter === "all" || (statusFilter === "approved" && business.Approved) || (statusFilter === "disapproved" && !business.Approved))
    );

    return (
        <table className="business-table">
            <thead>
                <tr>
                    <th>Business Name</th>
                    <th>Industry</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredBusinesses.map((business) => (
                    <tr key={business.SellerID}>
                        <td>{business.BusinessName}</td>
                        <td>{business.Industry}</td>
                        <td>{business.ContactPersonName} {business.ContactPersonSurname}</td>
                        <td>{business.BusinessEmail}</td>
                        <td>{business.BusinessPhone}</td>
                        <td>{business.BusinessAddress}</td>
                        <td>{business.BusinessCity}</td>
                        <td>{business.Approved ? "Approved" : "Pending"}</td>
                        <td>
                            <button onClick={() => onApprove(business.SellerID)}>Approve</button>
                            <button onClick={() => onDisapprove(business.SellerID)}>Disapprove</button>
                            <button onClick={() => onEdit(business.SellerID)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Businesses;