const Modal = ({ isOpen, closeModal, articles }) => {
  //close default
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close-button" onClick={closeModal}>
          X
        </button>
        <h2>Articles:</h2>
        <ul>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <li key={index}>
                <a href={`/article/${article._id}`} className="article__title">
                  <h3>{article.title}</h3>
                </a>
                <p>{article.content?.slice(0, 100)}...</p>
              </li>
            ))
          ) : (
            <p>no articles with your phrase</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
