import type { VercelRequest, VercelResponse } from "@vercel/node";
import { badge } from "../src/badge";
import { getNextPullDate } from "../src/versions";
import sAgo from "s-ago";

export default async function (req: VercelRequest, res: VercelResponse) {
    const nextPullDate = await getNextPullDate();

    const nextPull = sAgo(new Date(nextPullDate));

    let colour = null;

    if (nextPull.includes("month")) {
        // green
        colour = "#238636"
    } else if (nextPull.includes("week")) {
        // yellow
        colour = "yellow"
    } else if (nextPull.includes("day")) {
        // orange
        colour = "orange"
    }

    if (!colour) {
        // red
        colour = "#ff493c"
    }

    return badge(res, "next pull", nextPull, colour)
}
