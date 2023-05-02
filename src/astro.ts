const PI = Math.PI,
  sin = Math.sin,
  cos = Math.cos,
  tan = Math.tan,
  asin = Math.asin,
  atan = Math.atan2,
  rad = PI / 180

const dayMs = 1000 * 60 * 60 * 24
const J1970 = 2440588
const J2000 = 2451545

function toJulian(date: Date) {
  return date.valueOf() / dayMs - 0.5 + J1970
}

function toDays(date: Date) {
  return toJulian(date) - J2000
}

function solarMeanAnomaly(d: number) {
  return rad * (357.5291 + 0.98560028 * d)
}

function eclipticLongitude(M: number) {

    const C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)) // equation of center
    const P = rad * 102.9372 // perihelion of the Earth

    return M + C + P + PI
}

const e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l: number, b: number) {
  return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
}
function declination(l: number, b: number) {
  return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
}

function sunCoords(d: number) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}

function siderealTime(d: number, lw: number) {
  return rad * (280.16 + 360.9856235 * d) - lw
}

function azimuth(H: number, phi: number, dec: number) {
  return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi))
}
function altitude(H: number, phi: number, dec: number) {
  return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H))
}

export function getPosition(date: Date, lat: number, lng: number) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};

function moonCoords(d: number) { // geocentric ecliptic coordinates of the moon

    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
        M = rad * (134.963 + 13.064993 * d), // mean anomaly
        F = rad * (93.272 + 13.229350 * d),  // mean distance

        l  = L + rad * 6.289 * sin(M), // longitude
        b  = rad * 5.128 * sin(F)     // latitude

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
    };
}

export function getMoonPosition(date: Date, lat: number, lng: number) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec)

    // h = h + astroRefraction(h); // altitude correction for refraction

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
    };
};