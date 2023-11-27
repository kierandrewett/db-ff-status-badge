import type { VercelRequest, VercelResponse } from "@vercel/node";
import { badge } from "../src/badge";
import { getMozFFVersion, getMozFFVersionString } from "../src/versions";

export default async function (req: VercelRequest, res: VercelResponse) {
    const mozFFVersion = await getMozFFVersionString();

    return badge(res, "mozilla", mozFFVersion, "#ff493c")
}
