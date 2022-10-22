import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Button, Container } from "react-bootstrap";
// import { Link, useSearchParams } from "react-router-dom";
import { useRouter } from "next/router";
import useGoogleSheets from "use-google-sheets";
import { GoogleSpreadsheet } from "google-spreadsheet";
import LoadingOverlay from "../components/LoadingOverlay";
// const { google } = require("googleapis");

const Ticket = () => {
    //TODO: Data connection
    const router = useRouter();
    const params = router.query;

    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState();
    
    //? google-spreadsheet
    const creds = {
        "type": process.env.REACT_APP_GOOGLE_ACCOUNT_TYPE,
        "project_id": process.env.REACT_APP_GOOGLE_PROJECT_ID,
        "private_key_id": process.env.REACT_APP_GOOGLE_PRIVATE_KEY_ID,
        "private_key": process.env.REACT_APP_GOOGLE_PRIVATE_KEY,
        "client_email": process.env.REACT_APP_GOOGLE_CLIENT_EMAIL,
        "client_id": process.env.REACT_APP_GOOGLE_CLIENT_ID,
        "auth_uri": process.env.REACT_APP_GOOGLE_AUTH_URI,
        "token_uri": process.env.REACT_APP_GOOGLE_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.REACT_APP_GOOGLE_AUTH_PROVIDER_URL,
        "client_x509_cert_url": process.env.REACT_APP_GOOGLE_CLIENT_CERT_URL
      }
    const doc = new GoogleSpreadsheet("");
    const getData = async () => {
        console.log(creds);
        await doc.useServiceAccountAuth(creds)
        console.log("passed auth")
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[0]
        const records = sheet.getRows()
        console.log(records)
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])
    
    //? googleapis
    // const JwtClient = new google.auth.JWT(
    //     process.env.GOOGLE_CLIENT_EMAIL,
    //     null,
    //     process.env.GOOGLE_PRIVATE_KEY,
    //     ["https://www.googleapis.com/auth/spreadsheets"]
    // );
    // const initGoogleAPI = async () => {
    //     await JwtClient.authorize();
    //     const client = google.sheets({ version: "v4", "auth": JwtClient });
    //     const data = await client.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET });
    //     console.log(data.data)
    //     setLoading(false);
    // }
    // useEffect(() => {
    //     initGoogleAPI()
    // }, [])


    //? useGoogleSheets
    // const { data, loading, error } = useGoogleSheets({
    //     apiKey: "AIzaSyAm7Un-DnLEowmL3E5EFO71Q20SXzGHI_k",
    //     sheetId: "1aaRSOCDI8QDyI4Ht3h7eLguzUV86COPo3iKnhdjrJb0"
    // })

    // const getData = async () => {
    //     // setLoading(false)
    // }
    // useEffect(() => {
    //     if (!loading) {
    //         console.log(data)
    //         // const ticketRecord = data.find(element => element['email'] === searchParams.get('email'))
    //         // if (ticketRecord) {
    //         //     console.log()
    //         // } else {

    //         // }
    //     }
    // }, [loading])
    
    
    const [ticketObj, setTicketObj] = useState({
        id: "a1234",
        name: "TSY",
        time: "19:30",
        venue: "Fulam Space Station",
        seat: "",
    });
    
    const seatSelected = ticketObj && ticketObj.seat.length > 0;
    

    
    return (
        <div className="w-100">
            {loading && <LoadingOverlay />}
            <Container className="w-100 d-flex flex-column justify-content-center">
                {/* Event Info */}
                <div className="d-flex flex-row align-items-center p-3" style={{ gap: "0.5em" }}>
                    <img width={60} style={{ aspectRatio: 1 }} />
                    <h3><b>North District Whatever the Fuck</b></h3>
                </div>
                
                <div className="d-flex justify-content-center p-2">
                    <QRCode value={ticketObj.id} />
                </div>

                <div className="p-3">
                    <div><b>Ticket Reference ID: </b>{ticketObj.id}</div>
                    <div><b>Name: </b>{ticketObj.name}</div>
                    <div><b>Time: </b>{ticketObj.time}</div>
                    <div><b>Venue: </b>{ticketObj.venue}</div>
                    <div><b>Seat: </b>{seatSelected ? ticketObj.seat : "Not yet arranged"}</div>
                </div>
                    {
                        !seatSelected && (
                            <div className="d-flex justify-content-center">
                                <span style={{ color: "#BBBBBD", textAlign: "center" }}>Seating arrangements will be announced 2 days before the event.</span>
                            </div>
                        )
                    }
            </Container>
        </div>
    )
}

export default Ticket;