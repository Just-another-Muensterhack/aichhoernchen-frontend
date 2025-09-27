"use client"

import { Header } from "@/components/Header";
import { useState } from "react";
import { ClockIcon, HouseIcon, MapPin, Phone, SearchIcon } from "lucide-react";
import { useGetFoundObjectsQuery } from "@/api/gql/generated";

export default function Home() {
    const [search, setSearch] = useState("");

    const variables = {
        filters: {
            search,
            distance: { lat: 1.5, long: 1.5, distance: 1000005 },
        },
        pagination: { offset: 0, limit: 3 },
    };

    const { data, isError, isLoading, isFetching, isSuccess, refetch } = useGetFoundObjectsQuery(variables);

    return (
        <div className={"flex-col-0 items-center overflow-y-scroll"}>
            <Header />
            <main className={"flex-col-6"}>
                <div className={"card w-full bg-primary/30"}
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
                            <SearchIcon className={"w-5 h-5"} />
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
                            (data.foundObjects.length ?
                                data.foundObjects.map((item, i) => (
                                    <li key={i} className={"card"}>
                                        <span className={"title-md truncate"}>
                                            {item.longTitle}
                                        </span>
                                        <div className={"flex-col-4 justify-between"}>
                                            <div className={"flex-col-2 gap-y-2 tablet:grid tablet:grid-cols-2"}>
                                                <div className={"flex-row-2 items-center"}>
                                                    <ClockIcon className={"text-description min-w-6 min-h-6"} />
                                                    <span>{item.timestamp.toLocaleString()}</span>
                                                </div>
                                                <div className={"flex-row-2"}>
                                                    <HouseIcon className={"text-description min-w-6 min-h-6"} />
                                                    <span>{item.longTitle}</span>
                                                </div>
                                                <div className={"flex-row-2"}>
                                                    <MapPin className={"text-description min-w-6 min-h-6"} />
                                                    <span>{item.longTitle}</span>
                                                </div>
                                                <div className={"flex-row-2"}>
                                                    <Phone className={"text-description min-w-6 min-h-6"} />
                                                    <span>{item.longTitle}</span>
                                                </div>
                                            </div>
                                            <p className={"text-description w-full max-w-full max-h-18 overflow-hidden overflow-ellipsis"}>{item.description}</p>
                                            <div className={"flex-row-0 justify-end"}>
                                                <button
                                                    onClick={() => {
                                                        // TODO
                                                    }}
                                                    className={"w-min"}
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
