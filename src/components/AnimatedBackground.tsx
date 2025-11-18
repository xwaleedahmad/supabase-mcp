const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Floating gradient orbs */}
      <div
        className="bg-primary/25 animate-float absolute top-[10%] left-[6%] h-[500px] w-[600px] rounded-full blur-[200px]"
        style={{ animationDuration: "20s", animationDelay: "0s" }}
      ></div>

      <div
        className="bg-primary/10 animate-float absolute top-[60%] right-[10%] h-[400px] w-[600px] rounded-full blur-[200px]"
        style={{ animationDuration: "18s", animationDelay: "2s" }}
      ></div>

      <div
        className="bg-primary/30 animate-float absolute bottom-[20%] left-[35%] h-[350px] w-[600px] rounded-full blur-[300px]"
        style={{ animationDuration: "22s", animationDelay: "4s" }}
      ></div>

      <div
        className="absolute top-[40%] left-[60%] h-[300px] w-[300px] rounded-full"
        style={{
          background:
            "linear-gradient(135deg, hsl(240, 100%, 65% / 0.1), hsl(280, 100%, 65% / 0.1))",
          filter: "blur(80px)",
          animation: "float 25s ease-in-out infinite",
          animationDelay: "6s",
        }}
      ></div>

      <div
        className="absolute right-[30%] bottom-[40%] h-[450px] w-[450px] rounded-full"
        style={{
          background:
            "linear-gradient(135deg, hsl(158, 64%, 52% / 0.15), hsl(175, 100%, 45% / 0.12))",
          filter: "blur(110px)",
          animation: "float 19s ease-in-out infinite",
          animationDelay: "8s",
        }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
