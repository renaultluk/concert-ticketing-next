import { google } from 'googleapis';
const { GoogleSpreadsheet } = require('google-spreadsheet');

Array.prototype.pad = function(minSize, val) {
    var padded = new Array();
    for (var i = 0; i < this.length; i++) {
        padded.push(this[i]);//from   w  w w .j ava 2 s. co m
    }
    while (padded.length < minSize) {
        padded.push(val);
    }
    return padded;
}

function reformatSheet(arr) {
    const keys = arr[0];
    const resArr = arr.slice(1).map((row, rowIndex) => {
        return row.pad(keys.length, '').reduce((prevCell, currCell, cellIndex) => ({ ...prevCell, [keys[cellIndex]]: currCell }), {})
    })
    return resArr;
}

export default async function getSheet() {
    try {
        const target = ['https://www.googleapis.com/auth/spreadsheets'];
        const jwtClient = new google.auth.JWT(
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
            null,
            process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
            target
        );

        const doc = google.sheets({ version: 'v4', auth: jwtClient });
        const sheet = await doc.spreadsheets.values.get({
            spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET,
            range: "表格回應 1"
        })
        return reformatSheet(sheet.data.values);
    } catch (error) {
        console.log(error)
    }
}

export async function writeToSheet(rowIndex, colIndex, value) {
    try {
        const target = ['https://www.googleapis.com/auth/spreadsheets'];
        const jwtClient = new google.auth.JWT(
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
            null,
            process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
            target
        );

        const doc = google.sheets({ version: 'v4', auth: jwtClient });
        const sheet = await doc.spreadsheets.values.get({
            spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET,
            range: "表格回應 1"
        })
        console.log("got sheet")
        const targetCell = sheet.getCell(rowIndex, colIndex);
        targetCell.value = value;
        await sheet.saveUpdatedCells();
    } catch (error) {
        console.log(error)
    }
}

export async function writeToSheetGS(rowIndex, colIndex, value) {
    try {
        const target = ['https://www.googleapis.com/auth/spreadsheets'];
        // const jwtClient = new google.auth.JWT(
        //     process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        //     null,
        //     process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
        //     target
        // );

        const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET);

        await doc.useServiceAccountAuth({
            client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
            private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
        })
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        // const doc = google.sheets({ version: 'v4', auth: jwtClient });
        // const sheet = await doc.spreadsheets.values.get({
        //     spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET,
        //     range: "Form Responses 1"
        // })

        console.log("got sheet")
        await sheet.loadCells('A1:H500')
        const targetCell = sheet.getCell(rowIndex, colIndex);
        console.log(`rowIndex: ${rowIndex}, in sheet: ${targetCell.rowIndex}`)
        targetCell.value = value;
        await sheet.saveUpdatedCells();
    } catch (error) {
        console.log(error)
    }
}