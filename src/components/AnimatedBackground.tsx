const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating gradient orbs */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-float" 
           style={{ animationDuration: '20s', animationDelay: '0s' }}></div>
      
      <div className="absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/15 blur-[100px] animate-float" 
           style={{ animationDuration: '18s', animationDelay: '2s' }}></div>
      
      <div className="absolute bottom-[20%] left-[40%] w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[90px] animate-float" 
           style={{ animationDuration: '22s', animationDelay: '4s' }}></div>
      
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full" 
           style={{ 
             background: 'linear-gradient(135deg, hsl(240, 100%, 65% / 0.1), hsl(280, 100%, 65% / 0.1))',
             filter: 'blur(80px)',
             animation: 'float 25s ease-in-out infinite',
             animationDelay: '6s'
           }}></div>

      <div className="absolute bottom-[40%] right-[30%] w-[450px] h-[450px] rounded-full" 
           style={{ 
             background: 'linear-gradient(135deg, hsl(158, 64%, 52% / 0.15), hsl(175, 100%, 45% / 0.12))',
             filter: 'blur(110px)',
             animation: 'float 19s ease-in-out infinite',
             animationDelay: '8s'
           }}></div>
    </div>
  );
};

export default AnimatedBackground;
