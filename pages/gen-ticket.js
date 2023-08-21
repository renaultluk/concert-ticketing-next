import { PDFDownloadLink } from "@react-pdf/renderer";
import getSheet from "../libs/sheets";
import TicketPDF from "../components/TicketPDF";
import { useEffect, useState } from "react";

const GenTicket = ({ sheet }) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const onDLClick = () => {
        var donwloadLinks = document.getElementsByTagName("a");

        for (var i = 0; i < donwloadLinks.length; i++) {
            donwloadLinks[i].click()
        }
    }

    return (
        <div>
            <button onClick={onDLClick}>Download all</button>
            {isClient &&
                sheet.map((value, index) => {
                    var ticketObj = {
                        id: value["ID"],
                        name: value["姓名 Name"],
                        time: value["時段 Session "],
                        venue: "灣仔皇后大道東 271號 國際禮拜堂 22 樓\n22/F, Methodist International Church, 271 Queen's Road East, Wan Chai",
                        numTickets: parseInt(value["全日制學生門票數量 Number of Full-time Student Ticket ($150)"]) + parseInt(value["標準門票數量 Number of Standard Ticket ($250)"])
                    }
                    return (
                        <div style={{ display: "block" }}>
                            <PDFDownloadLink document={<TicketPDF ticketObj={ticketObj} />} fileName={`${ticketObj.id}.pdf`}>
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : `${index} ${ticketObj.id} ${ticketObj.name}`)}
                            </PDFDownloadLink>
                        </div>
                    )
                })
            }
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

export default GenTicket;