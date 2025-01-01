//to test test cases just wite "npm test" in the terminal when in the sample_pages directory

import {convertGregToHijri, convertHijriToGreg} from "../HijriCalc.js";

describe("Test that input is Date type", () => {
    test('is Date object', () => {
        var theDate = new Date(2024,2,5);

        var calObj = convertGregToHijri(theDate);
        expect(calObj.Hday).toBe(24);
        expect(calObj.Hmonth).toBe(8);
        expect(calObj.Hyear).toBe(1445);
    });

    test('use int instead of Date object, should throw a TypeError', () => {
        expect(() => {
            convertGregToHijri(1);
        }).toThrow(TypeError("It's not a Date object."));
    });

    test('use String instead of Date object, should throw a TypeError', () => {
        expect(() => {
            convertGregToHijri("Hello");
        }).toThrow(TypeError("It's not a Date object."));
    });

    test('use char instead of Date object, should throw a TypeError', () => {
        expect(() => {
            convertGregToHijri('H');
        }).toThrow(TypeError("It's not a Date object."));
    });

    test('use null instead of Date object, should throw a TypeError', () => {
        expect(() => {
            convertGregToHijri(null);
        }).toThrow(TypeError("It's not a Date object."));
    });
})

describe("Test Greg to Hijri", () => {
    test('3/5/2024 should return 24 Shabaan', () => {
        //month is zero indexed in dateTime
        var theDate = new Date(2024,2,5);

        var calObj = convertGregToHijri(theDate);
        expect(calObj.Hday).toBe(24);
        expect(calObj.Hmonth).toBe(8);
        expect(calObj.Hyear).toBe(1445);
    });

    test('12/23/2024 should return 22 jamaad al-Akhira', () => {
        var theDate = new Date(2024,11,23)
        //console.log(theDate.toLocaleString());

        var calObj = convertGregToHijri(theDate); 
        expect(calObj.Hday).toBe(22);
        expect(calObj.Hmonth).toBe(6);
        expect(calObj.Hyear).toBe(1446);
    });

    test('2/29/2024 (leap day) should return 19 Shaban (8)', () => {
        var theDate = new Date(2024,1,29)
        //console.log(theDate.toLocaleString());

        var calObj = convertGregToHijri(theDate); 
        expect(calObj.Hday).toBe(19);
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

    test('30 Shabaan doesnt exist but can return 3/11/2024', () => {
        var dateObj = convertHijriToGreg(1445, 8, 30);

        expect(dateObj.getDate()).toBe(11);
        expect(dateObj.getMonth()+1).toBe(3);
        expect(dateObj.getFullYear()).toBe(2024);
    });

    test('19 Shaban (8) 1445 should return 2/29/2024 (leap day)', () => {
        var dateObj = convertHijriToGreg(1445, 8, 19);

        expect(dateObj.getDate()).toBe(29);
        expect(dateObj.getMonth()+1).toBe(2);
        expect(dateObj.getFullYear()).toBe(2024);
    });
})