// app/found/page.tsx
// @ts-nocheck
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProgressIndicator } from "@/components/found/ProgressIndicator";
import { Step1_Image } from "@/components/found/Step1_Image";
import { Step2_Location } from "@/components/found/Step2_Location";
import { Step3_Details } from "@/components/found/Step3_Details";
import { SuccessScreen } from "@/components/found/SuccessScreen";

// Define the structure for all the data we'll collect
export interface FoundItemData {
    imageFile: File | null;
    imageUrl: string;
    caption: string;
    location: string;
    finderName: string;
    finderEmail: string;
    finderPhone?: string; // Optional
}

export default function FoundPage() {
    // State to track the current step (1, 2, or 3)
    const [currentStep, setCurrentStep] = useState(1);

    // State to show the success screen after submission
    const [isSubmitted, setIsSubmitted] = useState(false);

    // A single state object to hold all form data
    const [formData, setFormData] = useState<FoundItemData>({
        imageFile: null,
        imageUrl: "",
        caption: "",
        location: "",
        finderName: "",
        finderEmail: "",
        finderPhone: "",
    });

    // Function to update the form data state
    const updateFormData = (newData: Partial<FoundItemData>) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    // Navigation functions
    const handleNext = () => setCurrentStep(prev => prev < 3 ? prev + 1 : 3);
    const handlePrevious = () => setCurrentStep(prev => prev > 1 ? prev - 1 : 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the formData to your backend API
        console.log("Submitting data:", formData);
        // After successful submission, show the success screen
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Header />
                <SuccessScreen />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow w-full max-w-full py-12 px-2 sm:px-6 lg:px-8">
                <div className="mb-12 mx-auto">
                    <ProgressIndicator currentStep={currentStep} />
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                    <form onSubmit={handleSubmit}>
                        {currentStep === 1 && <Step1_Image formData={formData} updateFormData={updateFormData} />}
                        {currentStep === 2 && <Step2_Location formData={formData} updateFormData={updateFormData} />}
                        {currentStep === 3 && <Step3_Details formData={formData} updateFormData={updateFormData} />}

                        <div className="mt-8 pt-5 border-t border-gray-200 flex justify-between items-center">
                            <div>
                                {currentStep > 1 && (
                                    <button type="button" onClick={handlePrevious} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Zurück
                                    </button>
                                )}
                            </div>
                            <div>
                                {currentStep < 3 && (
                                    <button type="button" onClick={handleNext} className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Weiter
                                    </button>
                                )}
                                {currentStep === 3 && (
                                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        Fund melden
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
