import type { FoundItemData } from '@/pages/found';
import {useState} from "react";

interface Step3Props {
    formData: FoundItemData;
    updateFormData: (data: Partial<FoundItemData>) => void;
}

export function Step3_Details({ formData, updateFormData }: Step3Props) {
    const [emailError, setEmailError] = useState("")

    return (
        <div className="space-y-6">
            <div>
                <h2 className="title-lg">Deine Kontaktdaten</h2>
                <p className="mt-1 text-description">Diese Information wird erhoben, damit die Person auch mit dir in Kontakt treten kann. Die Daten werden nicht veröffentlicht.</p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                    <label htmlFor="finderName" className="flex-row-1 items-center title-sm">
                        {"Dein Name"}
                        <span className="text-primary">*</span>
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="finderName"
                            id="finderName"
                            autoComplete="name"
                            className="w-full"
                            placeholder={"z.B. Max Mustermann"}
                            value={formData.finderName}
                            onChange={(e) => updateFormData({ finderName: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="finderEmail" className="flex-row-1 items-center title-sm">
                        {"Email Adresse"}
                        <span className="text-primary">*</span>
                    </label>
                    <div className="mt-1">
                        <input
                            id="finderEmail"
                            name="finderEmail"
                            type="email"
                            autoComplete="email"
                            placeholder={"z.B. test@helpwave.de"}
                            className="w-full"
                            value={formData.finderEmail}
                            onChange={(e) => {
                                const value = e.target.value;
                                updateFormData({ finderEmail: value });

                                // Simple email regex check
                                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                setEmailError(emailPattern.test(value) ? "" : "Bitte eine gültige Email-Adresse eingeben.");
                            }}
                            required
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1">{emailError}</p>
                        )}
                    </div>
                </div>


                <div className="sm:col-span-6">
                    <label htmlFor="finderPhone" className="flex-row-1 items-center title-sm">
                        {"Telefonnummer"}
                        <span className="text-primary">*</span>
                    </label>
                    <div className="mt-1">
                        <input
                            type="tel"
                            name="finderPhone"
                            id="finderPhone"
                            autoComplete="tel"
                            placeholder={"z.B. +49 123 456789"}
                            className="w-full"
                            value={formData.finderPhone}
                            onChange={(e) => updateFormData({ finderPhone: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
