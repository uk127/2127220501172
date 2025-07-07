import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/lookup/${code}`)
      .then(res => {
        window.location.href = res.data.url;
      })
      .catch(() => {
        alert("Short URL not found or expired.");
      });
  }, [code]);

  return <p>Redirecting...</p>;
}

export default RedirectPage;
