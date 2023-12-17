import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { apiKey } from '../../../app/variables';
import nature from '../../../assets/nature.jpg';


const Nature = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toISOString().split('T')[0];

    axios.get(`https://newsapi.org/v2/everything?q=jungle&from=${yesterday}&to=${today}&sortBy=popularity&apiKey=${apiKey}`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      if (data.status === 'ok') {
        let articles = data.articles.slice(0, 3);
        setPosts(articles);
      } else {
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });
    }, []);

  return (
    <div className="home-section">
      <div className="home-section-content">
        <h2 className="home-section-title">Nature</h2>
        <div className="home-nature-wrapper">
          {
            posts.map((post) => (
              <div className="home-nature-box">
                <Link
                  to={{
                    pathname: `/news/${post.title}`,
                    state: { item: post }
                  }}
                >
                  <img className="home-nature-news-image" src={post.urlToImage} />
                  <h2 className="home-nature-post-title">{post.title}</h2>
                  </Link>
              </div>
            ))
          }

        </div>
      </div>
      <div className="home-nature-background">
        <img className="home-nature-post-photo" src={nature} />
      </div>
    </div>
  );
}
export default Nature;