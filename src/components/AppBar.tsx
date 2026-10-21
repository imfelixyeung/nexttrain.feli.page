import Link from "next/link";
import { useRouter } from "next/router";
import { HiArrowLeft } from "react-icons/hi";
import { MdOutlineTrain } from "react-icons/md";
import LocaleChangerMenu from "./LocaleChangerMenu";

const AppBar = () => {
    const router = useRouter();
    const atHome = router.asPath === "/";

    return (
        <div className="sticky inset-y-0 top-0 z-50 navbar bg-primary text-primary-content">
            <div className="flex-none">
                {atHome ? (
                    <span className="block p-3 text-2xl rounded-full">
                        <MdOutlineTrain />
                    </span>
                ) : (
                    <Link
                        href="/"
                        className="text-2xl btn btn-square btn-ghost"
                    >
                        <HiArrowLeft />
                    </Link>
                )}
            </div>
            <div className="flex-1">
                <Link
                    href="/"
                    className="text-xl font-bold normal-case btn btn-ghost"
                >
                    Next Train
                </Link>
            </div>
            <div className="flex-none">
                <LocaleChangerMenu />
            </div>
        </div>
    );
};

export default AppBar;
