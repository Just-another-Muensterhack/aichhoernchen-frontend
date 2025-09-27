"use client";

import {useState} from "react";
import {Header} from "@/components/Header";
import {ProgressIndicator} from "@/components/found/ProgressIndicator";
import {Step1_Image} from "@/components/found/Step1_Image";
import {Step2_Location} from "@/components/found/Step2_Location";
import {Step3_Details} from "@/components/found/Step3_Details";
import {SuccessScreen} from "@/components/found/SuccessScreen";

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
    const [currentStep, setCurrentStep] = useState(0);
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

    const isPhotoValid = !!formData.caption
    const isLocationValid = !!formData.location
    const isContactValid = !!formData.finderEmail && !!formData.finderPhone && !!formData.finderName
    const stepValidityMap: Record<number, boolean> = {
        0: isPhotoValid,
        1: isLocationValid,
        2: isContactValid,
    }
    const isValid = isPhotoValid && isLocationValid && isContactValid

    const updateFormData = (newData: Partial<FoundItemData>) => {
        setFormData(prev => ({...prev, ...newData}));
    };

    const handleNext = () => setCurrentStep(prev => prev < 2 ? prev + 1: 2);
    const handlePrevious = () => setCurrentStep(prev => prev > 0 ? prev - 1 : 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting data:", formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header/>
                <SuccessScreen/>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main>
                <div className="flex-row-0 items-center justify-center mb-12">
                    <ProgressIndicator
                        steps={[
                            {name: 'Foto', isValid: isPhotoValid},
                            {name: 'Fundort', isValid: isLocationValid},
                            {name: 'Kontaktdaten', isValid: isContactValid},
                        ]}
                        currentStep={currentStep}
                        onChangeStep={(index) => setCurrentStep(index)}
                    />
                </div>

                <div className="card w-full min-h-200">
                    <form>
                        {currentStep === 0 && <Step1_Image formData={formData} updateFormData={updateFormData}/>}
                        {currentStep === 1 && <Step2_Location formData={formData} updateFormData={updateFormData}/>}
                        {currentStep === 2 && <Step3_Details formData={formData} updateFormData={updateFormData}/>}

                        <div className="mt-8 pt-5 flex justify-between items-center">
                            <div>
                                {currentStep > 0 && (
                                    <button
                                        onClick={handlePrevious}
                                        className="bg-secondary border-secondary"
                                        disabled={!stepValidityMap[currentStep]}
                                    >
                                        Zurück
                                    </button>
                                )}
                            </div>
                            <div>
                                {currentStep < 2 && (
                                    <button
                                        onClick={handleNext}
                                        disabled={!stepValidityMap[currentStep]}
                                    >
                                        Weiter
                                    </button>
                                )}
                                {currentStep === 2 && (
                                    <button
                                        className="bg-positive border-positive"
                                        disabled={!isValid}
                                        onClick={handleSubmit}
                                    >
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
