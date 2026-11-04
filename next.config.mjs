import { fileURLToPath } from "node:url";
import path from "node:path";
const root = path.dirname(fileURLToPath(import.meta.url));
export default { output: "export", images: { unoptimized: true }, trailingSlash: true, outputFileTracingRoot: root };
