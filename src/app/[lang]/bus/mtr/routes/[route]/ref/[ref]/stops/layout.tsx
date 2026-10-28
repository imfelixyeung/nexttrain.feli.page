import { LayoutClient } from "./layout.client";

const Layout = async ({
    children,
}: LayoutProps<"/[lang]/bus/mtr/routes/[route]/ref/[ref]/stops">) => {
    return <LayoutClient>{children}</LayoutClient>;
};

export default Layout;
