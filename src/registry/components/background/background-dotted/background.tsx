// dotted background
export default function Background() {
  return (
    <div
      className="absolute inset-0 -z-10 h-[100vh] w-full pointer-events-none isolation-auto"
      style={{
        backgroundColor: "white",
        backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
  );
}
