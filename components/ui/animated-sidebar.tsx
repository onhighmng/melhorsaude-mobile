"use client";

import { cn } from "@/lib/utils";
// DISABLED: import from 'react-router-dom';
import React, { useState, createContext, useContext, useCallback, useRef } from "react";
// DISABLED: import from 'framer-motion';
import { Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  badge?: string;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useAnimatedSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useAnimatedSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const AnimatedSidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const AnimatedSidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <AnimatedSidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </AnimatedSidebarProvider>
  );
};

export const AnimatedSidebarBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <DesktopSidebar className={cn("flex flex-col", className)}>
        {children}
      </DesktopSidebar>
      <MobileSidebar className={className}>
        {children}
      </MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof div>) => {
  const { open, setOpen, animate } = useAnimatedSidebar();
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  }, [setOpen]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 150); // Longer delay to prevent flickering
  }, [setOpen]);

  return (
    <div
      className={cn(
        "h-screen py-4 hidden md:flex md:flex-col bg-background border-r flex-shrink-0 relative overflow-hidden",
        open ? "px-4" : "px-2",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
        type: "tween"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        pointerEvents: 'auto',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const MobileSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open, setOpen } = useAnimatedSidebar();
  return (
    <>
      <div
        className={cn(
          "h-16 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-background border-b w-full"
        )}
      >
        <div className="flex justify-end z-20 w-full">
          <Menu
            className="text-foreground cursor-pointer h-6 w-6"
            onClick={() => setOpen(!open)}
          />
        </div>
        
          {open && (
            <div



              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-background p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-foreground cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              {children}
            </div>
          )}
        
      </div>
    </>
  );
};

export const AnimatedSidebarLink = ({
  link,
  className,
  isActive: paramsIsActive,
  ...props
}: {
  link: Links;
  className?: string;
  isActive?: boolean;
} & React.ComponentProps<"a"> & React.ComponentProps<"div">) => {
  const { open, animate } = useAnimatedSidebar();

  const content = (
    <>
      <span className="flex-shrink-0">
        {link.icon}
      </span>
      <span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-foreground text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 flex-shrink-0"
      >
        {link.label}
      </span>
      {link.badge && (
        <span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 0,
          }}
          className="ml-auto"
        >
          <Badge variant="destructive" className="h-5 px-1.5 text-xs">
            {link.badge}
          </Badge>
        </span>
      )}
    </>
  );

  // If href is #, use a div/button instead of NavLink to avoid router issues or just render styled container
  if (link.href === "#") {
    return (
      <div
        className={cn(
          "flex flex-row items-center gap-2 group/sidebar py-2 px-2 rounded-lg transition-colors w-full cursor-pointer",
          open ? "justify-start" : "justify-center",
          paramsIsActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50",
          className
        )}
        {...props}
      >
        {content}
      </div>
    );
  }

  return (
    <NavLink
      to={link.href}
      className={({ isActive }) =>
        cn(
          "flex flex-row items-center gap-2 group/sidebar py-2 px-2 rounded-lg transition-colors w-full",
          open ? "justify-start" : "justify-center",
          isActive || paramsIsActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50",
          className
        )
      }
      {...props}
    >
      {content}
    </NavLink>
  );
};

// Aliases for backward compatibility
export const SidebarBody = AnimatedSidebarBody;
export const SidebarLink = AnimatedSidebarLink;
