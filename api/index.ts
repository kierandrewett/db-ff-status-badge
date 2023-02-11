import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const badge = (res: any, text: string, colour: string) => {
    const params = new URLSearchParams({
        label: "upstream",
        message: text,
        color: colour,
        style: "flat"
    });

    const path = `/static/v1`

    const url = new URL(path + "?" + params.toString(), "https://img.shields.io");

    axios.get(url.href)
        .then(r => {
            res.setHeader("content-type", "image/svg+xml");
            res.send(r.data)
        }).catch(e => {
            res.send("")
        })
}

export default async function (req: VercelRequest, res: VercelResponse) {
    const { data } = await axios.get("https://raw.githubusercontent.com/dothq/browser-desktop/nightly/REVISION");

    const repo = data.split(" ")[0];
    const revision = data.split(" ")[1];
    const branch = data.split(" ")[2];

    const repoSmall = repo.split("github.com/")[1].replace(".git", "");

    const { data: versionDotRaw } = await axios.get(`https://raw.githubusercontent.com/${repoSmall}/${branch}/browser/config/version.txt`, { responseType: "text" });
    const dotFFVersion = versionDotRaw.trim();

    const { data: versionMozRaw } = await axios.get(`https://raw.githubusercontent.com/mozilla/gecko-dev/release/browser/config/version.txt`, { responseType: "text" });
    const mozFFVersion = versionMozRaw.trim();

    const dotVersion = dotFFVersion.split(".") as any;
    const ffVersion = mozFFVersion.split(".") as any;

    const majorsBehind = ffVersion[0] - dotVersion[0];
    const minorsBehind = ffVersion[1] - dotVersion[1];

    if (majorsBehind >= 1) {
        return badge(res, `${majorsBehind} major versions behind (dothq:${dotFFVersion} --> mozilla:${mozFFVersion})`, "red");
    } else if (minorsBehind >= 1) {
        return badge(res, `${minorsBehind} minor versions behind (dothq:${dotFFVersion} --> mozilla:${mozFFVersion})`, "yellow");
    } else {
        return badge(res, `0 versions behind`, "#238636");
    }
}
