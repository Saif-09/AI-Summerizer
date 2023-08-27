import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets'; // Assuming you have these assets
import { useLazyGetSummaryQuery } from '../services/article'; // Assuming you have this service

// Define the Summerizer component
const Summerizer = () => {
  // State to manage article data
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  // State to manage all articles
  const [allArticles, setAllArticle] = useState([]);

  // Lazy query for getting article summaries
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // State to manage copied status
  const [copied, setCopied] = useState("");

  // Load articles from local storage on component mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
    if (articlesFromLocalStorage) {
      setAllArticle(articlesFromLocalStorage);
    }
  }, []);

// Handle form submission to get article summary
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Fetch the article summary using the getSummary query
  const { data } = await getSummary({ articleUrl: article.url });

  // Check if the summary data was successfully obtained
  if (data?.summary) {
    // Create a new article object with the updated summary
    const newArticle = { ...article, summary: data.summary };

    // Update the list of all articles with the new article added to the beginning
    const updatedAllArticles = [newArticle, ...allArticles];

    // Update the state with the new article and list of all articles
    setArticle(newArticle);
    setAllArticle(updatedAllArticles);

    // Store the updated list of articles in local storage
    localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
  }
}


  // Handle copying URL to clipboard
const handleCopy = (copyUrl) => {
  // Set the 'copied' state to the URL being copied
  setCopied(copyUrl);

  // Use the Clipboard API to write the URL to the clipboard
  navigator.clipboard.writeText(copyUrl);

  // Reset the 'copied' state after a delay of 3000 milliseconds (3 seconds)
  setTimeout(() => setCopied(false), 3000);
}


return (
  <section className='mt-16 w-full max-w-xl'>
    {/* Form to enter URL */}
    <div className='flex flex-col w-full gap-2'>
      <form
        className='relative flex justify-center items-center'
        onSubmit={handleSubmit}
      >
        {/* Input for URL */}
        <img src={linkIcon} alt="link_icon" className='absolute left-0 my-2 ml-3 w-5' />
        <input
          type="url"
          placeholder='Enter a URL'
          value={article.url}
          onChange={(e) => setArticle({ ...article, url: e.target.value })}
          required
          className='url_input peer-focus:border-gray-700 peer-focus:text-gray-700'
        />
        <button type='submit' className='submit_btn'>🫰</button>
      </form>

      {/* History of articles */}
      <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
        {allArticles.map((item, index) => (
          <div
            key={`link-${index}`}
            onClick={() => setArticle(item)}
            className='link_card'
          >
            {/* Copy button */}
            <div className='copy_btn' onClick={() => handleCopy(item.url)}>
              <img src={copied === item.url ? tick : copy} alt="copy_icon" className='w-[40%] h-[40%] object-contain' />
            </div>
            {/* Display article URL */}
            <p className='flex-1 font-satoshi text-green-700 font-medium text-sm truncate'>{item.url}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Results section */}
    <div className='my-10 max-w-full flex justify-center items-center'>
      {isFetching ? (
        // Loading spinner
        <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
      ) : error ? (
        // Error message
        <p className='font-inter font-bold text-black text-center'>
          Well, that wasn't supposed to happen...
          <br />
          <span className='font-satoshi font-normal text-gray-700'>
            {error?.data?.error}
          </span>
        </p>
      ) : (
        // Display article summary
        article.summary && (
          <div className='flex flex-col gap-3'>
            <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
              Article's <span className='blue_gradient'>Summary</span>
            </h2>
            <div className='summary_box'>
              <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
            </div>
          </div>
        )
      )}
    </div>
  </section>
)

}


export default Summerizer;
