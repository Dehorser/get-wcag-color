import {getDeltaE00 as get_diff} from "delta-e";
import {hex as get_con} from "wcag-contrast";

const AA_small_ratio = 4.5;
const AA_large_ratio = 3;
const AAA_small_ratio = 7;
const AAA_large_ratio = 4.5;

function getWCAGColors(text, bg) {
    if (get_con(text, bg) >= AA_small_ratio) {
        return {
            AA_small: text,
            AA_large_: text,
            AAA_small: text,
            AAA_large: text,
        }
    }
    return "";
}
