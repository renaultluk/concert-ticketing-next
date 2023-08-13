import { Document, Page, View, Text, StyleSheet, Image, Font } from "@react-pdf/renderer";

const TicketPDF = (props) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    {/* <Text style={{ fontFamily: "Helvetica-Bold" }}>ArtsyEventHK</Text> */}
                    <Image 
                        src="/Italian_Baroque_Header.jpg"
                    />
                </View>
                
                <View style={styles.mainContainer}>
                    <Text style={styles.titleText}>Italian Baroque Euphoria: Recorder Recital by Tong Shee Yiu</Text>
                    {/* <View style={styles.concertBox}>
                        <Image 
                            src="/Italian_Baroque.png" 
                            style={styles.posterImage}
                        />
                    </View> */}

                    {/* <View> */}
                        <View style={styles.qrCodeContainer}>
                            <Image 
                                src={` https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${props.ticketObj.id}&color=894b06`}
                                style={styles.qrCode}
                            />
                            <Text style={styles.ticketIDText}>{props.ticketObj.id}</Text>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoBoxHeader}>
                                <Text><Text style={styles.chineseText}>姓名</Text> Name</Text>
                                <Text><Text style={styles.chineseText}>場次</Text> Session</Text>
                                <Text><Text style={styles.chineseText}>場地</Text> Venue</Text>
                                <Text> </Text>
                                <Text> </Text>
                                <Text><Text style={styles.chineseText}>門票數量</Text> No. of Ticket(s)</Text>
                                <Text><Text style={styles.chineseText}>自由入座</Text> Free Seating</Text>
                            </View>
                            <View style={styles.infoBoxHalf}>
                                <Text>{props.ticketObj.name}</Text>
                                <Text>23/8/2023 {props.ticketObj.time}</Text>
                                <Text style={styles.chineseText}>灣仔皇后大道東 271號 國際禮拜堂 22 樓</Text>
                                <Text>22/F, Methodist International Church, 271 Queen's Road East, Wan Chai</Text>
                                <Text>{props.ticketObj.numTickets}</Text>
                            </View>
                        </View>
                    {/* </View> */}

                    <View style={styles.reminderBox}>
                        <Text style={[styles.reminderText, styles.chineseText]}>請提早至少 10 至 15 分鐘到達國際禮拜堂 22 樓，並預留時間入場。音樂會不設劃位，觀眾可自由選擇座位。</Text>
                        <Text style={[styles.reminderText, styles.reminderTextBottom]}>Please arrive at the Methodist International Church, 22nd floor, 10-15 minutes early for the concert and allow time for entry. Seating is unassigned, so you can freely choose your preferred seat.</Text>

                        <Text style={[styles.reminderText, styles.chineseText]}>請提早預備電子門票，並按指示掃描二維碼入場。</Text>
                        <Text style={[styles.reminderText, styles.reminderTextBottom]}>Please prepare your electronic ticket in advance and scan the provided QR code for entry.</Text>

                        <Text style={[styles.reminderText, styles.chineseText]}>節目進行期間，歡迎觀眾進行拍攝和錄影，並將精彩時刻分享到社交媒體，唯需關閉裝置的閃光燈及調校到靜</Text>
                        <Text style={[styles.reminderText, styles.chineseText]}>音模式。</Text>
                        <Text style={[styles.reminderText, styles.reminderTextBottom]}>Feel free to take photos and videos during the performance and share the highlights on social media. Please remember to turn off the flash and set your devices to silent mode.</Text>

                        <Text style={[styles.reminderText, styles.chineseText]}>演出長約 1 小時 30 分鐘，包括 15 分鐘中場休息。</Text>
                        <Text style={[styles.reminderText, styles.reminderTextBottom]}>The concert is approximately 1 hour and 30 minutes long, including a 15-minute intermission.</Text>

                        <Text style={[styles.reminderText, styles.chineseText]}>男女及殘疾人士洗手間位於同層升降機旁。</Text>
                        <Text style={styles.reminderText}>Restrooms for men, women, and people with disabilities are located near the same floor's elevators.</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

Font.register({
    family: 'ZCool',
    src: 'https://fonts.gstatic.com/ea/cwtexyen/v3/cwTeXYen-zhonly.ttf'
});

Font.register({
    family: "Merriweather",
    fonts: [
        { src: "/Merriweather/Merriweather-Regular.ttf" },
        { src: "/Merriweather/Merriweather-Bold.ttf", fontWeight: 700 },
        { src: "/Merriweather/Merriweather-Black.ttf", fontWeight: 900 },
    ]
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "ZCool",
        // fontSize: 8,
    },
    headerContainer: {
        backgroundColor: "#FFBD59",
        // backgroundColor: "#946d5c",
        padding: 8,
        alignItems: "center",
    },
    mainContainer: {
        padding: 20,
        alignItems: "center",
    },
    titleText: {
        fontFamily: "Merriweather",
        fontWeight: 900,
    },
    chineseText: {
        fontFamily: "ZCool",
    },
    concertBox: {
        width: '100%',
        paddingHorizontal: 16,
    },
    posterImage: {
        height: 300,
    },
    qrCodeContainer: {
        width: 150,
        alignItems: "center",
        textAlign: "center",
        marginVertical: 24,
    },
    qrCode: {
        width: 150,
        height: 150,
    },
    ticketIDText: {
        fontFamily: "Helvetica",
        marginTop: 4,
        fontSize: 9,
    },
    infoBox: {
        width: "100%",
        fontSize: 12,
        marginVertical: 18,
        paddingHorizontal: 16,
        display: "flex",
        flexDirection: "row",
        // padding: 8,
    },
    infoBoxHeader: {
        width: "30%",
    },
    infoBoxHalf: {
        width: "70%",
    },
    reminderBox: {
        backgroundColor: "#EEEEEE",
        padding: 12,
    },
    reminderText: {
        fontSize: 12,
    },
    reminderTextBottom: {
        marginBottom: 12,
    }
});

export default TicketPDF;