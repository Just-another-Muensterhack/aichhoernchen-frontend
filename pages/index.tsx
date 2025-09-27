"use client"

import {Header} from "@/components/Header";
import {ReactNode, useState} from "react";
import {
    BadgeAlert,
    ClockIcon,
    ExternalLinkIcon,
    HouseIcon,
    Mail,
    MapPin,
    Phone,
    SearchIcon,
    VerifiedIcon,
} from "lucide-react";
import {faker} from "@faker-js/faker/locale/de";
import {useQuery} from "@tanstack/react-query";
import {FoundObject} from "@/api/models/FoundObject";
import clsx from "clsx";

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

type InfoTileProps = {
    icon: ReactNode
    label: string
    value: string
    link?: string
}

export function InfoTile({icon, label, value, link}: InfoTileProps) {
    const content = link ? (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={"font-normal text-base flex-row-0.5 items-center"}
        >
            {value}
            <ExternalLinkIcon className={"w-4 h-4"}/>
        </a>
    ) : (
        <span>{value}</span>
    )

    return (
        <div className="flex flex-row justify-between">
            <span className="flex flex-row items-center font-bold gap-2">
                {icon}
                {label}
            </span>
            {content}
        </div>
    )
}

export default function Home() {
    const [search, setSearch] = useState("");

    const {data, isError, isLoading, isFetching, isSuccess, refetch} = useQuery({
        queryKey: [],
        queryFn: async () => {
            await new Promise(res => setTimeout(res, 2000));
            return Array.from({length: 30}).map<FoundObject>((_, i) => {
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
                    isVerified: i <= 10,
                }
            })
        },
    })

    return (
        <div className={"flex-col-0 items-center overflow-y-scroll"}>
            <Header/>
            <main className={"flex-col-6"}>
                <div
                    className={"card w-full bg-primary/30"}
                    role={"group"}
                >
                    <span id={"search-label"} className={"title-lg"}>
                        {"Du hast etwas verloren?"}
                    </span>
                    <div className={"flex-col-4 items-end desktop:flex-row-2 desktop:justify-start"}>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={"z.B. schwarzes Fahrrad mit grüner Quietschhupe und einem gelben Sticker"}
                            className={"w-full rounded-full min-h-10"}
                            aria-labelledby={"search-label"}
                        />
                        <button className="flex-row-2 rounded-full w-min" onClick={() => refetch()}>
                            <SearchIcon className={"w-5 h-5"}/>
                            Suche
                        </button>
                    </div>
                </div>
                <div className={"flex-col-2 w-full"}>
                    <h2 className={"title-lg"}>{"Ergebnisse"}</h2>
                    <ul className={"flex-col-4"}>
                        {(isLoading || isFetching) && (
                            <li className={"card justify-center items-center"}>
                                {"Loading..."}
                            </li>
                        )}
                        {isSuccess && data &&
                            (data.length ?
                                    data.map((item, i) => (
                                        <li key={i} className={"card"}>
                                            <div className={"flex-row-4 items-center justify-between"}>
                                                <span className={"title-md truncate"}>
                                                    {item.shortTitle}
                                                </span>
                                                <div
                                                    className={clsx("flex-row-1 items-center rounded-full px-2 py-1", {
                                                        "bg-positive text-on-positive": item.isVerified,
                                                        "bg-negative/40 text-on-negative": !item.isVerified
                                                    })}
                                                >
                                                    {item.isVerified ? (
                                                        <VerifiedIcon className={"w-5 h-5"}/>
                                                    ) : (
                                                        <BadgeAlert className={"w-5 h-5"}/>
                                                    )}
                                                    <span className={"text-sm"}>{item.isVerified ? "Verifiziert" : "Nicht Verifiziert"}</span>
                                                </div>
                                            </div>
                                            <div className={"flex-col-4 justify-between"}>
                                                <div
                                                    className={"flex-col-2 gap-y-2 tablet:grid tablet:grid-cols-2 tablet:gap-x-8"}>
                                                    <InfoTile
                                                        icon={<ClockIcon
                                                            className={"text-description min-w-6 min-h-6"}/>}
                                                        label={"Fundzeitpunkt"}
                                                        value={"ca. " + formatHalfHour(item.timestamp)}
                                                    />
                                                    <InfoTile
                                                        icon={<MapPin className="text-description min-w-6 min-h-6"/>}
                                                        label="Fundort"
                                                        value={`ca. ${item.lat.toFixed(4)}, ${item.long.toFixed(4)}`}
                                                        link={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.long}`}
                                                    />
                                                    <InfoTile
                                                        icon={<HouseIcon className="text-description min-w-6 min-h-6"/>}
                                                        label="Fundbüro"
                                                        value={item.finderName}
                                                    />
                                                    <InfoTile
                                                        icon={<Phone className="text-description min-w-6 min-h-6"/>}
                                                        label="Telefon"
                                                        value={item.finderPhone}
                                                        link={`tel:${item.finderPhone}`}
                                                    />
                                                    <InfoTile
                                                        icon={<Mail className="text-description min-w-6 min-h-6"/>}
                                                        label="Email"
                                                        value={item.finderEmail}
                                                        link={`mailto:${item.finderEmail}`}
                                                    />
                                                </div>
                                                <p className={"text-description w-full max-w-full max-h-18 overflow-hidden overflow-ellipsis"}>{item.description}</p>
                                            </div>
                                        </li>
                                    )) : (
                                        <li className={"card"}>
                                            {"Keine Items gefunden"}
                                        </li>
                                    )
                            )}
                        {isError && (
                            <li className={"card flex-col-2 tablet:flex-row-8 items-end tablet:items-center justify-between bg-negative/20 text-negative"}>
                                <span className={"title-md text-left w-full"}>{"Es ist ein Fehler aufgetreten"}</span>
                                <button className={"w-min float-right"} onClick={() => refetch()}>
                                    {"Erneut versuchen"}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </main>
        </div>
    );
}
