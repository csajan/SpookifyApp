import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      style={{
        backgroundColor: "#2b0047",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ color: "#f4e78a", marginBottom: "20px" }}>
        Welcome to Spookify 🤑
      </h1>
      <div
        style={{
          border: "2px solid #f4e78a",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <SignIn />
      </div>
    </div>
  );
}
