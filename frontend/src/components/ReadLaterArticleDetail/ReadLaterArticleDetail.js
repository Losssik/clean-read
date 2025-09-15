import { Link } from "react-router-dom";
import DeleteFromReadLaterList from "../DeleteFromReadLaterList/DeleteFromReadLaterList";

const ReadLaterArticleDetail = ({ article }) => {
  return (
    <div className="read-later article__card">
      <Link to={`/article/${article._id}`}>
        <h3 className="read-later__title">{article.title}</h3>
      </Link>

      <div className="article__tags">
        {article.tags?.map((tag, index) => (
          <Link key={index} to={`/tags/${tag}`} className="article__tag">
            {tag}
          </Link>
        ))}
      </div>

      <p>{article.content?.slice(0, 100)}...</p>
      <DeleteFromReadLaterList article={article} />
    </div>
  );
};

export default ReadLaterArticleDetail;
