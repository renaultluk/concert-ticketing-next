// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { writeToSheet, writeToSheetGS } from "../../libs/sheets";

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;
      writeToSheetGS(body.rowIndex, body.colIndex, body.value).then(
        (value) => {
          console.log("finished writing");
          res.status(200).json({ stat: "hello world" })
        }
      )
    } catch (error) {
      console.error(error);
    }
  } 
}
