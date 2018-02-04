import {getDeltaE00 as get_diff} from "delta-e";
import {hex as get_con} from "wcag-contrast";
import convert from "color-convert";

const AA_small_ratio = 4.5;
const AA_large_ratio = 3;
const AAA_small_ratio = 7;
const AAA_large_ratio = 4.5;

const max_diff = 100;

function get_lab(c) {
    let arr = convert.hex.lab.raw(c);
    return {
        L: arr[0],
        A: arr[1],
        B: arr[2]
    }
}

function getWCAGColors(text, bg) {
    let output = {
        AA_small: null,
        AA_large: null,
        AAA_small: null,
        AAA_large: null,
    }

    let text_con = get_con(text, bg);

    // Nesting to save checks
    if(text_con >= AA_large_ratio) {
        output.AA_large = text;
        if(text_con >= AA_small_ratio) {
            output.AA_small = text;
            output.AAA_large = text;
            if (text_con >= AAA_small_ratio) {
                output.AAA_small = text;
                // If text color is already compliant, return it
                return output;
            }
        }
    }

    // If we're here we still have work to do

    let AA_small_dist = max_diff;
    let AA_large_dist = max_diff;
    let AAA_small_dist = max_diff;
    let AAA_large_dist = max_diff;

    for (let c = 0x0; c <= 0xFFFFFF; ++c) {
        let c_hex = c.toString(16);
        let con = get_con(c_hex, bg);
        if (con > AA_large_ratio && output.AA_large !== text) {
            let text_lab = get_lab(text);
            let c_lab = get_lab(c);
            let diff = get_diff(text_lab, c_lab);

            if (diff > AA_large_dist) {
                AA_large_dist = diff;
                output.AA_large = c_hex;
            }

            if (con > AA_small_ratio && output.AA_small !== text) {
                if (diff > AA_small_dist) {
                    AA_small_dist = diff;
                    output.AA_small = c_hex;
                    output.AAA_large = c_hex;
                }

                if (con > AAA_small_ratio && output.AAA_small !== text) {
                    AAA_small_dist = diff;
                    output.AAA_small = c_hex;
                }
            }
        }
    }
    return output;

}
