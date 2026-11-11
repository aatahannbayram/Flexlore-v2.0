import { createContext, useContext } from "react";
/** /home2 trial: sections read this to switch to the full-bleed, glass-on-film layout. Off everywhere else. */
export const Cinema = createContext(false);
export const useCinema = () => useContext(Cinema);
