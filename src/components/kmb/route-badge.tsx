export const KMBRouteBadge = ({ route }: { route: string }) => {
    return (
        <div className="bg-red-600 text-white rounded inline-block px-1.5">
            {route}
        </div>
    );
};
