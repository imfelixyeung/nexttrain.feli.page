import type { ReactNode } from "react";

const Hero = ({ title }: { title: ReactNode }) => {
    return (
        <header className="border-b py-8">
            <div className="container mx-auto">{title}</div>
        </header>
    );
};

export default Hero;
