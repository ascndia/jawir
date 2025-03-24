import React from "react";

const themeColors = {
  primary: {
    "800": "#1A365D",
  },
  secondary: {
    "500": "#805AD5",
  },
  cyan: {
    "500": "#00B5D8",
  },
  teal: {
    "500": "#319795",
  },
};

// Utility function to generate fallback background gradients
const generateFallbackBackground = (
  colors: string[],
  colorMode: string
): string => {
  return `
    radial-gradient(at top left, ${colors[0]} 30%, transparent 80%),
    radial-gradient(at bottom, ${colors[1]} 0%, transparent ${
    colorMode === "dark" ? "70%" : "60%"
  }),
    radial-gradient(at bottom left, ${colors[2]} 0%, transparent 50%),
    radial-gradient(at top right, ${colors[3]}, transparent),
    radial-gradient(at bottom right, ${colors[0]} 0%, transparent 50%)
  `;
};
// Utility function to generate gradient overlay
const generateGradientOverlay = (colorMode: string): string => {
  return `linear-gradient(180deg, 
    rgba(0, 0, 0, ${colorMode === "light" ? "0.05" : "0.6"}) 10%, 
    rgba(0, 0, 0, 0.8) 80%, 
    rgba(0, 0, 0, 1) 100%)`;
};

interface BackgroundProps {
  hideOverlay?: boolean;
  colorMode?: "light" | "dark";
  style?: React.CSSProperties;
}

const Background: React.FC<BackgroundProps> = ({
  hideOverlay = false,
  colorMode = "light",
  style = {},
}) => {
  const colors = [
    themeColors.primary["800"],
    themeColors.secondary["500"],
    themeColors.cyan["500"],
    themeColors.teal["500"],
  ];

  const fallbackBackground = generateFallbackBackground(colors, colorMode);
  const gradientOverlay = generateGradientOverlay(colorMode);

  const containerStyle: React.CSSProperties = {
    backgroundImage: fallbackBackground,
    backgroundBlendMode: "multiply",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "-1",
    opacity: colorMode === "light" ? "0.3" : "0.6",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    ...style,
  };

  const overlayStyle: React.CSSProperties = {
    backgroundImage: !hideOverlay ? gradientOverlay : undefined,
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    opacity: "0.9", // Slight transparency for blending
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
    </div>
  );
};

export default Background;
