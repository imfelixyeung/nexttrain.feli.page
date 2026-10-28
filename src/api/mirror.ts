export const MIRROR_URL = "https://cdn.transit.feli.page/";

export const getMirrorKey = (url: URL) => {
    const key = url.host + url.pathname;
    return `/data.gov.hk/mirror/${key}`;
};

export const getMirrorURL = (url: URL) => {
    return new URL(getMirrorKey(url), MIRROR_URL);
};
