import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// import { QrReader } from "react-qr-reader";
import { useZxing } from "react-zxing";

const Admin = () => {
    const [scannedTicket, setScannedTicket] = useState();

    //TODO: Data connection

    const { ref } = useZxing({
        onResult(result) {
            const ticketID = result?.getText();
            console.log("ticket ID", ticketID);
            setScannedTicket({
                event: "North District Whatever the Fuck",
                id: ticketID,
                seat: "B4",
                name: "TSY",
            })
        }
    })

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Ticket Verification</h1>
            <video 
                height={500}
                ref={ref}
                style={{ 
                    display: scannedTicket ? "none" : "flex", 
                    width: "100%",
                    maxWidth: 500,
                    // aspectRatio: 9/16,
                }}
            />

            {scannedTicket && (
                <>
                    <img src="/Flat_tick_icon.svg" width={150} height={150} style={{ alignSelf: "center", margin: "0.5em" }} />
                    <div className="p-3">
                        <div><b>Event: </b>{scannedTicket.event}</div>
                        <div><b>Ticket Ref ID: </b>{scannedTicket.id}</div>
                        <div><b>Seat: </b>{scannedTicket.seat}</div>
                        <div><b>Name: </b>{scannedTicket.name}</div>
                    </div>
                </>
            )}
            
            <Button onClick={() => window.location.reload(false)}>
                Scan Next
            </Button>
        </div>
    )
}

export default Admin;