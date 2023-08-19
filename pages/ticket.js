import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import Head from "next/head";
import LoadingOverlay from "../components/LoadingOverlay";
import getSheet from "../libs/sheets";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import TicketPDF from "../components/TicketPDF";

const Ticket = ({ sheet }) => {
    const router = useRouter();
    const queryEmail = router.query.email;
    
    const [loading, setLoading] = useState(true);
    const [ticketObj, setTicketObj] = useState({
        id: "a1234",
        name: "TSY",
        time: "19:30",
        venue: "Fulam Space Station",
        seat: "",
    });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // console.log(sheet);
        if (router.isReady) {
            console.log(queryEmail);
            const res = sheet.find(value => value["電郵 Email Address"] === queryEmail);
            if (res) {
                setTicketObj({
                    id: res["ID"],
                    name: res["姓名 Name"],
                    time: res["時段 Session"],
                    venue: "灣仔皇后大道東 271號 國際禮拜堂 22 樓\n22/F, Methodist International Church, 271 Queen's Road East, Wan Chai",
                    numTickets: parseInt(res["全日制學生門票數量 Number of Full-time Student Ticket ($150)"]) + parseInt(res["標準門票數量 Number of Standard Ticket ($250)"])
                })
                setLoading(false);
            } else {
                alert("Email not found, please enter a valid email.");
                router.back();
            }
            setIsClient(true);
        }
    }, [router.isReady])    
    
    
    // const seatSelected = ticketObj && ticketObj.seat.length > 0;
    

    
    return (
        <div className="w-100">
            <Head>
                <title>Check My Ticket | ArtsyEventHK</title>
            </Head>
            {loading && <LoadingOverlay />}
            <Container className="w-100 d-flex flex-column justify-content-center">
                {/* Event Info */}
                <div className="d-flex flex-row align-items-center p-3" style={{ gap: "0.5em" }}>
                    <img 
                        src="/Italian_Baroque.png"
                        width={60} 
                        style={{ aspectRatio: 1, objectFit: "cover" }} 
                    />
                    <h3><b>Italian Baroque Euphoria: Recorder Recital by Tong Shee Yiu</b></h3>
                </div>
                
                <div className="d-flex justify-content-center p-2">
                    <QRCode value={(ticketObj.id && ticketObj.id.length > 0) ? ticketObj.id : "abcde"} />
                </div>

                <div className="p-3">
                    {/* <div><b>Ticket Reference ID: </b>{ticketObj.id}</div> */}
                    <div><b>姓名 Name: </b>{ticketObj.name}</div>
                    <div><b>場次 Session: </b>{ticketObj.time}</div>
                    <div><b>場地 Venue: </b>{ticketObj.venue}</div>
                    <div><b>門票數量 No. of Ticket(s): </b>{ticketObj.numTickets}</div>
                    <div><b>自由入座 Free Seating</b></div>
                </div>
                    {/* {
                        !seatSelected && (
                            <div className="d-flex justify-content-center">
                                <span style={{ color: "#BBBBBD", textAlign: "center" }}>Seating arrangements will be announced 2 days before the event.</span>
                            </div>
                        )
                    } */}
                {isClient && (
                    <div id="ticket-pdf">
                        <PDFDownloadLink document={<TicketPDF ticketObj={ticketObj} />} fileName="ticket.pdf">
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Ticket PDF')}
                        </PDFDownloadLink>
                        {/* <PDFViewer>
                            <TicketPDF ticketObj={ticketObj} />
                        </PDFViewer> */}
                    </div>
                )}
            </Container>
        </div>
    )
}

export async function getServerSideProps() {
    const sheet = await getSheet();
    return {
        props: {
            sheet: sheet
        }
    }
}

export default Ticket;