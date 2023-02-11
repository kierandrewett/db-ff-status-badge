import type { VercelRequest, VercelResponse } from "@vercel/node";
import { badge } from "../src/badge";
import { getMozFFVersion } from "../src/versions";

export default async function (req: VercelRequest, res: VercelResponse) {
    const mozFFVersion = await getMozFFVersion();

    return badge(res, "mozilla/gecko-dev", mozFFVersion, "#FF7139")
}
