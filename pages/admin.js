import { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
// import { QrReader } from "react-qr-reader";
import { useZxing } from "react-zxing";
import getSheet from "../libs/sheets";

const COUNT_TIME = 5;

const Admin = ({ sheet }) => {
    const [scannedTicket, setScannedTicket] = useState();

    const [time, setTime] = useState(COUNT_TIME);
    const timerRef = useRef(time);
    const [timerRunning, setTimerRunning] = useState(false);

    const [successAudio, setSuccessAudio] = useState()
    const [failureAudio, setFailureAudio] = useState()

    const loadingOverlay = useRef(null);

    useEffect(() => {
        setSuccessAudio(new Audio("/the-lick-success.mp3"))
        setFailureAudio(new Audio("/the-lick-fail.mp3"))
    }, [])

    const resetTimer = () => {
        timerRef.current = COUNT_TIME;
        setTime(COUNT_TIME);
        window.location.reload(false);
        setTimerRunning(false);
    }

    useEffect(() => {
        loadingOverlay.current.style.display = "none";
        if (scannedTicket) {
            const timerId = setInterval(() => {
                window.location.reload();
            }, 2000);
            console.log("timer set up")
            return () => {
                clearInterval(timerId);
            }
        }
    }, [scannedTicket])

    const checkInTicket = async (ticketID) => {
        const record = sheet.find(value => value.ID === ticketID);
        if (record) {
            if (record["Checked in"] === "TRUE") {
                failureAudio.play()
                alert("Ticket already checked in.");
            } else {
                console.log("checking in")
                const recordIndex = sheet.findIndex(value => value.ID === ticketID) + 1;
                const checkInIndex = Object.keys(record).findIndex(value => value === "Checked in");

                loadingOverlay.current.style.display = "flex";
                await fetch('/api/hello', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        rowIndex: recordIndex,
                        colIndex: checkInIndex,
                        value: "TRUE",
                    })
                })
                successAudio.play()
                setScannedTicket({
                    event: "Italian Baroque Euphoria",
                    id: ticketID,
                    time: record["時段 Session "],
                    name: record["姓名 Name"],
                })
                setTimerRunning(true);
            }
        } else {
            failureAudio.play()
            alert("Ticket ID not found.");
        }
    }

    useEffect(() => {
        if (scannedTicket) timerRef.current = 2;
    }, [scannedTicket])

    const { ref } = useZxing({
        onResult(result) {
            const ticketID = result?.getText();
            console.log("ticket ID", ticketID);
            checkInTicket(ticketID);

            // setScannedTicket({
            //     event: "North District Whatever the Fuck",
            //     id: ticketID,
            //     seat: "B4",
            //     name: "TSY",
            // })
        }
    })

    const timeRenderer = ({ hours, minutes, seconds }) => (
        <span>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="loading" ref={loadingOverlay} style={{
                display: "none",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 100,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Spinner animation="grow" variant="success" style={{ height: 50, width: 50 }}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

            </div>
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
                        <div><b>Time: </b>{scannedTicket.time}</div>
                        <div><b>Ticket Ref ID: </b>{scannedTicket.id}</div>
                        <div><b>Name: </b>{scannedTicket.name}</div>
                    </div>
                    <div style={{ color: "#BBBBBD", textAlign: "center" }}>Scanning next ticket in 2s</div>
                </>
            )}
            
            <Button onClick={() => window.location.reload(false)}>
                Scan Next
            </Button>
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

export default Admin;