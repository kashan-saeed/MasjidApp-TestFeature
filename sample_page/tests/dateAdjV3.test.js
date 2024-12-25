//to test test cases just wite "npm test" in the terminal when in the sample_pages directory

import {DateAdj} from "../dateAdjV3.js";

describe("Test that input is Date type", () => {
    test('is Date object', () => {
        var dateAdjObj = new DateAdj(new Date("December 23, 2024"), new Date("December 23, 2024 5:00 PM"));

        expect(dateAdjObj.objHijriDay).toBe(22);
        expect(dateAdjObj.objHijriMonth).toBe(6);
        expect(dateAdjObj.objHijriYear).toBe(1446);
    });

    test('use int instead of Date object, should throw a TypeError', () => {
        expect(() => {
            new DateAdj(1, new Date("December 23, 2024 5:00 PM"));
        }).toThrow(TypeError("One or both parameters are not a Date object."));

        expect(() => {
            new DateAdj(new Date("December 23, 2024"), 1);
        }).toThrow(TypeError("One or both parameters are not a Date object."));

        expect(() => {
            new DateAdj(1, 1);
        }).toThrow(TypeError("One or both parameters are not a Date object."));
    });

    test('use String instead of Date object, should throw a TypeError', () => {
        expect(() => {
            new DateAdj("Hello", new Date("December 23, 2024 5:00 PM"));
        }).toThrow(TypeError("One or both parameters are not a Date object."));

        expect(() => {
            new DateAdj(new Date("December 23, 2024"), "Hello");
        }).toThrow(TypeError("One or both parameters are not a Date object."));

        expect(() => {
            new DateAdj("Hello", "Hello");
        }).toThrow(TypeError("One or both parameters are not a Date object."));
    });

    test('use char instead of Date object, should throw a TypeError', () => {
        expect(() => {
            new DateAdj('C', new Date("December 23, 2024 5:00 PM"));
        }).toThrow(TypeError("One or both parameters are not a Date object."));

        expect(() => {
            new DateAdj(new Date("December 23, 2024"), 'C');
        }).toThrow(TypeError("One or both parameters are not a Date object."));

        expect(() => {
            new DateAdj('C', 'C');
        }).toThrow(TypeError("One or both parameters are not a Date object."));
    });

    test('use null instead of Date object, should throw a TypeError', () => {
        expect(() => {
            new DateAdj(null, new Date("December 23, 2024 5:00 PM"));
        }).toThrow(TypeError("One or both parameters are not a Date object."));

        expect(() => {
            new DateAdj(new Date("December 23, 2024"), null);
        }).toThrow(TypeError("One or both parameters are not a Date object."));

        expect(() => {
            new DateAdj(null, null);
        }).toThrow(TypeError("One or both parameters are not a Date object."));
    });
})

describe("Test Greg to Hijri", () => {
    test('12/23/2024 should return 22 Jumada al-akhira (6)', () => {
        var dateAdjObj = new DateAdj(new Date("December 23, 2024"), new Date("December 23, 2024 5:00 PM"));

        expect(dateAdjObj.objHijriDay).toBe(22);
        expect(dateAdjObj.objHijriMonth).toBe(6);
        expect(dateAdjObj.objHijriYear).toBe(1446);
    });

    test('12/23/2024 7:00PM should return 23 Jumada al-akhira (6) since it is after maghreb', () => {
        var dateAdjObj = new DateAdj(new Date("December 23, 2024 7:00 PM"), new Date("December 23, 2024 5:00 PM"));

        expect(dateAdjObj.objHijriDay).toBe(23);
        expect(dateAdjObj.objHijriMonth).toBe(6);
        expect(dateAdjObj.objHijriYear).toBe(1446);
    });
})

/*
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
    */