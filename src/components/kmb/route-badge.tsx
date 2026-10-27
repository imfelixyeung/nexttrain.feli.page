export const KMBRouteBadge = ({ route }: { route: string }) => {
    return (
        <div className="inline-block rounded bg-red-600 px-1.5 text-white">
            {route}
        </div>
    );
};
