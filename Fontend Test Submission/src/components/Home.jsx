import { useState } from 'react';
import axios from 'axios';
import './Home.css'; 

function Home() {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState(30);
  const [customCode, setCustomCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/shorten', {
        url,
        validity,
        customCode
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert(err.response?.data?.error || 'Error shortening URL');
    }
  };

  return (
    <div className="container">
      <h1 className="title">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          required
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />

        {/* Optional inputs */}
        {/* <input
          type="number"
          placeholder="Validity in minutes"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Optional custom shortcode"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          className="input"
        /> */}

        <button type="submit" className="button">Shorten</button>
      </form>

      {shortUrl && (
        <div className="result">
          <p>Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a></p>
        </div>
      )}
    </div>
  );
}

export default Home;
