// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  // const [error, setError] = useState(false);
  // const navigate = useNavigate();

  // const onSubmit = async (event) => {
  //   event.preventDefault();

  //   const form = event.target;
  //   const data = new FormData(form);
  //   const value = Object.fromEntries(data.entries());
  //   const projectId = process.env.REACT_APP_PROJECT_ID;
  //   const emailData = {
  //     ...value,
  //     projectId,
  //   };

  //   try {
  //     const postFormData = await fetch(`${process.env.REACT_APP_MAIL_SENDER}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //         Connection: "keep-alive",
  //         credentials: "include",
  //       },
  //       body: JSON.stringify(emailData),
  //     });

  //     if (
  //       (postFormData && postFormData.ok) ||
  //       postFormData.statusText === "Created"
  //     ) {
  //       setError(false);
  //       form.reset();
  //       navigate("/");
  //     }

  //     if (!postFormData.ok) {
  //       setError(`${postFormData.statusText}` + error);
  //     }
  //     return postFormData;
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  return (
    <section className='login-section'>
      <div className='login-container'>
        <div className='loginForm-container'>
          <form
            action='http://localhost:5000/api/email-sender/651567092bdd8eee5f3bbfc0'
            method='POST'
          >
            <h1>Send email</h1>
            <label for='sender'>Sender</label>
            <input name='sender' type='email' required />
            <label for='subject'>Subject</label>
            <input name='subject' type='text' required />
            <textarea
              name='body'
              placeholder='Message'
              id='userMessage'
              required
            ></textarea>
            <input
              type='hidden'
              name='origin'
              value='https://js-flashcards.netlify.app/'
            />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
