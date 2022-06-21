import convert from './getType';
import JAN from './justANumber';

/**
 * Convert Human readable time to milliseconds.
 * @param {String} string The human readable time string.
 * @returns {Number} The time in milliseconds.
 */
export default function (string: string): number | undefined {
    const strings = string.toLowerCase()?.trim()?.split(/ +/g);
    let negative = string.startsWith("-"), number = 0, fails = 0, trials = 0;

    strings.forEach((v, i) => {
        trials++;

        // Value is a number
        if (JAN(v)) {
            let t = Math.abs(parseInt(v));
            if (JAN(strings[i + 1]) || !strings[i + 1]) { number += t; fails-- } // Next value is also a number
            else {
                let value = convert(strings[i + 1].trim()?.toLowerCase());
                if (value) number += value * t;
                else fails++
            }
        } else {
            let no = Math.abs(parseInt(v)), str = v.substring(no.toString()?.length)?.trim()?.toLowerCase();
            let value = convert(str);

            if (value && no) number += no * value;
            else fails++;
        }
    });

    return fails === strings.length ? undefined : number * (negative ? -1 : 1);
}