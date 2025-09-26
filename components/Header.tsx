import Image from "next/image";

export const Header = () => {
    return (
        <header className={"flex-row-0 justify-between h-16 max-h-16 px-6 py-4"}>
            <h1 className={"flex-row-2 justify-center items-center"}>
                <Image src={"favicon.ico"} alt={"AIhörnchen Logo, ein Eichhörnchen"} width={32} height={32} />
                <span className={"text-xl font-semibold"}>
                    <span className={"text-primary text-2xl"}>AI</span>
                    {"chhörnchen"}
                </span>
            </h1>
            <nav className={"flex-row-0 items-center justify-center"}>
                <ul className={"flex-row-4"}>
                    <li>
                        <a href={"/search"}>Suche</a>
                    </li>
                    <li>
                        <a href={"/found"}>Abgabe</a>
                    </li>
                    <li>
                        <a href={"/map"}>Karte</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
