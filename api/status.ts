import type { VercelRequest, VercelResponse } from "@vercel/node";
import { badge } from "../src/badge";
import { getDotFFVersion, getMozFFVersion } from "../src/versions";

const plural = (condition: boolean, name?: string) => condition == true ? (name || "s") : "";

export default async function (req: VercelRequest, res: VercelResponse) {
    const dotFFVersion = await getDotFFVersion();
    const mozFFVersion = await getMozFFVersion();

    const dotVersion = dotFFVersion.split(".") as any;
    const ffVersion = mozFFVersion.split(".") as any;

    const majorsBehind = ffVersion[0] - dotVersion[0];
    const minorsBehind = ffVersion[1] - dotVersion[1];
    const patchesBehind = ffVersion[2] ? ffVersion[2] - (dotVersion[2] || 0) : 0;

    if (majorsBehind >= 1) {
        return badge(res, "upstream", `${majorsBehind} major version${plural(majorsBehind > 1)} behind`, "red");
    } else if (minorsBehind >= 1 && patchesBehind >= 1) {
        return badge(res, "upstream", `${minorsBehind} minor version${plural(majorsBehind > 1)} and ${patchesBehind} patch${plural(patchesBehind > 1, "es")} behind`, "yellow");
    } else if (minorsBehind >= 1) {
        return badge(res, "upstream", `${minorsBehind} minor version${plural(majorsBehind > 1)} behind`, "yellow");
    } else {
        return badge(res, "upstream", `${majorsBehind < 0 ? majorsBehind * -1 : majorsBehind} versions ${majorsBehind < 0 ? "ahead" : "behind"}`, "#238636");
    }
}
