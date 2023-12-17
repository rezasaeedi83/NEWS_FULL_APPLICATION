import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';
import { apiKey } from '../../app/variables';

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    console.log(news);
  }, [news]);



  const search = (term) => {
    const today = new Date().toISOString().split('T')[0];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toISOString().split('T')[0];
    axios.get(`https://newsapi.org/v2/everything?q=${term}&from=${yesterday}&to=${today}&sortBy=popularity&apiKey=${apiKey}`)
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
        setNews(articles);
      } else {
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });

  }

  return (
    <div className="news-list-container">
      <Search search={search}/>
      <ul>
        {
          news.map((item) => (
            <li className="news-item-li">
              <button className="news-item-button">
                <Link
                  to={{
                    pathname: `/news/${item.title}`,
                    state: { item }
                  }}
                >
                  <div className="news-button-inner">
                    <h1 className="news-item-title">
                      {item.title}
                    </h1>
                    <h2 className="news-published-date">
                      {item.publishedAt}
                    </h2>
                    <span className="news-item-span"></span>
                  </div>
                </Link>
              </button>
            </li>
            ) 
          )
        }
      </ul>
    </div>
  );
}

export default NewsList;