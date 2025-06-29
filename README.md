# Hijri Calendar Implementation - Research & Development

Where the lunar calendar feature is prototyped and tested for [The Masjid App](https://themasjidapp.org/)

Live page: https://kashan-saeed.github.io/MasjidApp-TestFeature/

## Project Background

This research project was initiated to solve issue [#611](https://github.com/Noitidart/The-Masjid-App/issues/611) - creating a Hijri calendar function that:
- Allows admins to get any Hijri date they need
- Supports variable month lengths (29 or 30 days)
- Returns to default calculation after manual adjustments to prevent permanent drift
  - Drift means preventing admin mistakes from causing long-term calendar issues if the admin doesn't come back and correct it.

## Current Implementation

The active implementation is in the `sample_page/` directory:
- `HijriCalc.js` - Core Umm al-Qura conversion functions
- `dateAdjV3.js` - Self-correcting calendar adjustment system
- `scriptV3.js` - UI interaction logic
- `index.html` - Demo interface

### Key Features
1. **Maghrib Time Handling** - Islamic day starts at sunset, not midnight
2. **Self-Correction Algorithm** - Automatically adjusts future months to return to calculated dates
3. **Flexible Month Length** - Admins can set months to 29 or 30 days
4. **State Tracking** - Remembers adjustments while navigating through dates

## Important Implementation Notes

### Algorithm Sources and Credits

The current implementation is based on:
- **UQCal.js**: https://github.com/talomaireeni/Umm-Al-Qura-Calendar (Apache License 2.0)
- **R.H. van Gent's implementation**: http://www.staff.science.uu.nl/~gent0113/islam/ummalqura.htm

### Critical Understanding: Timezone and Maghrib Time

The Hijri converter calculates the Islamic date for the morning of a given Gregorian date in Saudi Arabia. Key points:

1. **Global Consistency**: The same Gregorian date gives the same Hijri date worldwide (e.g., Feb 29 = 19 Shaban everywhere)
2. **Maghrib Adjustment**: Since the Islamic day begins at sunset, you must pass the next Gregorian date if the current time is after Maghrib
3. **The converter ignores time** - it only looks at the date portion

This is why the current implementation takes both current time and Maghrib time as inputs.

### Key Design Decisions

1. **Umm al-Qura Calendar**: Uses the official Saudi calculation method as the base
2. **Self-Correction Algorithm**: Prevents permanent drift from manual adjustments by gradually returning to calculated dates
3. **Month Length Flexibility**: Supports both 29 and 30-day months to accommodate moon sighting variations
4. **Increment-Based Tracking**: More reliable than array-based approaches for maintaining consistency

## Testing

Run tests with:
```bash
cd sample_page
npm test
```

Tests cover:
- Date type validation
- Gregorian to Hijri conversion
- Maghrib time handling
- Month boundary transitions
- Increment/decrement operations

## References

- Umm al-Qura Calendar information: https://webspace.science.uu.nl/~gent0113/islam/ummalqura.htm
- AMJA methodology for moon sighting: https://www.amjaonline.org/declaration-articles/amjas-13th-convention-2021-methodology-for-confirming-the-new-moon/
- Various Hilal committees for regional moon sighting

