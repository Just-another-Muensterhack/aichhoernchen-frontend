"use client"

import {Header} from "@/components/Header";
import {useState} from "react";
import {ClockIcon, HouseIcon, MapPin, Phone, SearchIcon} from "lucide-react";
import {faker} from "@faker-js/faker/locale/de";
import {useQuery} from "@tanstack/react-query";

export default function Home() {
    const [search, setSearch] = useState("");

    const {data, isError, isLoading, isFetching, isSuccess, refetch} = useQuery({
        queryKey: [],
        queryFn: async ()  => {
            await new Promise(res => setTimeout(res, 2000));
            return Array.from({length: 30}).map(() => {
                const name = faker.vehicle.bicycle()
                return {
                    lat: faker.location.latitude(),
                    long: faker.location.longitude(),
                    name,
                    shortTitle: name,
                    longTitle: name + " " + faker.string.uuid(),
                    description: faker.lorem.paragraphs(2),
                    timestamp: faker.date.past({years: 1}),
                    deposit: {
                        name: faker.company.name(),
                        address: faker.location.streetAddress(),
                        email: faker.internet.email(),
                        lat: faker.location.latitude(),
                        long: faker.location.longitude(),
                        link: faker.internet.url(),
                        phone: faker.phone.number(),
                    },
                    finder: {
                        name: faker.person.fullName(),
                        email: faker.internet.email(),
                        phone: faker.phone.number(),
                    }
                }
            })
        },
    })

    return (
        <div className={"flex-col-0"}>
            <Header/>
            <main className={"flex-col-6"}>
                <div className={"flex-col-8 w-full px-6 py-10 rounded-lg tablet:px-12 tablet:py-10 bg-primary/30"}
                     role={"group"}>
                    <span id={"search-label"} className={"title-lg"}>
                        {"Finde deine verlorenen Gegenstände!"}
                    </span>
                    <div className={"flex-col-2 items-end desktop:flex-row-2 desktop:justify-start"}>
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
                                            <span className={"title-md truncate"}>
                                                {item.longTitle}
                                            </span>
                                            <div className={"flex-col-2 justify-between desktop:flex-row-2"}>
                                                <div className={"flex-col-2 gap-y-2 desktop:min-w-64"}>
                                                    <div className={"flex-row-2 items-center"}>
                                                        <ClockIcon className={"text-description min-w-6 min-h-6"}/>
                                                        <span>{item.timestamp.toLocaleString()}</span>
                                                    </div>
                                                    <div className={"flex-row-2"}>
                                                        <HouseIcon className={"text-description min-w-6 min-h-6"}/>
                                                        <span>{item.deposit.name}</span>
                                                    </div>
                                                    <div className={"flex-row-2"}>
                                                        <MapPin className={"text-description min-w-6 min-h-6"}/>
                                                        <span>{item.deposit.address}</span>
                                                    </div>
                                                    <div className={"flex-row-2"}>
                                                        <Phone className={"text-description min-w-6 min-h-6"}/>
                                                        <span>{item.deposit.phone}</span>
                                                    </div>
                                                </div>
                                                <div className={"flex-col-1 justify-between items-end"}>
                                                    <p className={"text-description w-full max-w-full max-h-18 overflow-hidden overflow-ellipsis"}>{item.description}</p>
                                                    <button
                                                        onClick={() => {
                                                            // TODO
                                                        }}
                                                        className={"float-right"}
                                                    >
                                                        {"Mehr"}
                                                    </button>
                                                </div>
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
