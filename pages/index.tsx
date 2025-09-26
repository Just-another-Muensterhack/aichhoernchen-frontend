import {Header} from "@/components/Header";
import {useState} from "react";
import {SearchIcon} from "lucide-react";

export default function Home() {
    const [search, setSearch] = useState("");

    return (
        <div className={"flex-col-0"}>
            <Header/>
            <div className={"h-full w-full py-12 px-8"}>
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
                        <button className="icon-button">
                            <SearchIcon/>
                        </button>
                    </div>
                </div>
            </div>
            {}
        </div>
    );
}
