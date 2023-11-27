import axios from "axios";
import sAgo from "s-ago";

export const getMozFFVersion = async () => {
    const { data: versionsMoz } = await axios.get(`https://product-details.mozilla.org/1.0/firefox_versions.json`);

    return versionsMoz.LATEST_FIREFOX_VERSION;
}

export const getNextPullDate = async () => {
    const { data: versionsMoz } = await axios.get(`https://product-details.mozilla.org/1.0/firefox_versions.json`);

    return versionsMoz.NEXT_RELEASE_DATE;
}

export const getDotFFVersion = async () => {
    const { data } = await axios.get("https://raw.githubusercontent.com/dothq/browser-desktop/nightly/REVISION");

    const repo = data.split(" ")[0];
    const revision = data.split(" ")[1];
    const branch = data.split(" ")[2];

    const repoSmall = repo.split("github.com/")[1].replace(".git", "");

    const { data: versionDotRaw } = await axios.get(`https://raw.githubusercontent.com/${repoSmall}/${revision}/browser/config/version.txt`, { responseType: "text" });
    const dotFFVersion = versionDotRaw.trim();

    return dotFFVersion;
}
