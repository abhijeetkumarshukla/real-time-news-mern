import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingNews, addNews } from '../redux/slices/newsSlice';
import socket from '../socket';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchTrendingNews());

    socket.on('newsUpdate', (newNews) => {
      dispatch(addNews(newNews));
    });

    return () => {
      socket.off('newsUpdate');
    };
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="news-feed">
      <h2>Trending News</h2>
      {news.map((item) => (
        <div key={item._id} className="news-item">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;