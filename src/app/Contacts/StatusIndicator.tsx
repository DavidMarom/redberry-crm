
export const StatusIndicator = ({ val }: { val: string }) => {
    let color = "#D9D9D9";
    if (val === "Active") color = 'rgb(138, 196, 196)';
    if (val === "Blocked") color = '#D9D9D9';
    if (val === "Awaiting Call") color = 'rgb(234, 161, 50)';

    return (
        <div className="status-indicator">
            <span style={{ color: color, fontWeight: "bold", marginRight: "9px" }}>●</span>
            {val}
        </div>
    );
}
