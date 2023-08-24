import React, { useState, FormEvent } from "react"; // Import FormEvent type
import { PktButton, PktTextinput } from "@oslokommune/punkt-react";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown

export default function ImageUpload() {
  const [responseMessage, setResponseMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Validate if the uploaded file is an image with specific formats
    const file = formData.get("InputImage");
    if (file instanceof File) {
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedFormats.includes(file.type)) {
        setHasError(true);
        return;
      }
    } else {
      setHasError(false);
    }

    const response = await fetch("https://274m92bcfh.execute-api.eu-west-1.amazonaws.com/dev/", {
      method: "POST",
      body: formData,
      headers: {
      },
    });

    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }

  }

  return (
    <form className="pkt-form pkt-container--center" onSubmit={submit}>
      <fieldset className="pkt-fieldset">
        <legend>SnapMeal</legend>
        <PktTextinput
          id="InputImage"
          label="Legg til et bilde"
          hasError={hasError}
          errorMessage="Please upload a valid image (JPEG, PNG, GIF)"
          type="file"
          accept=".jpeg, .jpg, .png, .gif" // Specify accepted file formats
        />
        <PktButton className="mt-size-16 pkt-btn--blue-light" skin="primary" variant="icon-left" type="submit" iconName="apple">
          Snap en oppskrift
        </PktButton>
      </fieldset>


      {responseMessage &&
        <h1>WOW! En oppskrift:</h1> &&
        <ReactMarkdown>{responseMessage}</ReactMarkdown>}
    </form>

  );
}
