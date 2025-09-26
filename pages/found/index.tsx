"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProgressIndicator } from "@/components/found/ProgressIndicator";
import { Step1_Image } from "@/components/found/Step1_Image";
import { Step2_Location } from "@/components/found/Step2_Location";
import { Step3_Details } from "@/components/found/Step3_Details";
import { SuccessScreen } from "@/components/found/SuccessScreen";

export interface FoundItemData {
    imageFile: File | null;
    imageUrl: string;
    caption: string;
    location: string;
    finderName: string;
    finderEmail: string;
    finderPhone?: string;
}

export default function FoundPage() {
    const [currentStep, setCurrentStep] = useState(1);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState<FoundItemData>({
        imageFile: null,
        imageUrl: "",
        caption: "",
        location: "",
        finderName: "",
        finderEmail: "",
        finderPhone: "",
    });

    const updateFormData = (newData: Partial<FoundItemData>) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const handleNext = () => setCurrentStep(prev => prev < 3 ? prev + 1 : 3);
    const handlePrevious = () => setCurrentStep(prev => prev > 1 ? prev - 1 : 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting data:", formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <SuccessScreen />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow w-full max-w-full py-12 px-2 sm:px-6 lg:px-8">
                <div className="mb-12 mx-auto">
                    <ProgressIndicator currentStep={currentStep} />
                </div>

                <div className="bg-surface p-8 rounded-xl shadow-md">
                    <form onSubmit={handleSubmit}>
                        {currentStep === 1 && <Step1_Image formData={formData} updateFormData={updateFormData} />}
                        {currentStep === 2 && <Step2_Location formData={formData} updateFormData={updateFormData} />}
                        {currentStep === 3 && <Step3_Details formData={formData} updateFormData={updateFormData} />}

                        <div className="mt-8 pt-5 border-t border-gray-200 flex justify-between items-center">
                            <div>
                                {currentStep > 1 && (
                                    <button type="button" onClick={handlePrevious} className="px-4 py-2 text-sm font-medium bg-secondary rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Zurück
                                    </button>
                                )}
                            </div>
                            <div>
                                {currentStep < 3 && (
                                    <button type="button" onClick={handleNext} className="px-4 py-2 text-sm font-medium bg-primary rounded-md shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Weiter
                                    </button>
                                )}
                                {currentStep === 3 && (
                                    <button type="submit" className="px-4 py-2 text-sm font-medium bg-positive border border-transparent rounded-md shadow-sm hover:bg-positive focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-positive">
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
