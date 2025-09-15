import { Link } from "react-router-dom";
import AddOnReadLaterList from "../AddOnReadLaterList/AddOnReadLaterList";

const ArticleDetails = ({ article }) => {
  return (
    <div className="article__card">
      <Link to={`/article/${article._id}`} className="article__title">
        <h3>{article.title}</h3>
      </Link>

      <div className="article__tags">
        {article.tags?.map((tag, index) => (
          <Link key={index} to={`/tags/${tag}`} className="article__tag">
            {tag}
          </Link>
        ))}
      </div>

      <p className="article__excerpt">{article.content?.slice(0, 100)}...</p>

      <AddOnReadLaterList article={article} />
    </div>
  );
};

export default ArticleDetails;
