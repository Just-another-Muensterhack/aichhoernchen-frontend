import {Header} from "@/components/Header";
import {
    BadgeAlert,
    ClockIcon,
    HouseIcon,
    Mail,
    MapPin,
    Phone,
    VerifiedIcon,
} from "lucide-react";
import {faker} from "@faker-js/faker/locale/de";
import {useQuery} from "@tanstack/react-query";
import clsx from "clsx";
import {useParams, useSearchParams} from "next/navigation";
import {InfoTile} from "@/pages";
import dynamic from "next/dynamic";
import {useState} from "react";

const Map = dynamic(() => import("@/components/Map"), {
    ssr: false, // disable server-side rendering
});

function formatHalfHour(date: Date) {
    const rounded = new Date(date)
    const minutes = date.getMinutes()
    rounded.setMinutes(minutes < 15 ? 0 : minutes < 45 ? 30 : 0)
    if (minutes >= 45) {
        rounded.setHours(rounded.getHours() + 1)
    }
    rounded.setSeconds(0)
    rounded.setMilliseconds(0)
    return rounded.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
}

export default function Item() {
    const params = useParams()
    const searchParams = useSearchParams()

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const id = (params?.id ?? "") as string
    const key = searchParams.get("key")

    const {data, isError, isLoading, isFetching, isSuccess, refetch} = useQuery({
        queryKey: [],
        queryFn: async () => {
            await new Promise(res => setTimeout(res, 2000));
            const name = faker.vehicle.bicycle()
            return {
                lat: faker.location.latitude(),
                long: faker.location.longitude(),
                name,
                shortTitle: name,
                longTitle: name + " " + faker.string.uuid(),
                description: faker.lorem.paragraphs(2),
                timestamp: faker.date.past({years: 1}),
                finderEmail: faker.internet.email(),
                finderName: faker.company.name(),
                finderPhone: faker.phone.number(),
                isVerified: false,
            }
        },
    })

    return (
        <div className={"flex-col-0 items-center overflow-y-scroll h-screen"}>
            <Header/>
            <main className={"flex-col-6"}>
                {(isLoading || isFetching) && (
                    <div className={"card justify-center items-center"}>
                        {"Laden..."}
                    </div>
                )}
                {isSuccess && data && (
                    <div className={"card w-full"}>
                        <div className={"flex-row-2 items-center"}>
                                <span className={"title-lg truncate"}>
                                    {data.shortTitle}
                                </span>
                            <div
                                className={clsx("flex-row-1 items-center rounded-full px-2 py-1", {
                                    "bg-positive text-on-positive": data.isVerified,
                                    "bg-negative/40 text-on-negative": !data.isVerified
                                })}
                            >
                                {data.isVerified ? (
                                    <VerifiedIcon className={"w-5 h-5"}/>
                                ) : (
                                    <BadgeAlert className={"w-5 h-5"}/>
                                )}
                                <span
                                    className={"text-sm"}>{data.isVerified ? "Verifiziert" : "Nicht Verifiziert"}</span>
                            </div>
                        </div>
                        <div className={"flex-col-2 gap-y-2 tablet:grid tablet:grid-cols-2 tablet:gap-x-8"}>
                            <InfoTile
                                icon={<ClockIcon
                                    className={"text-description min-w-6 min-h-6"}/>}
                                label={"Fundzeitpunkt"}
                                value={"ca. " + formatHalfHour(data.timestamp)}
                            />
                            <InfoTile
                                icon={<MapPin className="text-description min-w-6 min-h-6"/>}
                                label="Fundort"
                                value={`ca. ${data.lat.toFixed(4)}, ${data.long.toFixed(4)}`}
                                link={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.long}`}
                            />
                        </div>
                        <Map position={[data.lat, data.long]}/>

                        <div className={"flex-col-2"}>
                            <span className={"title-sm"}>{"Daten des zuständigen Fundbüros"}</span>
                            <div className={"flex-col-2 gap-y-2 tablet:grid tablet:grid-cols-2 tablet:gap-x-8"}>
                                <InfoTile
                                    icon={<HouseIcon className="text-description min-w-6 min-h-6"/>}
                                    label="Fundbüro"
                                    value={data.finderName}
                                />
                                <InfoTile
                                    icon={<Phone className="text-description min-w-6 min-h-6"/>}
                                    label="Telefon"
                                    value={data.finderPhone}
                                    link={`tel:${data.finderPhone}`}
                                />
                                <InfoTile
                                    icon={<Mail className="text-description min-w-6 min-h-6"/>}
                                    label="Email"
                                    value={data.finderEmail}
                                    link={`mailto:${data.finderEmail}`}
                                />
                            </div>
                        </div>
                        {key && !data.isVerified && (
                            <div className={"flex-row-0 justify-end"}>
                                <button className={"bg-negative border-negative text-on-negative"}
                                        onClick={() => setShowDeleteDialog(true)}>
                                    {"Löschen"}
                                </button>
                            </div>
                        )}
                        {showDeleteDialog && (
                            <dialog
                                className={"fixed w-screen h-screen inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center z-[2000]"}
                                onClick={() => setShowDeleteDialog(false)}
                            >
                                <div
                                    className="card flex-col-4 text-foreground"
                                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                                >
                                    <div className={"flex-col-2"}>
                                        <span className={"title-lg"}>{"Fundeintrag entfernen?"}</span>
                                        <p className={"text-description"}>
                                            {"Wenn du den Eintrag entfernst wird er nicht mehr für andere angezeigt."}
                                        </p>
                                    </div>
                                    <div className={"flex-row-2 justify-end"}>
                                        <button
                                            onClick={() => setShowDeleteDialog(false)}
                                        >
                                            Abbrechen
                                        </button>
                                        <button
                                            className="bg-negative border-negative text-on-negative"
                                            onClick={() => {
                                                /* TODO handle delete */
                                                setShowDeleteDialog(false)
                                            }}
                                        >
                                            Löschen
                                        </button>
                                    </div>
                                </div>
                            </dialog>
                        )}
                    </div>
                )}
                {isError && (
                    <li className={"card flex-col-2 tablet:flex-row-8 items-end tablet:items-center justify-between bg-negative/20 text-negative"}>
                        <span className={"title-md text-left w-full"}>{"Es ist ein Fehler aufgetreten"}</span>
                        <button className={"w-min float-right"} onClick={() => refetch()}>
                            {"Erneut versuchen"}
                        </button>
                    </li>
                )}
            </main>
        </div>
    );
}
