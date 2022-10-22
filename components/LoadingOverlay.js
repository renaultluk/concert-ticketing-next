import { Spinner } from "react-bootstrap";

const LoadingOverlay = () => {
    return (
        <div className="loading" style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Spinner animation="grow" variant="success" style={{ height: 50, width: 50 }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>

        </div>
    )
}

export default LoadingOverlay;