import mainLogo from "assets/img/logo-main.png"
import { Link } from "react-router-dom";
import "styles/Home.css"

type LogoProps = {
  variant : "main" | "sub";
  coverTag : "h1" | "h2" | "h3" | "h4" | "div";
  className : string;
}

export default function Logo({variant, coverTag : Tag, className} : LogoProps){
    let imgSrc : string;
    switch (variant){
      case "main" : imgSrc = mainLogo; break;
      case "sub" : imgSrc = ""; break;
    }

    return(
      <Tag className={className}>
        <Link to="/"><img src={imgSrc} alt="로고이미지"/></Link>
      </Tag>
    )
}