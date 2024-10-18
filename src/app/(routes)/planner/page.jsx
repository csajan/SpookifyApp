"use client";
import React, { useState } from "react";
import { Mistral } from "@mistralai/mistralai";
import "./page.css";

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

    const promptForAi = `Based on the selected category (${selectedCategory}) and the items I have at home (${prompt}), please generate a Halloween-themed ${
      selectedCategory === "FOOD"
        ? "recipe"
        : selectedCategory === "DIY"
        ? "DIY project"
        : "party idea"
    }.`;

    try {
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

      setResponse(chatResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Sorry, something went wrong.");
    }
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
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
      
      <div className="response-section">
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
