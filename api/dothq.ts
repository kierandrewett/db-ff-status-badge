import type { VercelRequest, VercelResponse } from "@vercel/node";
import { badge } from "../src/badge";
import { getDotFFVersion } from "../src/versions";

export default async function (req: VercelRequest, res: VercelResponse) {
    const dotFFVersion = await getDotFFVersion();

    return badge(res, "dothq", dotFFVersion, "#000000");
}
