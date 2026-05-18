import "../App.css";
import bgImage from "../assets/bg.jpg"; 


export default function Background() {
  return (
    <div className="bg-img-wrapper">
      <div
        className="bg-img-top"
        style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="bg-overlay"></div>
      </div>

      <div className="bg-img-bottom"></div>
    </div>
  );
}
