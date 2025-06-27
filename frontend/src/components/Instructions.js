import '../css_file/Instructions.css';
import image_dark from '../icons_assets/nasa_dark_mode.jpg';
import image_light from '../icons_assets/nasa_light_mode.jpg';

function Instructions({ darkMode }) {
  return (
    <div className="instructions_wrapper" id="instructions">
      <h1 className='welcome'>
        Welcome to the <strong>NASA Data Explorer</strong>!
      </h1>
      <div className='instructions-and-image'>
        <div className='instructions-container'>
          <p className="instructions_sub">
            Before you begin your journey through the cosmos,<br />
            here are a few quick instructions to help you navigate the application effectively:
          </p>
          <ol>
            <li>
              This application uses official <strong>NASA APIs</strong> to fetch real-time data directly from NASA’s open data portal.
            </li>
            <li>
              Visit the <a className='instruction_link' href="#playground"><strong>Playground</strong></a> section to explore various publicly available APIs.
            </li>
            <li>
              Each API includes a short description, and you can click on <strong>Learn more</strong> for detailed information about that specific API.
            </li>
            <li>
              Some APIs require a <strong>date</strong> parameter — either <strong>select</strong> your preferred <strong>date</strong> or use the <strong>default</strong> date provided.
            </li>
            <li>
              Need help? Head over to the <a className='instruction_link' href='#contact_us'><strong>Contact Us</strong></a> section for assistance or inquiries.
            </li>
            <li>
              Before leaving, please take a moment to <a className='instruction_link' href='#rateus'><strong>rate your experience</strong></a> — your feedback is highly appreciated!
            </li>
          </ol>
        </div>
        <div className="image-container">
          <img
            src={darkMode ? image_dark : image_light}
            alt="NASA Themed Artwork"
            className="hq-image"
          />
        </div>
      </div>
      <p className='important'>
        <strong>Important:</strong> This application is built purely for educational purposes and is not officially affiliated with NASA.
      </p>
      <p className='note'>
        <strong>Note:</strong> This app is hosted using a free backend service. If you encounter an error saying "Backend is down," please wait for about a minute and try again — the backend will restart shortly. We appreciate your patience!
      </p>
      <p className="enjoy">🚀 Enjoy your journey through space and data!</p>
    </div>
  );
}

export default Instructions;