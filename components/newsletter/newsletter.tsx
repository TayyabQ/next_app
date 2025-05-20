"use client";

import Form from "../form";
import { useState } from "react";

export default function NewsLetter() {
    const [showForm, setShowForm] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleSubscribeClick = () => {
        setShowForm(true);
        setSubmissionStatus(null);
    };

    const handleFormSubmit = async (formData: { name: string; email: string }) => {
        setSubmissionStatus(null);
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json(); 
            if (!response.ok) {
                throw new Error(result.error || `Server responded with ${response.status}`);
            }

            console.log("Subscription successful:", result);
            setSubmissionStatus({ message: result.message || `Thank you for subscribing, ${formData.name}!`, type: 'success' });
            setShowForm(false);

        } catch (error: any) {
            console.error("Subscription submission failed:", error);
            setSubmissionStatus({ message: error.message || "Subscription failed. Please try again.", type: 'error' });
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSubmissionStatus(null);
    };

    return (
        <>
            <div className="relative flex flex-col min-h-screen w-full md:max-w-[640px] md:min-h-[720px] md:mx-auto md:my-8 md:rounded-xl bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] overflow-hidden shadow-2xl">
                <div className="flex-grow flex flex-col justify-center items-center p-6 sm:p-8 text-center z-10">
                    <img src="/NewsletterFrame.png" alt="Message Icon" width={64} height={64} className="mb-6"/>
                    <h1 className="font-semibold text-4xl text-white mb-3">Join Our Newsletter</h1>
                    <p className="text-lg text-neutral-100 mb-8">Stay updated with our latest news and offers!</p>
                    <button
                        onClick={handleSubscribeClick}
                        className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out shadow-md"
                    >
                        Subscribe Now
                    </button>
                    {submissionStatus && !showForm && (
                        <p className={`mt-4 text-sm ${submissionStatus.type === 'success' ? 'text-green-100 font-semibold' : 'text-red-200 font-semibold'}`}>
                            {submissionStatus.message}
                        </p>
                    )}
                </div>

                {showForm && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center z-20 p-4 backdrop-blur-sm">
                        <Form
                            nameLabel="Your Name"
                            emailLabel="Your Email Address"
                            onSubmit={handleFormSubmit}
                            onClose={handleFormClose}
                        />
                        {submissionStatus && submissionStatus.type === 'error' && (
                             <p className="mt-4 text-sm text-red-700 bg-red-100 p-3 rounded-md shadow">
                                Error: {submissionStatus.message}
                            </p>
                        )}
                    </div>
                )}

                <div className="absolute bottom-0 left-0 p-3 sm:p-5 opacity-80">
                    <img src="/NewsletterIcon.png" alt="Decorative newsletter graphic" width={185} height={181} className="w-28 h-auto sm:w-36 md:w-[185px]"/>
                </div>
            </div>
        </>
    );
}