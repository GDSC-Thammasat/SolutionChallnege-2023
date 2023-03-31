import React, { useState } from "react";

const ContactUs = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    title: "",
    body: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Use the formValues state to send the email
    console.log("Form submitted with values:", formValues);
  };

  return (
    <body>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            value={formValues.body}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="button-pushable" id="next">
          <span className="button-shadow"></span>
          <span className="button-edge"></span>
          <span className="button-front text">Send via Email!</span>
        </button>
      </form>
    </body>
  );
};

export default ContactUs;
