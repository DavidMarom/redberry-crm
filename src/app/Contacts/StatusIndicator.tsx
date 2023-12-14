
export const StatusIndicator = ({ val }: { val: string }) => {
    let color = "#D9D9D9";
    if (val === "Active") color = "#52C41A";
    if (val === "Blocked") color = "#F3218A";

    return (
        <div className="status-indicator">
            <span style={{ color: color, fontWeight: "bold", marginRight: "9px" }}>●</span>
            {val}
        </div>
    );
}