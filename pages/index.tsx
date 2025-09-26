import {Header} from "@/components/Header";
import {useState} from "react";
import {ClockIcon, HouseIcon, MapPin, Phone, SearchIcon} from "lucide-react";
import {faker} from "@faker-js/faker/locale/de";
import {FoundObject} from "@/api/models/FoundObject";

const items: FoundObject[] = Array.from({length: 30}).map(() => {
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

export default function Home() {
    const [search, setSearch] = useState("");

    return (
        <div className={"flex-col-0"}>
            <Header/>
            <div className={"flex-col-6 h-full w-full py-12 px-8"}>
                <div className={"flex-col-2"} role={"group"}>
                    <span id={"search-label"} className={"font-bold text-2xl"}>
                        {"Finde deine verlorenen Gegenstände!"}
                    </span>
                    <div className={"flex-row-2"}>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={"z.B. schwarzes Fahrrad mit grüner Quietschhupe und einem gelben Sticker"}
                            className={"w-full max-w-[60vh]"}
                            aria-labelledby={"search-label"}
                        />
                        <button className="flex-row-2">
                            <SearchIcon className={"min-w-6 min-h-6"}/>
                            Suche
                        </button>
                    </div>
                </div>
                <div className={"flex-col-2"}>
                    <h2 className={"text-xl font-bold"}>{"Ergebnisse"}</h2>
                    <ul className={"flex-col-4"}>
                        {items.map((item, i) => (
                            <li key={i} className={"flex-col-1 w-full bg-surface py-6 px-8 rounded-lg"}>
                                <span
                                    className={"text-2xl font-semibold leading-[var(--size-default)] truncate"}
                                >
                                    {item.longTitle}
                                </span>
                                <div className={"flex-row-2 justify-between"}>
                                    <div className={"flex-col-2 gap-y-2 min-w-64"}>
                                        <div className={"flex-row-2 items-center"}>
                                            <ClockIcon className={"min-w-6 min-h-6"}/>
                                            <span>{item.timestamp.toLocaleString()}</span>
                                        </div>
                                        <div className={"flex-row-2"}>
                                            <HouseIcon className={"min-w-6 min-h-6"}/>
                                            <span>{item.deposit.name}</span>
                                        </div>
                                        <div className={"flex-row-2"}>
                                            <MapPin className={"min-w-6 min-h-6"}/>
                                            <span>{item.deposit.address}</span>
                                        </div>
                                        <div className={"flex-row-2"}>
                                            <Phone className={"min-w-6 min-h-6"}/>
                                            <span>{item.deposit.phone}</span>
                                        </div>
                                    </div>
                                    <div className={"flex-col-1 justify-between items-end"}>
                                        <p className={"text-description w-full max-h-18 overflow-hidden overflow-ellipsis"}>{item.description}</p>
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
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
