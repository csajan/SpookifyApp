"use client";
import React, { useState } from "react";
import { Mistral } from "@mistralai/mistralai";

const apiKey =
  process.env.MISTRAL_API_KEY || "Q9wYLD8kvpWmXkYdpeDYGjpwfEbvAxOV";
const client = new Mistral({ apiKey: apiKey });

function Page() {
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState({
    DIY: false,
    FOOD: false,
    PARTY: false,
  });

  const [prompt, setPrompt] = useState("");

  // Handle checkbox change to allow only one checkbox to be checked at a time
  const handleCheckboxChange = (e) => {
    const { name } = e.target;

    setCategory({
      DIY: name === "DIY",
      FOOD: name === "FOOD",
      PARTY: name === "PARTY",
    });
  };

  // Handle text input change
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  // Make handleSubmit async to handle the API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine which option is selected
    const selectedCategory = Object.keys(category).find((key) => category[key]);
    const data = {
      category: selectedCategory,
      prompt: prompt,
    };

    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }

    console.log(JSON.stringify(data, null, 2));

    // Prepare prompt for the AI
    const promptForAi = `Based on the selected category (${selectedCategory}) and the items I have at home (${prompt}), please generate a Halloween-themed ${
      selectedCategory === "FOOD"
        ? "recipe"
        : selectedCategory === "DIY"
        ? "DIY project"
        : "party idea"
    }.`;

    try {
      // Call the chat API with the prompt
      const chatResponse = await client.chat.complete({
        model: "mistral-tiny",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant specialized in providing creative Halloween ideas based on a given category and available items. Return the data in the JSON format with {title: input: response:} ",
          },
          { role: "user", content: promptForAi },
        ],
        temperature: 0.7,
      });

      // Set the response from AI
      setResponse(chatResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Sorry, something went wrong.");
    }
  };

  return (
    <div>
      <h2>Simple Form</h2>

      <div>
        <label>
          <input
            type="checkbox"
            name="DIY"
            checked={category.DIY}
            onChange={handleCheckboxChange}
          />
          DIY
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="FOOD"
            checked={category.FOOD}
            onChange={handleCheckboxChange}
          />
          FOOD
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="PARTY"
            checked={category.PARTY}
            onChange={handleCheckboxChange}
          />
          PARTY
        </label>
      </div>

      {/* Text input */}
      <div>
        <label>
          Enter your prompt:
          <input type="text" value={prompt} onChange={handlePromptChange} />
        </label>
      </div>

      {/* Submit button */}
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {response ? (
          <div>
            <h3>Generated Idea:</h3>
            <p>{response}</p>
          </div>
        ) : (
          <p>Submit the form to get a Halloween idea.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
