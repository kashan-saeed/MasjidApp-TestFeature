//to test test cases just wite "npm test" in the terminal when in the sample_pages directory

import {DateAdj} from "../dateAdjV3.js";

describe("Test that input is Date type", () => {
    test('is Date object', () => {
        var dateAdjObj = new DateAdj(new Date("December 23, 2024"), new Date("December 23, 2024 5:00 PM"));

        expect(dateAdjObj.objHijriDay).toBe(22);
        expect(dateAdjObj.objHijriMonth).toBe(5);
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
    test('12/23/2024 should return 22 Jumada al-akhira (5 (zero indexed))', () => {
        var dateAdjObj = new DateAdj(new Date("December 23, 2024"), new Date("December 23, 2024 5:00 PM"));

        expect(dateAdjObj.objHijriDay).toBe(22);
        expect(dateAdjObj.objHijriMonth).toBe(5);
        expect(dateAdjObj.objHijriYear).toBe(1446);
    });

    test('12/23/2024 7:00PM should return 23 Jumada al-akhira (5 (zero indexed)) since it is after maghreb', () => {
        var dateAdjObj = new DateAdj(new Date("December 23, 2024 7:00 PM"), new Date("December 23, 2024 5:00 PM"));

        expect(dateAdjObj.objHijriDay).toBe(23);
        expect(dateAdjObj.objHijriMonth).toBe(5);
        expect(dateAdjObj.objHijriYear).toBe(1446);
    });
})

describe("Test Hijri Months, Days, and years change Properly", () => {
    test('Hijri Year, month, and day should increment', () => {
        var dateAdjObj = new DateAdj(new Date("July 6, 2024"), new Date("July 6, 2024 7:00 PM"));

        expect(dateAdjObj.objHijriDay).toBe(30);
        expect(dateAdjObj.objHijriMonth).toBe(11);
        expect(dateAdjObj.objHijriYear).toBe(1445);

        dateAdjObj.incrementBtn();

        expect(dateAdjObj.objHijriDay).toBe(1);
        expect(dateAdjObj.objHijriMonth).toBe(0);
        expect(dateAdjObj.objHijriYear).toBe(1446);
    });

    test('Hijri Year, month, and day should decrement', () => {
        var dateAdjObj = new DateAdj(new Date("July 7, 2024"), new Date("July 7, 2024 7:00 PM"));

        expect(dateAdjObj.objHijriDay).toBe(1);
        expect(dateAdjObj.objHijriMonth).toBe(0);
        expect(dateAdjObj.objHijriYear).toBe(1446);

        dateAdjObj.decrementBtn();

        expect(dateAdjObj.objHijriDay).toBe(30);
        expect(dateAdjObj.objHijriMonth).toBe(11);
        expect(dateAdjObj.objHijriYear).toBe(1445);
    });
})