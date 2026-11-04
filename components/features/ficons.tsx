import { FilePdf, FilmSlate, Scissors, Browser, Question, Translate, QrCode, Bell, LockSimple, ChartBar, Robot } from "../ui/icons";
// Icon for each feature (by name in data.ts), so the menu and pages share one set.
export const FICON: Record<string, (p: { size?: number; className?: string }) => React.ReactElement> = { FilePdf, FilmSlate, Scissors, Browser, Question, Translate, QrCode, Bell, LockSimple, ChartBar, Robot };
