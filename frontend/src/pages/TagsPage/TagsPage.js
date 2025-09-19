import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TagsPage = () => {
  const { tag } = useParams();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchTagArticles = async () => {
      const response = await fetch(`/api/articles/?tags=${tag}`);

      const data = await response.json();

      if (response.ok) {
        setArticles(data);
      }
    };

    fetchTagArticles();
  }, [tag]);

  return (
    <div>
      Articles with {tag}
      {articles.map((article) => (
        <div key={article._id}>
          <Link to={`/article/${article._id}`}>
            <h3>{article.title}</h3>
          </Link>
          <p>{article.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default TagsPage;
