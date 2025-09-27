import { PartyPopper } from 'lucide-react';

export function SuccessScreen() {
    return (
        <div className="flex-grow flex items-center justify-center">
            <div className="text-center p-12 rounded-xl shadow-lg max-w-lg mx-auto bg-surface">
                <PartyPopper className="mx-auto h-16 w-16 text-positive" />
                <h2 className="mt-6 text-2xl font-bold tracking-tight">Danke dir!</h2>
                <p className="mt-4 text-lg text-description">
                    Dein Fund wurde erfolgreich aufgenommen.
                </p>
                <div className="mt-8 bg-secondary border-l-4 border-primary p-4 rounded-md">
                    <div className="flex-row-2 items-center">
                        <div className="flex-shrink-0">
                            <h3 className="title-sm  text-primary">Pro-Tipp:</h3>
                        </div>
                        <div className="ml-3 text-left">
                            <p className="text-sm text-primary">
                                Bring deinen Fund doch einfach in das nächste <strong className="font-semibold">Fundbüro</strong>, damit es schnell verfiziert und zu seinem Besitzer finden kann.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
