import React from 'react';
import './businesses_customers.css';

interface Customer {
    CustomerID: number;
    CustomerName: string;
    CustomerSurname: string;
    DateOfBirth: string;
    CustomerEmail: string;
    CustomerPhone: string;
}

interface CustomersProps {
    customers: Customer[];
    searchTerm: string;
}

const Customers = ({ customers, searchTerm }: CustomersProps) => {
    const filteredCustomers = customers.filter(
        (customer) =>
            customer.CustomerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.CustomerSurname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <table className="customer-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Birthday</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredCustomers.map((customer) => (
                    <tr key={customer.CustomerID}>
                        <td>{customer.CustomerName} {customer.CustomerSurname}</td>
                        <td>{customer.CustomerEmail}</td>
                        <td>{customer.CustomerPhone}</td>
                        <td>{new Date(customer.DateOfBirth).toLocaleDateString()}</td>
                        <td>
                            <button>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Customers;