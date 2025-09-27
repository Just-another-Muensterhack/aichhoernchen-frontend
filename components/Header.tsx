import Image from "next/image";
import {useState} from "react";
import {MenuIcon, XIcon} from "lucide-react";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = (
        <>
            <li>
                <a href={"/"}>Suche</a>
            </li>
            <li>
                <a href={"/found"}>Abgabe</a>
            </li>
        </>
    )

    return (
        <header className={"flex-row-0 justify-between w-full"}>
            <span className={"flex-row-1 justify-center items-center rounded dark:bg-foreground/70 px-2"} aria-label={"AIhörnchen Logo, ein Eichhörnchen"}>
                <Image src={"favicon.ico"} alt={""} width={32} height={32} />
                <Image src={"logo-text.png"} alt={""} width={150} height={28} />
            </span>
            <nav className={"flex-row-0 items-center justify-center"}>
                <ul className={"hidden desktop:flex-row-6"}>
                    {navItems}
                </ul>
                <button
                    onClick={() => setIsOpen(true)}
                    className={"icon-button desktop:hidden"}
                >
                    <MenuIcon/>
                </button>
                <ul
                    hidden={!isOpen}
                    className={"desktop:hidden fixed inset-0 flex-col-6 items-center justify-center bg-background text-foreground"}
                    onClick={() => setIsOpen(false)}
                >
                    <li>
                        <button
                            className={"desktop:!hidden bg-transparent border-transparent text-foreground"}
                            onClick={() => setIsOpen(false)}
                        >
                            <XIcon/>
                        </button>
                    </li>
                    {navItems}
                </ul>
            </nav>
        </header>
    )
}
