'use client'

import { useState } from "react";
import InputMask from "react-input-mask";

function Page() {
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        
        const data = {
            customer_name: e.target.customer_name.value,
            initial_amount: e.target.initial_amount.value
        }

        if(data.customer_name === "") {
            handleShowModal()
            return
        }
        
        setLoading(isLoading)

        fetch('/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.error){
                    alert(data.message)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.trace(err.message)
                alert(err.message)
            })
    }

    return (
        <>
            {showModal && <div id="popup-modal" tabIndex={-1} className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-red-600 dark:text-red-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Please, provide the customer name!</h3>
                            
                            <button data-modal-hide="popup-modal" onClick={handleCloseModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="flex flex-col justify-center">
                <div>
                    <button onClick={() => window.location.href = '/'} className="border-solid border-blue-700 border-2 rounded p-2 text-blue-700">Go back</button>
                </div>
                <div className=" border-1 border-b-2 border-black flex py-4">
                    <h1 className="font-weight-bold mx-auto text-center text-2xl">Create new account</h1>
                </div>
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-between my-5 space-x-9">
                            <div className="w-1/2">
                                <label htmlFor="customer_name" className=" inline-block text-right  text-gray-500">Customer Name</label>
                                <input type="text" name="customer_name" id="customer_name" placeholder="John Doe" className="border-b-2 border-gray-400 flex-1 py-2 w-full placeholder-gray-300 outline-none focus:border-blue-700" />
                            </div>

                            <div className="w-1/2">
                                <label htmlFor="initial_amount" className=" inline-block text-right  text-gray-500">Initial amount</label>
                                <input type="number"  name="initial_amount" id="initial_amount" placeholder="0.00" className="border-b-2 border-gray-400 flex-1 py-2 w-full placeholder-gray-300 outline-none focus:border-blue-700" />
                            </div>
                        </div>
                        
                        <div className="text-center">
                            {!isLoading &&  <button className="py-3 px-8 bg-blue-700 text-white font-bold rounded">Submit</button>}
                            {isLoading && <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                <svg aria-hidden="true" role="status" className="disabled read-only inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                </svg>
                                Loading...
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Page;