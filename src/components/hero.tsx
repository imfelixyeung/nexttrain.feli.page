import type { ReactNode } from "react";

const Hero = ({ title }: { title: ReactNode }) => {
    return (
        <header className="border-b py-8">
            <div className="container mx-auto px-4">{title}</div>
        </header>
    );
};

export default Hero;
