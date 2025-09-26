import Image from "next/image";

export const Header = () => {
    return (
        <header className={"flex-row-0 justify-between h-16 max-h-16 px-6 py-4"}>
            <h1 className={"flex-row-1 justify-center items-center"} aria-label={"AIhörnchen Logo, ein Eichhörnchen"}>
                <Image src={"favicon.ico"} alt={""} width={32} height={32} />
                <Image src={"logo-text.png"} alt={""} width={150} height={28} />
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
