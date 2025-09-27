import {Check, TriangleAlert} from 'lucide-react';
import clsx from "clsx";

interface Step {
    name: string,
    isValid: boolean,
}

interface ProgressIndicatorProps {
    currentStep: number;
    reachedStep: number;
    steps: Step[],
    onChangeStep: (index: number, step: Step) => void,
}

export function ProgressIndicator({currentStep, steps, onChangeStep, reachedStep}: ProgressIndicatorProps) {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, index) => {
                    const hasReachedStep = index <= reachedStep;
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
                                            "border-negative": hasReachedStep && !isAtStep && !step.isValid,
                                            "border-primary/60": hasReachedStep && !isAtStep && step.isValid,
                                            "border-primary": isAtStep,
                                        }
                                    )}
                                >
                                    {hasReachedStep && !isAtStep && (step.isValid ? (
                                        <Check className="min-h-4 w-4 text-positive" aria-hidden="true"/>
                                    ) : (
                                        <TriangleAlert className="min-h-4 w-4 text-negative" aria-hidden="true"/>
                                    ))}
                                    {isAtStep && (<div className={"w-4 h-4 rounded-full bg-primary"}/>)}
                                    <span className="sr-only">{step.name}</span>
                                </button>
                                <span
                                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-foreground"
                                    aria-hidden={true}
                                >
                                    {step.name}
                                </span>
                            </li>
                            {index < steps.length - 1 && (
                                <div
                                    className={clsx(
                                        "w-16 h-1",
                                        {
                                            "bg-primary": index <= reachedStep - 1,
                                            "bg-disabled": index > reachedStep - 1,
                                        }
                                    )}
                                />
                            )}
                        </>
                    )
                })}
            </ol>
        </nav>
    );
}
