import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Button, Container, Col } from 'react-bootstrap';
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const checkTicket = () => {
        var promptMessage = "Please enter your email:";
        var done = false;
        while (!done) {
            const queryEmail = prompt(promptMessage, "");
            if (!queryEmail) {
                done = true;
                break;
            }
            if (validateEmail(queryEmail)) {
                done = true;
                router.push({
                    pathname: "/ticket",
                    query: { email: queryEmail },
                });
            } 
            else {
                promptMessage = "The email entered is not valid. Please try again.";
            }
        }
        
    }
    
    return (
        <>
            <Head>
                <title>Placeholder Title</title>
            </Head>
            <div 
                className="d-flex flex-column flex-sm-row align-items-center p-0 p-sm-5"
                style={{
                    position: "relative",
                    flex: 1,
                }}
            >
                <Col xs={12} sm={3} style={{ padding: 0 }}>
                    <img 
                            src="/event_poster_placeholder.jpg"
                            className="d-flex w-100"
                    />
                </Col>
                <Container className="p-3">
                        <h1>
                            Querencia: Tong Shee Yiu Recorder Recital 
                        </h1>
                        <div><b>Date: </b>27 December 2022</div>
                        <div><b>Time: </b>3:00 pm / 7:30 pm</div>
                        <div><b>Venue: </b>McAulay Studio, Hong Kong Arts Centre, 2 Harbour Road, Wan Chai, Hong Kong</div>
                        <div><b>Ticket Price: </b>$ 200</div>
                        <div>*For ages 6 and above</div>

                        <div>Should you have any enquiries, please WhatsApp us at (+852) 90921157.</div>

                        <div style={{ height: 40 }} />

                        <div 
                                className="d-none d-sm-flex justify-content-center p-2"
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    gap: "0.5em",
                                }}
                        >
                                <Button 
                                    className="d-flex flex-fill justify-content-center"
                                    href="https://getbootstrap.com/docs/4.0/utilities/text/"
                                    target="_blank"
                                >
                                    Get a Ticket
                                </Button>
                                <Button 
                                    className="d-flex flex-fill justify-content-center"
                                    variant="outline-primary"
                                    onClick={checkTicket}
                                >
                                    Check My Ticket
                                </Button>
                        </div>
                </Container>


                <div 
                        className="w-100 d-flex d-sm-none justify-content-center p-2"
                        style={{
                            backgroundColor: "#FFFFFF",
                            position: "sticky",
                            bottom: 0,
                            gap: "0.5em",
                        }}
                >
                        <Button 
                            className="d-flex flex-fill justify-content-center"
                            href="https://docs.google.com/forms/d/1qZIAwpvraB31DB1saaV1AI56IygcEhDlh_0-fAJzYig/viewform?edit_requested=true"
                            target="_blank"
                        >
                            Get a Ticket
                        </Button>
                        <Button 
                            className="d-flex flex-fill justify-content-center"
                            variant="outline-primary"
                            onClick={checkTicket}
                        >
                            Check My Ticket
                        </Button>
                </div>
            </div>
        </>
    )
}
