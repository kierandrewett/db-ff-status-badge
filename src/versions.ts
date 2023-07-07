import axios from "axios";

export const getMozFFVersion = async () => {
    const { data: versionMozRaw } = await axios.get(`https://raw.githubusercontent.com/mozilla/gecko-dev/release/browser/config/version.txt`, { responseType: "text" });
    const mozFFVersion = versionMozRaw.trim();

    return mozFFVersion;
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
