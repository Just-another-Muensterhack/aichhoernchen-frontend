"use client";

import {useEffect, useState} from "react";
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
    time: string;
}

export default function FoundPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [reachedStep, setReachedStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState<FoundItemData>({
        imageFile: null,
        imageUrl: "",
        caption: "",
        location: "",
        finderName: "",
        finderEmail: "",
        finderPhone: "",
        time: new Date().toISOString().slice(0, 19),
    });

    const isPhotoValid = !!formData.caption
    const isLocationValid = !!formData.location && !!formData.time
    const isContactValid = !!formData.finderEmail && !!formData.finderPhone && !!formData.finderName
    const isValid = isPhotoValid && isLocationValid && isContactValid

    const updateFormData = (newData: Partial<FoundItemData>) => {
        setFormData(prev => ({...prev, ...newData}));
    };

    const handleNext = () => setCurrentStep(prev => prev < 2 ? prev + 1 : 2);
    const handlePrevious = () => setCurrentStep(prev => prev > 0 ? prev - 1 : 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.info("Submitting data:", formData);
        setIsSubmitted(true);
    };

    useEffect(() => {
        setReachedStep(Math.min(Math.max(currentStep, reachedStep, 0), 2))
    }, [currentStep])

    if (isSubmitted) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header/>
                <SuccessScreen/>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen items-center overflow-y-scroll">
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
                        reachedStep={reachedStep}
                        onChangeStep={(index) => setCurrentStep(index)}
                    />
                </div>

                <div className="card gap-y-8 w-full justify-between min-h-200">
                    {currentStep === 0 && <Step1_Image formData={formData} updateFormData={updateFormData}/>}
                    {currentStep === 1 && <Step2_Location formData={formData} updateFormData={updateFormData}/>}
                    {currentStep === 2 && <Step3_Details formData={formData} updateFormData={updateFormData}/>}

                    <div className="mt-8 pt-5 flex justify-between items-center">
                        <div>
                            {currentStep > 0 && (
                                <button
                                    onClick={handlePrevious}
                                    className="bg-secondary border-secondary"
                                >
                                    Zurück
                                </button>
                            )}
                        </div>
                        <div>
                            {currentStep < 2 && (
                                <button onClick={handleNext}>
                                    Weiter
                                </button>
                            )}
                            {currentStep === 2 && (
                                <button
                                    className="not-disabled:bg-positive not-disabled:border-positive"
                                    disabled={!isValid}
                                    onClick={handleSubmit}
                                >
                                    Fund melden
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
