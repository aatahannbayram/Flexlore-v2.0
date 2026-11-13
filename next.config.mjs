import { fileURLToPath } from "node:url";
import path from "node:path";
const root = path.dirname(fileURLToPath(import.meta.url));
/* FLX_LAUNCH=1 marks the production build (search indexing, GA4, HubSpot). Inlined so client code can read it too. */
export default { env: { FLX_LAUNCH: process.env.FLX_LAUNCH ?? "" }, output: "export", images: { unoptimized: true }, trailingSlash: true, outputFileTracingRoot: root };
