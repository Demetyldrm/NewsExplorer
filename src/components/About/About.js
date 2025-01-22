import { React } from "react";
import authorImage from "../../images/avatar.png";
import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__avatar-container">
        <img
          className="about__picture"
          src={authorImage}
          alt="author avatar"
        ></img>
      </div>
      <div className="about__info-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          This web application was developed as my TripleTen graduation project.
        </p>
        <p className="about__text">
          In the past 10 months, I learned HTML, CSS, JavaScript, React,
          Node.js, Express.js. And during my full-stack Software Developer
          training, I get to work on different projects to practice my new
          skills.
        </p>
      </div>
    </section>
  );
}

export default About;
