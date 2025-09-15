import { useState } from "react";
import FeedbackMessage from "../../components/FeedbackMessage/FeedbackMessage";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("testmailowy@wp.pl");
  const [name, setName] = useState("JAN");
  const [password, setPassword] = useState("hujhuj");
  const { signup, error, isLoading, success } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, name, password);
  };

  return (
    <div className="signup">
      <h3 className="signup__header">Register Form</h3>
      <form onSubmit={handleSubmit} className="signup__form">
        <label className="signup__label">Email</label>
        <input
          className="signup__input"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className="signup__label">Name</label>
        <input
          className="signup__input"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label className="signup__label">Password</label>
        <input
          className="signup__input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button className="signup__button" disabled={isLoading}>
          Register
        </button>

        {error && <FeedbackMessage message={error} />}
        {success && <FeedbackMessage message={"account registered :)"} />}
      </form>
    </div>
  );
};

export default Signup;
