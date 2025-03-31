"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"; // Added useCallback
import { SidebarAppearance, SidebarContextProps, SidebarItem } from "./types";
import { useIsMobile } from "@/registry/hooks/use-mobile";

// Default sidebar appearance settings
const defaultAppearance: SidebarAppearance = {
  variant: "default",
  position: "left",
  collapsible: "offcanvas",
  defaultOpen: true,
  width: "16rem",
  collapsedWidth: "3rem",
};

// Cookie name and max age for persisting sidebar state
const SIDEBAR_COOKIE_NAME = "universal_sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// Create the sidebar context
const SidebarContext = createContext<SidebarContextProps | null>(null);

export function UniversalSidebarProvider({ 
    children,
    appearance = defaultAppearance,
    onOpenChange,
    onItemClick,
 }: {
    children: React.ReactNode;
    appearance?: SidebarAppearance;
    onOpenChange?: (isOpen: boolean) => void;
    onItemClick?: (item: SidebarItem, e: React.MouseEvent) => void;
 }) {
  // Merge default appearance with provided appearance
  const mergedAppearance = useMemo(
    () => ({ ...defaultAppearance, ...appearance }),
    [appearance]
  );

  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [activePath, setActivePath] = useState<string | undefined>(undefined);
  
  // Use a single state variable for desktop open state, initialized carefully
  const [_isOpen, _setIsOpen] = useState(() => {
      // Prioritize prop if provided
      if (mergedAppearance.defaultOpen !== undefined) {
          return mergedAppearance.defaultOpen;
      }
      // Try reading from cookie next
      try {
          const cookieValue = typeof document !== 'undefined' 
              ? document.cookie
                  .split("; ")
                  .find((row) => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
              : null;
          if (cookieValue) {
              return cookieValue.split("=")[1] === "true";
          }
      } catch (error) {
          console.error("Failed to read sidebar state from cookie:", error);
      }
      // Fallback to true if no prop and no cookie
      return true; 
  });
  
  // Callback to set the open state and handle side effects
  const setIsOpen = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    console.log('[SidebarContext] setIsOpen called with:', value); // Log input
    _setIsOpen(prevState => {
        const newState = typeof value === 'function' ? value(prevState) : value;
        console.log('[SidebarContext] Desktop state changing from', prevState, 'to', newState); // Log state change
        
        // Call external handler if provided and state actually changed
        if (onOpenChange && !isMobile && newState !== prevState) { 
          onOpenChange(newState);
        }

        // Persist state to cookie
        try {
          if (typeof document !== 'undefined') {
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${newState ? "true" : "false"}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
          }
        } catch (error) {
          console.error("Failed to save sidebar state:", error);
        }
        
        return newState;
    });
  }, [onOpenChange, isMobile]);

  // Callback for mobile sheet changes
  const handleMobileOpenChange = useCallback((mobileOpenState: boolean) => {
    console.log('[SidebarContext] handleMobileOpenChange called with:', mobileOpenState); // Log input
    // Directly set the state, no need for functional update if just setting based on input
    setOpenMobile(mobileOpenState);
    console.log('[SidebarContext] Mobile state set to:', mobileOpenState); // Log state change
    // Optionally call onOpenChange for mobile as well, if needed
    // if (onOpenChange && isMobile) {
    //   onOpenChange(mobileOpenState);
    // }
  }, [/* onOpenChange, isMobile */]); // Adjust dependencies if onOpenChange is used for mobile

  // Toggle function
  const toggleSidebar = useCallback(() => {
    console.log('[SidebarContext] toggleSidebar called. isMobile:', isMobile); // Log toggle call
    if (isMobile) {
      // Use the mobile handler directly for clarity
      handleMobileOpenChange(!openMobile); 
    } else {
      setIsOpen(prev => !prev);
    }
  }, [isMobile, openMobile, handleMobileOpenChange, setIsOpen]);
  
  // Keyboard shortcut effect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        // Ensure we don't trigger while typing in inputs/textareas
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
            return;
        }
        event.preventDefault();
        toggleSidebar();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  
  // Memoized context value
  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      isOpen: _isOpen, // Use the actual state variable
      setIsOpen,
      isMobile,
      openMobile,
      setOpenMobile: handleMobileOpenChange, // Use the specific mobile handler
      toggleSidebar,
      collapsible: mergedAppearance.collapsible || "offcanvas",
      position: mergedAppearance.position || "left",
      variant: mergedAppearance.variant || "default",
      appearance: mergedAppearance,
      onItemClick,
      activePath,
      setActivePath, // Ensure setActivePath is included if needed elsewhere
    }),
    [
      _isOpen, // Depend on the actual state
      setIsOpen,
      isMobile,
      openMobile,
      handleMobileOpenChange, // Use the specific mobile handler
      toggleSidebar,
      mergedAppearance,
      onItemClick,
      activePath,
      // setActivePath // Include if it changes, otherwise omit if stable
    ]
  );
  
  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

// Hook to access the sidebar context
export function useUniversalSidebar() {
  const context = useContext(SidebarContext);
  
  if (!context) {
    throw new Error("useUniversalSidebar must be used within UniversalSidebarProvider");
  }
  
  return context;
}