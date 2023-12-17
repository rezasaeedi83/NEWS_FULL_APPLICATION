import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../../../app/variables';

const Tech = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toISOString().split('T')[0];


  axios.get(`https://newsapi.org/v2/everything?q=tech&from=${yesterday}&to=${today}&sortBy=popularity&apiKey=${apiKey}`)
  .then(response => {
    if (response.data.status === 'ok') {
      let articles = response.data.articles.slice(0, 4);
      setPosts(articles);
    } else {
      console.error(response.data.message);
    }
  })
  .catch(error => {
    console.error(error);
  });
  }, []);

  return (
    <section className="home-tech-section-title">
      <div className="home-section-content">
        <h2 className="home-tech-section-title">Tech</h2>
        <div className='home-nature-wrapper'>
          {
            posts.map((post) => (
              <div className="home-tech-box">
                <a href={post.url} target="_blank">
                  <img className="home-nature-news-image" src={post.urlToImage} />
                  <h2 className="home-tech-title">{post.title}</h2>
                </a>
              </div>
            ))
          }

        </div>
      </div>
    </section>
  );
}
export default Tech;