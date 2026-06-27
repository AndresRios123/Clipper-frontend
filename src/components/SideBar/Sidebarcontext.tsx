import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type SidebarContextValue = {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  isMobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
};

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  // Colapso en desktop: el sidebar se angosta y el contenido se reajusta
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Apertura en mobile: el sidebar se superpone sobre el contenido
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapsed = () => setIsCollapsed((prev) => !prev);
  const openMobile = () => setIsMobileOpen(true);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapsed,
        isMobileOpen,
        openMobile,
        closeMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar debe usarse dentro de un SidebarProvider");
  }
  return context;
};