const { PI, sin, cos, tan, asin, atan2: atan } = Math;
const rad = PI / 180;
const dayMs = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;
const toJulian = (date) => date.valueOf() / dayMs - 0.5 + J1970;
const toDays = (date) => toJulian(date) - J2000;
const solarMeanAnomaly = (d) => rad * (357.5291 + 0.98560028 * d);
function eclipticLongitude(M) {
    const C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)); // equation of center
    const P = rad * 102.9372; // perihelion of the Earth
    return M + C + P + PI;
}
const e = rad * 23.4397; // obliquity of the Earth
const rightAscension = (l, b) => atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
const declination = (l, b) => asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
function sunCoords(d) {
    const M = solarMeanAnomaly(d);
    const L = eclipticLongitude(M);
    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}
const siderealTime = (d, lw) => rad * (280.16 + 360.9856235 * d) - lw;
const azimuth = (H, phi, dec) => atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
const altitude = (H, phi, dec) => asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
export function getPosition(date, lat, lng) {
    const lw = rad * -lng;
    const phi = rad * lat;
    const d = toDays(date);
    const c = sunCoords(d);
    const H = siderealTime(d, lw) - c.ra;
    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
}
;
function moonCoords(d) {
    const L = rad * (218.316 + 13.176396 * d); // ecliptic longitude
    const M = rad * (134.963 + 13.064993 * d); // mean anomaly
    const F = rad * (93.272 + 13.229350 * d); // mean distance
    const l = L + rad * 6.289 * sin(M); // longitude
    const b = rad * 5.128 * sin(F); // latitude
    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
    };
}
export function getMoonPosition(date, lat, lng) {
    const lw = rad * -lng;
    const phi = rad * lat;
    const d = toDays(date);
    const c = moonCoords(d);
    const H = siderealTime(d, lw) - c.ra;
    const h = altitude(H, phi, c.dec);
    // h = h + astroRefraction(h); // altitude correction for refraction
    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
    };
}
;
