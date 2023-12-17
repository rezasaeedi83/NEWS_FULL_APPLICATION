import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../../../app/variables';

const War = () => {
  const [post, setPost] = useState({});
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toISOString().split('T')[0];

    axios.get(`https://newsapi.org/v2/everything?q=war&from=${yesterday}&to=${today}&sortBy=popularity&apiKey=${apiKey}`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      if (data.status === 'ok') {
        const articles = data.articles;
        setPost(articles[0]);
      } else {
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });
  
  }, [])

  return (
    <section className="home-war-section">
      <h2 className="home-war-section-title">War</h2>
      <a href={post.url} target="_blank">
        <div className="home-nature-wrapper">
            <div className="home-war-fullbox">
              <div className="home-image-wrapper">
                <img className="home-war-image" src={post.urlToImage} />
              </div>
              <div className="home-war-desc">
                <h1 className="home-war-title">
                  {post.title}
                </h1>
                {post.description}
                <br />
                  {post.publishedAt}
              </div>
            </div>
        </div>
      </a>
    </section>
  )
}

export default War;
