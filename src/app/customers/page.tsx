"use client";

import Table from "../_components/table";
import { useEffect, useState } from "react";
import Customer from "@/entities/customer.entity";
import Link from "next/link";

function Page(){
    const [customers, setCustomers] = useState([]);
    
    const _head = ['Account', 'Customer Name', 'Checking Account', 'Saving Account', 'Action'];

    useEffect(() => {
        fetch('/api/customers')
            .then(res => res.json())
            .then(data => {
                setCustomers(data);
            })
            .catch(err => console.trace(err))
    }, [])

    
    return (
        <>
            <div className="flex flex-col align-middle">
                <div className="flex justify-between mb-10">
                    <div className="">
                        <button onClick={() => window.location.href = '/'} className="border-solid border-blue-700 border-2 rounded p-2 text-blue-700">Go back</button>
                    </div>
                    <div className="">
                        <Link href="/customers/new" className="border-2 justify-end border-blue-700 hover:border-blue-700  hover:bg-blue-700 hover:text-white text-blue-700    font-bold py-2 px-4 rounded flex ">
                            <div className="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                            </div>
                            <div>
                                <span>
                                    New customer
                                </span>
                            </div>
                        </Link>

                    </div>
                </div>
                <Table head={_head} body={customers}/>
            </div>
        </>
    )
}

export default Page;