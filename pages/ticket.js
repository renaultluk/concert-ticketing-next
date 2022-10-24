import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import LoadingOverlay from "../components/LoadingOverlay";
import getSheet from "../libs/sheets";

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

    useEffect(() => {
        // console.log(sheet);
        const res = sheet.find(value => value["電郵地址"] === queryEmail);
        if (res) {
            setTicketObj({
                id: res["ID"],
                name: res["Name 姓名"],
                time: res["Session 時段 "],
                venue: "McAulay Studio, Hong Kong Arts Centre, 2 Harbour Road, Wan Chai, Hong Kong",
                seat: res["Seating"],
            })
            setLoading(false);
        } else {
            alert("Email not found, please enter a valid email.");
            router.back();
        }
    }, [])    
    
    
    const seatSelected = ticketObj && ticketObj.seat.length > 0;
    

    
    return (
        <div className="w-100">
            {loading && <LoadingOverlay />}
            <Container className="w-100 d-flex flex-column justify-content-center">
                {/* Event Info */}
                <div className="d-flex flex-row align-items-center p-3" style={{ gap: "0.5em" }}>
                    <img width={60} style={{ aspectRatio: 1 }} />
                    <h3><b>Querencia: Tong Shee Yiu Recorder Recital</b></h3>
                </div>
                
                <div className="d-flex justify-content-center p-2">
                    <QRCode value={(ticketObj.id && ticketObj.id.length > 0) ? ticketObj.id : "abcde"} />
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

export async function getStaticProps() {
    const sheet = await getSheet();
    return {
        props: {
            sheet: sheet
        }
    }
}

export default Ticket;