export default function AppLogo() {
    return (
        <div className="flex flex-row items-center justify-center gap-2.5 py-1 w-full group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center">
            <div
                className="
                    flex h-11 w-11 flex-shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-gradient-to-br from-stone-900 to-stone-700
                    text-white font-bold text-sm
                    transition-all duration-300
                    shadow-md shadow-stone-900/15
                    hover:scale-105 hover:shadow-lg
                    group-data-[collapsible=icon]:h-9
                    group-data-[collapsible=icon]:w-9
                "
            >
                <span className="font-inter font-bold tracking-tight">DH</span>
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0 overflow-hidden group-data-[collapsible=icon]:hidden">
                <span className="font-fraunces text-[13px] font-semibold text-stone-900 whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    The Dorm Hub
                </span>
                <span className="text-[7px] font-semibold uppercase tracking-[0.25em] text-amber-600 whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    PREMIUM BOARDING HOUSE
                </span>
            </div>
        </div>
    );
}