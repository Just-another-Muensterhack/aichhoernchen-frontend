import {Check, TriangleAlert} from 'lucide-react';
import clsx from "clsx";

interface Step {
    name: string,
    isValid: boolean,
}

interface ProgressIndicatorProps {
    currentStep: number;
    steps: Step[],
    onChangeStep: (index: number, step: Step) => void,
}

export function ProgressIndicator({currentStep, steps, onChangeStep}: ProgressIndicatorProps) {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, index) => {
                    const hasReachedStep = index <= currentStep;
                    const isAtStep = index === currentStep;
                    return (
                        <>
                            <li
                                key={step.name}
                                className={`relative`}
                            >
                                <button
                                    disabled={!hasReachedStep}
                                    onClick={() => onChangeStep(index, step)}
                                    className={clsx(
                                        "flex w-8 h-8 max-h-8 max-w-8 px-0 py-0 items-center justify-center rounded-full border-4 bg-input",
                                        {
                                            "border-primary/30": hasReachedStep && !isAtStep,
                                            "border-primary": isAtStep,
                                        }
                                    )}
                                >
                                    {hasReachedStep && !isAtStep && (step.isValid ? (
                                        <Check className="min-h-5 w-5" aria-hidden="true"/>
                                    ) : (
                                        <TriangleAlert className="h-5 w-5" aria-hidden="true"/>
                                    ))}
                                    {isAtStep && (<div className={"w-4 h-4 rounded-full bg-primary"}/>)}
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2">{step.name}</span>
                                </button>
                            </li>
                            {index !== steps.length - 1 && (<div className={"w-16 h-1 bg-primary"}/>)}
                        </>
                    )
                })}
            </ol>
        </nav>
    );
}
