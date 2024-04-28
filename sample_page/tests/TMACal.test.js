//to test test cases just wite "npm test" in the terminal when in the sample_pages directory

import {convertGregToHijri, convertHijriToGreg} from "../TMACal.js";

describe("Test Greg to Hijri", () => {
    test('3/5/2024 should return 24 Shabaan', () => {
        var calObj = convertGregToHijri(new Date(2024,2,5));

        expect(calObj.Hday).toBe(24);
        expect(calObj.Hmonth).toBe(8);
        expect(calObj.Hyear).toBe(1445);
    });
})

describe("Test Hijri to greg", () => {
    test('24 Shabaan should return 3/5/2024', () => {
        var dateObj = convertHijriToGreg(1445, 8, 24);

        expect(dateObj.getDate()).toBe(5);
        expect(dateObj.getMonth()+1).toBe(3);
        expect(dateObj.getFullYear()).toBe(2024);
    });

    test('30 Shabaan should be an error but can return 3/11/2024', () => {
        var dateObj = convertHijriToGreg(1445, 8, 30);

        expect(dateObj.getDate()).toBe(11);
        expect(dateObj.getMonth()+1).toBe(3);
        expect(dateObj.getFullYear()).toBe(2024);
    });
})