import type { ReactNode } from "react";

const Hero = ({ title }: { title: ReactNode }) => {
    return (
        <header className="py-8 border-b">
            <div className="container mx-auto">{title}</div>
        </header>
    );
};

export default Hero;
