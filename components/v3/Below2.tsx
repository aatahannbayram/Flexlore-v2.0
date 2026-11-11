"use client";
import { Cinema } from "./cinema";
import { StepsV3, WhyV3, WorkspaceV3, WebV3, SectorsV3, CasesV3 } from "./Home";
import { EndCinema } from "./HeroCinema";
/** /home2 below the hero: the same chapters in film mode, closing on a full-bleed call to action. */
export default function Below2() {
  return (<Cinema.Provider value={true}><StepsV3 /><WhyV3 /><WorkspaceV3 /><WebV3 /><SectorsV3 /><CasesV3 /><EndCinema /></Cinema.Provider>);
}
