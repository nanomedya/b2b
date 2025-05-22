import React from "react";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Ekstra prop'lar eklemek isterseniz buraya ekleyebilirsiniz.
}

const Logo: React.FC<LogoProps> = (props) => (
  <img src="/static/logo.png" {...props} />
);

const Logo2: React.FC<LogoProps> = (props) => (
  <img src="/static/logo2.png" {...props} />
);

export default Logo;
export { Logo2 };
