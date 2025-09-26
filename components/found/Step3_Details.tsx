import type { FoundItemData } from '@/pages/found/index';

interface Step3Props {
    formData: FoundItemData;
    updateFormData: (data: Partial<FoundItemData>) => void;
}

export function Step3_Details({ formData, updateFormData }: Step3Props) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium">Deine Kontaktdaten</h2>
                <p className="mt-1 text-sm text-description">Diese Information wird erhoben, damit die Person auch mit dir in Kontakt treten kann.<br />Die Daten werden nicht veröffentlicht.</p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                    <label htmlFor="finderName" className="block text-sm font-medium">
                        Dein Name <span className="text-primary">*</span>
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="finderName"
                            id="finderName"
                            autoComplete="name"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={formData.finderName}
                            onChange={(e) => updateFormData({ finderName: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="finderEmail" className="block text-sm font-medium">
                        Email Adresse <span className="text-primary">*</span>
                    </label>
                    <div className="mt-1">
                        <input
                            id="finderEmail"
                            name="finderEmail"
                            type="email"
                            autoComplete="email"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={formData.finderEmail}
                            onChange={(e) => updateFormData({ finderEmail: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="finderPhone" className="block text-sm font-medium">
                        Telefonnummer <span className="text-description">(Optional)</span>
                    </label>
                    <div className="mt-1">
                        <input
                            type="tel"
                            name="finderPhone"
                            id="finderPhone"
                            autoComplete="tel"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={formData.finderPhone}
                            onChange={(e) => updateFormData({ finderPhone: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
