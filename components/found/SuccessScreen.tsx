import { PartyPopper } from 'lucide-react';

export function SuccessScreen() {
    return (
        <div className="flex-grow flex items-center justify-center">
            <div className="text-center bg-white p-12 rounded-xl shadow-lg max-w-lg mx-auto">
                <PartyPopper className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">Danke dir!</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Dein Fund wurde erfolgreich eingereicht.
                </p>
                <div className="mt-8 bg-blue-50 border-l-4 border-primary p-4 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <h3 className="text-md font-medium text-primary">Pro-Tipp:</h3>
                        </div>
                        <div className="ml-3 text-left">
                            <p className="text-sm text-primary">
                                Bring deinen Fund doch einfach in das nächste <strong className="font-semibold">Fundbüro</strong>. Das ist der offizielle und sicherste Weg, damit das Fundstück den Weg nach Hause findet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
