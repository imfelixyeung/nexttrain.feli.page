import { LayoutClient } from "./layout.page";

const Layout = async ({
    children,
}: LayoutProps<"/[lang]/bus/kmb/routes/[route]/bound/[bound]/service-type/[serviceType]/stops">) => {
    return <LayoutClient>{children}</LayoutClient>;
};

export default Layout;
