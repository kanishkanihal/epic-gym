# Epic Gym - Google Sheets Workout Tracker

A Google Apps Script that powers cascading dropdowns in a gym workout tracking spreadsheet. Designed to work on **mobile** (Google Sheets app) with no setup required after copying.

## How It Works

The spreadsheet has two key sheets:

- **Exercises** — where clients log their workouts
- **Data** — a hidden sheet that holds the exercise list, kept live via `IMPORTRANGE`

When a user selects a muscle group in column B, the script automatically populates column C with the matching exercises from the Data sheet.

## Architecture

```
Data Spreadsheet (shared, public/readonly)
        │
        │  IMPORTRANGE (live sync)
        ▼
Data sheet (hidden, inside each copy)
        │
        │  onEdit trigger (simple, works on mobile)
        ▼
Exercises sheet (user-facing)
```

The exercise data is managed in a single shared spreadsheet. All copies stay up to date automatically — no manual sync needed.

## Setup

### 1. Create the Data Spreadsheet

Create a new Google Spreadsheet with a sheet named `Data` and the following columns:

| A | B | C |
|---|---|---|
| Muscle Group | Exercise Name | Video URL |

Share it as **Anyone with the link → Viewer**.

### 2. Set Up the Template Spreadsheet

1. Create a sheet named `Data` in the gym spreadsheet
2. In cell `A1` paste:
   ```
   =IMPORTRANGE("YOUR_DATA_SPREADSHEET_ID", "Data!A:C")
   ```
3. Click **Allow access** when prompted
4. Hide the sheet (right-click → Hide sheet)

### 3. Set Up Dropdowns in the Exercises Sheet

There are two cascading dropdowns — column B is set up manually once in the template, column C is generated automatically by the script.

**Column B — Muscle Group**

1. Select the cells in column B where workouts will be entered (e.g. `B9:B100`)
2. Go to **Data → Data validation**
3. Set criteria to **Dropdown (from a range)**
4. Enter: `Data!A2:A`
5. Save

**Column C — Exercise**

No setup needed. When the user selects a muscle group in column B, the script automatically creates a dropdown in column C with only the exercises that belong to that muscle group.

### 4. Add the Script

1. Open the gym spreadsheet → Extensions → Apps Script
2. Paste the contents of `app.gs`
3. Save

### 4. Distribute to Clients

Share the template with clients or let them make a copy.

**After copying**, the client only needs to:
1. Open the spreadsheet
2. Tap **Allow access** on the IMPORTRANGE prompt (appears inside the sheet)

That's it — dropdowns work immediately on mobile, no script setup required.

## Updating Exercise Data

Edit the shared Data spreadsheet. All copies reflect the changes automatically.

## Demo

[Watch on YouTube](https://youtu.be/ikJ36HX_z7w)

## File Structure

```
app.gs                   — Apps Script bound to the gym spreadsheet
exercises-template.csv   — Template structure for the Exercises sheet
database.csv             — Sample exercise data for the Data spreadsheet
```
