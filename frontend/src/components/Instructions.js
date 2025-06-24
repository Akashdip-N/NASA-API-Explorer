import '../css_file/Instructions.css';
import image_dark from '../icons_assets/nasa_dark_mode.jpg';
import image_light from '../icons_assets/nasa_light_mode.jpg';

function Instructions({ darkMode }) {
  return (
    <section className="instructions_wrapper" id="instructions">
      <div className="instructions-container">
        <div className="instructions-content">
          <p className="instructions_main">
            <h1 className='welcome'>
              Welcome to the <strong>NASA Data Explorer</strong>!
            </h1>
            <br />
            <p className="instructions_sub">
              Before you embark on your journey through the cosmos. <br>
              </br>
              Here are some quick instructions to help you navigate this application effectively:
            </p>
          </p>
          <ol>
            <li>
              This application utilizes official <strong>NASA APIs</strong> to fetch real-time data directly from their open data portal.
            </li>
            <li>
              Visit the <a href="#playground"><strong>Playground</strong></a> section to explore different APIs available for public use.
            </li>

            <li>
              For each API, you would see a small description of what it does, and you can click on the <strong>Learn more</strong> option to get more details about that API.
            </li>
            <li>
              Some APIs require a <strong>date</strong> parameter — either <strong>select</strong> your preferred <strong>date</strong>, or simply use the <strong>preselected</strong> date.
            </li>
            <li>
              Need assistance? Visit the <a href='#contact_us'><strong>Contact Us</strong></a> section for help or queries.
            </li>
            <li>
              Before you leave, please take a moment to <a href='#rateus'><strong>rate your experience</strong></a> in the Rate Us section — your feedback matters!
            </li>
          </ol>
          <p className="enjoy">🚀 Enjoy your journey through space and data!</p>
          </div>
      </div>
      <div className="image-container">
        <img
          src={darkMode ? image_dark : image_light}
          alt="NASA Themed Artwork"
          className="hq-image"
        />
      </div>
    </section>
  );
}

export default Instructions;
