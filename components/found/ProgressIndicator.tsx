import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
    currentStep: number;
}

const steps = [
    { id: 1, name: 'Foto' },
    { id: 2, name: 'Fundort' },
    { id: 3, name: 'Kontaktdaten' },
];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                        {currentStep > step.id ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-primary" />
                                </div>
                                <a href="#" className="relative flex h-8 w-8 items-center justify-center bg-primary rounded-full hover:bg-primary">
                                    <Check className="h-5 w-5 text-white" aria-hidden="true" />
                                    <span className="sr-only text-black-700">{step.name}</span>
                                </a>
                            </>
                        ) : currentStep === step.id ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-primary" />
                                </div>
                                <a href="#" className="relative flex h-8 w-8 items-center justify-center bg-background border-2 border-primary rounded-full" aria-current="step">
                                    <span className="h-2.5 w-2.5 bg-primary rounded-full" aria-hidden="true" />
                                    <span className="sr-only text-gray-700">{step.name}</span>
                                </a>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a href="#" className="group relative flex h-8 w-8 items-center justify-center bg-background border-2 border-gray-300 rounded-full hover:border-gray-400">
                                    <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" aria-hidden="true" />
                                    <span className="sr-only text-gray-700">{step.name}</span>
                                </a>
                            </>
                        )}
                        <p className="absolute -bottom-6 text-xs text-center w-20 -left-6">{step.name}</p>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
