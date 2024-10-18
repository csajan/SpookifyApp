"use client";
import React, { useState } from "react";
import { Mistral } from "@mistralai/mistralai";
import "./page.css";

const apiKey =
  process.env.MISTRAL_API_KEY || "Q9wYLD8kvpWmXkYdpeDYGjpwfEbvAxOV";
const client = new Mistral({ apiKey: apiKey });

function Page() {
  const [response, setResponse] = useState(null);
  const [category, setCategory] = useState({
    DIY: false,
    FOOD: false,
    PARTY: false,
  });

  const [prompt, setPrompt] = useState("");

  const handleCheckboxChange = (e) => {
    const { name } = e.target;

    setCategory({
      DIY: name === "DIY",
      FOOD: name === "FOOD",
      PARTY: name === "PARTY",
    });
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const promptForAi = `Based on the selected category (${selectedCategory}) and the items I have at home (${prompt}), please generate a Halloween-themed ${
      selectedCategory === "FOOD"
        ? "recipe"
        : selectedCategory === "DIY"
        ? "DIY project"
        : "party idea"
    }. Provide simple steps, mentioning any extra items I might need to buy that are not part of the items I have at home. `;

    try {
      const chatResponse = await client.chat.complete({
        model: "mistral-tiny",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant specialized in providing creative Halloween ideas based on a given category and available items. Return the data in the JSON format with {title: input: response:}.",
          },
          { role: "user", content: promptForAi },
        ],
        temperature: 0.7,
      });
      const aiData = JSON.parse(chatResponse.choices[0].message.content);
      console.log("AI Response:", aiData.response);
      setResponse(aiData);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Sorry, something went wrong.");
    }
  };

  const formatResponseAsList = (responseText) => {
    const steps = responseText.match(/\d+\.\s+[^\.]+\./g);
    return steps || [responseText];
  };

  return (
    <div className="container">
      <h2 className="header">Halloween Idea Generator</h2>

      <div className="category">
        <label>
          <input
            type="checkbox"
            name="DIY"
            checked={category.DIY}
            onChange={handleCheckboxChange}
          />
          <span className="checkbox-label">DIY</span>
        </label>
      </div>
      <div className="category">
        <label>
          <input
            type="checkbox"
            name="FOOD"
            checked={category.FOOD}
            onChange={handleCheckboxChange}
          />
          <span className="checkbox-label">FOOD</span>
        </label>
      </div>
      <div className="category">
        <label>
          <input
            type="checkbox"
            name="PARTY"
            checked={category.PARTY}
            onChange={handleCheckboxChange}
          />
          <span className="checkbox-label">PARTY</span>
        </label>
      </div>

      <div className="input-section">
        <label className="input-label">
          Enter your items:
          <input
            type="text"
            value={prompt}
            onChange={handlePromptChange}
            className="text-input"
          />
        </label>
      </div>

      <div className="submit-section">
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>

      <div className="response-section">
        {response ? (
          typeof response === "object" ? (
            <div>
              <h3>{response.title}</h3>
              <p>
                <strong>Items needed:</strong> {response.input}
              </p>
              <h4>Steps:</h4>
              <ol>
                {formatResponseAsList(response.response).map((step, index) => (
                  <li key={index}>{step.trim()}</li>
                ))}
              </ol>
            </div>
          ) : (
            <p>{response}</p>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Page;
