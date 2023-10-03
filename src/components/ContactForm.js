import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());

    try {
      const postFormData = await fetch(`${process.env.REACT_APP_MAIL_SENDER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          Connection: "keep-alive",
          credentials: "include",
        },
        body: JSON.stringify(value),
      });

      if (
        (postFormData && postFormData.ok) ||
        postFormData.statusText === "Created"
      ) {
        setError(false);
        form.reset();
        navigate("/");
        return;
      }
      return postFormData;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className='login-section'>
      <div className='login-container'>
        <div className='loginForm-container'>
          <form onSubmit={onSubmit}>
            {error && <div>{`Error: ${error}`}</div>}
            <h1>Send email</h1>
            <p>Please enter your email data</p>
            <label>Sender</label>
            <br></br>
            <div className='icon'>
              <input
                name='sender'
                type='email'
                className='login-password'
              ></input>
              <br></br>
            </div>

            <label>Subject</label>
            <br></br>
            <div className='icon'>
              <input
                name='subject'
                className='login-password'
                type='text'
              ></input>
              <br></br>
            </div>
            <textarea
              name='body'
              className='login-password'
              type='text'
              placeholder='Message'
              style={{
                height: "200px",
                width: "90%",
                marginBottom: "20px",
                padding: "10px",
                color: "black",
              }}
            ></textarea>
            <div>
              <button type='submit' className='createBtn'>
                Submit email
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
