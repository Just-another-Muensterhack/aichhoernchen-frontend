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
                <div className="flex-row-0 items-center justify-center mb-12">
                    <ProgressIndicator currentStep={currentStep} />
                </div>

                <div className="bg-surface py-6 px-8 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        {currentStep === 1 && <Step1_Image formData={formData} updateFormData={updateFormData} />}
                        {currentStep === 2 && <Step2_Location formData={formData} updateFormData={updateFormData} />}
                        {currentStep === 3 && <Step3_Details formData={formData} updateFormData={updateFormData} />}

                        <div className="mt-8 pt-5 flex justify-between items-center">
                            <div>
                                {currentStep > 1 && (
                                    <button type="button" onClick={handlePrevious} className="bg-secondary border-secondary">
                                        Zurück
                                    </button>
                                )}
                            </div>
                            <div>
                                {currentStep < 3 && (
                                    <button type="button" onClick={handleNext}>
                                        Weiter
                                    </button>
                                )}
                                {currentStep === 3 && (
                                    <button type="submit" className="bg-positive border-positive">
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
