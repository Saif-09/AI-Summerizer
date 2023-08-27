import { logoname } from '../assets'; // Assuming you have a file for importing logoname
import { FaGithub } from 'react-icons/fa';

// Define the Hero component
const Hero = () => {
  return (
    // Header section containing navigation and title
    <header className='w-full flex justify-center items-center flex-col'>
      {/* Navigation bar */}
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        {/* Logo */}
        <a href="#">
          <img src={logoname} alt="sumr_logo" className='w-14 md:w-28' />
        </a>
        {/* GitHub link button */}
        <button
          type='button'
          onClick={() => window.open('https://github.com/Saif-09')}
          className='black_btn'
        >
          <FaGithub className="text-white text-lg md:text-2xl" />
        </button>
      </nav>
      
      {/* Main title */}
      <h1 className='head_text select-none'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      
      {/* Subtitle */}
      <h2 className='desc select-none'>
        Simplify your reading with Summizy, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero;
