import Image from "next/image";
import {useCallback, useEffect, useState} from "react";
import {MenuIcon, Moon, Sun, XIcon} from "lucide-react";
import {useTheme} from "@/components/theme/useTheme";
import clsx from "clsx";
import {createPortal} from "react-dom";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {resolvedTheme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }, [resolvedTheme, setTheme])


    const navItems = (
        <>
            <li>
                <a href={"/"}>Suche</a>
            </li>
            <li>
                <a href={"/found"}>Abgabe</a>
            </li>
            {mounted && (
                <li
                    className={"flex-row-2 items-center"}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            toggleTheme()
                            e.preventDefault()
                            e.stopPropagation()
                        }
                    }}
                    onClick={(e) => {
                        toggleTheme()
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <Sun className={"w-5 h-5"}/>
                    <div className={"relative w-10 h-5 bg-foreground/30 rounded-full"}>
                        <div
                            className={clsx(
                                "absolute bg-primary w-5 h-5 rounded-full transition-all duration-200 left-0",
                                {
                                    "translate-x-5": resolvedTheme === "dark",
                                }
                            )}
                        />
                    </div>
                    <Moon className={"w-5 h-5"}/>
                </li>
            )}
        </>
    )

    return (
        <header className={"flex-row-0 justify-between w-full"}>
            <span className={"flex-row-1 justify-center items-center rounded dark:bg-foreground/70 px-2"}
                  aria-label={"AIhörnchen Logo, ein Eichhörnchen"}>
                <Image src={"/favicon.ico"} alt={""} width={32} height={32}/>
                <Image src={"/logo-text.png"} alt={""} width={150} height={28}/>
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
                {isOpen && createPortal(
                    <dialog
                        className={"fixed w-screen h-screen inset-0 bg-surface text-foreground flex items-center justify-center z-[2000]"}
                        onClick={() => setIsOpen(false)}
                    >
                        <ul className={"flex-col-2 items-center justify-center"}>
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
                    </dialog>
                , document.body)}
            </nav>
        </header>
    )
}
