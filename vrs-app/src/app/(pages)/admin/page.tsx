'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Modal from '../../../components/Modal/Modal';
import './businesses_customers.css';

type Business = {
    SellerID: number;
    BusinessName: string;
    Industry: string;
    ContactPersonName: string;
    ContactPersonSurname: string;
    BusinessEmail: string;
    BusinessCity: string;
    BusinessAddress: string;
    Password: string;
    BusinessPhone: string;
    Approved: boolean | null;
};

type Customer = {
    CustomerID: number;
    CustomerName: string;
    CustomerSurname: string;
    DateOfBirth: string;
    CustomerEmail: string;
    CustomerPhone: string;
    CustomerPassword: string;
};

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalData, setModalData] = useState<Business | Customer | null>(null);
    const [modalType, setModalType] = useState<'business' | 'customer'>('business');
    const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'disapproved' | 'pending'>('all');

    useEffect(() => {
        if (status !== 'authenticated') return;
        if (!session?.user?.isAdmin) {
            router.push('/');
        }
    }, [status, session, router]);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.isAdmin) {
            fetchData();
        }
    }, [status, session]);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/admin');

            const data: {
                businesses: (Omit<Business, 'Approved'> & { Approved: number | null })[];
                customers: Customer[];
            } = await response.json();

            const normalizedBusinesses: Business[] = data.businesses.map((b) => ({
                ...b,
                Approved: b.Approved === 1 ? true : b.Approved === 0 ? false : null,
            }));

            setBusinesses(normalizedBusinesses);
            setCustomers(data.customers || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEdit = (item: Business | Customer, type: 'business' | 'customer') => {
        setModalData(item);
        setModalType(type);
    };

    const handleApprove = async (id: number) => {
        await fetch('/api/admin', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, action: 'approve' }),
        });
        fetchData();
    };

    const handleDisapprove = async (id: number) => {
        await fetch('/api/admin', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, action: 'disapprove' }),
        });
        fetchData();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusFilterChange = (status: 'all' | 'approved' | 'disapproved' | 'pending') => {
        setFilterStatus(status);
    };

    const filteredBusinesses = businesses.filter((business) => {
        const matchesSearch =
            business.BusinessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            business.ContactPersonName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            filterStatus === 'all'
                ? true
                : filterStatus === 'approved'
                ? business.Approved === true
                : filterStatus === 'disapproved'
                ? business.Approved === false
                : business.Approved === null;

        return matchesSearch && matchesStatus;
    });

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.CustomerSurname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session?.user?.isAdmin) {
        return null;
    }

    return (
        <div className="admin-page">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search businesses or customers..."
                className="search-bar"
            />

            <div className="status-filter">
                {['all', 'approved', 'disapproved'].map((statusOption) => (
                    <button
                        key={statusOption}
                        className={`filter-button ${filterStatus === statusOption ? 'active' : ''}`}
                        onClick={() => handleStatusFilterChange(statusOption as typeof filterStatus)}
                    >
                        {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                    </button>
                ))}
            </div>

            <h2>Businesses</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Business Name</th>
                        <th>Contact Person</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBusinesses.map((business) => (
                        <tr key={business.SellerID}>
                            <td>{business.BusinessName}</td>
                            <td>{business.ContactPersonName} {business.ContactPersonSurname}</td>
                            <td>{business.BusinessEmail}</td>
                            <td>{business.BusinessCity}</td>
                            <td>
                                {business.Approved === true
                                    ? 'Approved'
                                    : business.Approved === false
                                    ? 'Disapproved'
                                    : 'Pending'}
                            </td>
                            <td className="button-group">
                                <button onClick={() => handleEdit(business, 'business')}>Edit</button>
                                <button onClick={() => handleApprove(business.SellerID)}>Approve</button>
                                <button onClick={() => handleDisapprove(business.SellerID)}>Disapprove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Customers</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.CustomerID}>
                            <td>{customer.CustomerName} {customer.CustomerSurname}</td>
                            <td>{customer.CustomerEmail}</td>
                            <td>{customer.CustomerPhone}</td>
                            <td>{customer.DateOfBirth ? new Date(customer.DateOfBirth).toLocaleDateString() : '-'}</td>
                            <td className="button-group">
                                <button onClick={() => handleEdit(customer, 'customer')}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalData && (
                <Modal
                    type={modalType}
                    data={modalData}
                    onClose={() => setModalData(null)}
                    onUpdate={fetchData}
                />
            )}
        </div>
    );
}
