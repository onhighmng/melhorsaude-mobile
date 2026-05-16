import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DesktopContentWrapperProps {
    children: ReactNode;
    className?: string;
}

export function DesktopContentWrapper({ children, className }: DesktopContentWrapperProps) {
    return (
        <div className={cn("w-full h-full flex flex-col", className)}>
            {children}
        </div>
    );
}
