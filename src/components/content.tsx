import type { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
    return <main className="container mx-auto py-8">{children}</main>;
};

export default Content;
