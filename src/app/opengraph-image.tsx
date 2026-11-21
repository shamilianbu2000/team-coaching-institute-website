import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "TEAM Coaching Institute – Tuition & Coaching in Jayankondam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#142B49", color: "#fff", padding: 80 }}>
        <div style={{ display: "flex", color: "#F4B544", fontSize: 30, letterSpacing: 6 }}>JAYANKONDAM · ARIYALUR · TAMIL NADU</div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>TEAM Coaching Institute</div>
        <div style={{ display: "flex", fontSize: 38, marginTop: 28, color: "#dfe6ef" }}>Building Strong Foundations. Creating Brighter Futures.</div>
      </div>
    ),
    size,
  );
}
