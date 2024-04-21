//Home.js

import { Link } from "react-router-dom";
import home_img from "../assets/home1.png";
import doctor from "../assets/therapist_img.png";
import account from "../assets/account.png";
import details from "../assets/details.png";
import activities from "../assets/activities.png";
import process from "../assets/steps_img.png";
import submit from "../assets/submit.png";
import "./styles/home.css";

function Home() {
  return (
    <div className="main">
      <div className="page">
        <div className="sec1text">
          <h1 className="maintext">You deserve to feel your best</h1>
          <p className="paratext">
            Start feeling like yourself again with convenient,affordable online
            therapy
          </p>
          <div className="joinButton">
            <Link to="/Mainpage">
              <img src={submit} alt="" />
              <h2>Join Us</h2>
            </Link>
          </div>
        </div>
        <div className="home_img">
          <img src={home_img} alt="" />
        </div>
      </div>
      <div className="pro_image">
        <div className="stepimage">
          <img src={process} width="600" height="500" alt="" />
        </div>
        <div className="pro_text">
          <h1>Few Steps for Your Solution</h1>
          <div>
            <p className="step_1">
              <img src={account} alt="" />
              Join us with your basic details
            </p>
            <p className="step_1">
              <img src={details} alt="" />
              Fill the forms requested with proper understanding
            </p>
            <p className="step_1">
              <img src={activities} alt="" />
              Know your Wellness Status and proceed with few Activities{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="doc_image">
        <div className="doc_text">
          <h1 className="maintext">We Are Here</h1>
          <p>
            Mental health awareness is crucial for young age students as it
            helps them recognize mental health problems, reduce stigma, improve
            academic performance, build resilience, and improve social
            interactions. By promoting mental health awareness, we can encourage
            early intervention and support students in achieving their full
            potential.
            <br />
            <br />
            Mental health issues can impact students' overall well-being and
            academic performance, so it's important to create a safe and
            supportive environment where students can seek help and support
            without fear of judgment or discrimination. Awareness on mental
            health issues can equip students with resilience and coping skills
            to manage stress and overcome challenges.
          </p>
        </div>
        <div>
          <img src={doctor} width="600" height="500" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
