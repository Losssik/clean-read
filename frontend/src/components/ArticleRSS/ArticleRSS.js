const ArticleRSS = ({ article }) => {
  return (
    <div className="rss__article" key={article._id || article.title}>
      <h3 className="rss__title">{article.title}</h3>
      <p className="rss__content">{article.content}</p>
      <span className="rss__link">
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          read more
        </a>
      </span>
    </div>
  );
};

export default ArticleRSS;
