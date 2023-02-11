import axios from "axios";

export const badge = (res: any, prefix: string, suffix: string, colour: string) => {
    const params = new URLSearchParams({
        label: prefix,
        message: suffix,
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