import type { VercelRequest, VercelResponse } from "@vercel/node";
import { badge } from "../src/badge";
import { getDotFFVersion, getMozFFVersion } from "../src/versions";

export default async function (req: VercelRequest, res: VercelResponse) {
    const dotFFVersion = await getDotFFVersion();
    const mozFFVersion = await getMozFFVersion();

    const dotVersion = dotFFVersion.split(".") as any;
    const ffVersion = mozFFVersion.split(".") as any;

    const majorsBehind = ffVersion[0] - dotVersion[0];
    const minorsBehind = ffVersion[1] - dotVersion[1];

    if (majorsBehind >= 1) {
        return badge(res, "upstream", `${majorsBehind} major versions behind`, "red");
    } else if (minorsBehind >= 1) {
        return badge(res, "upstream", `${minorsBehind} minor versions behind`, "yellow");
    } else {
        return badge(res, "upstream", `0 versions behind`, "#238636");
    }
}
