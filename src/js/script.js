"use strict";

// ELEMENT/S
const generateBtnEl = document.querySelector(".container__dice-box");
const blockquoteEl = document.querySelector(".container__advice");
const adviceNumEl = document.querySelector(".container__advice-num");
const errorEl = document.querySelector(".error");
const errorMsgEl = document.querySelector(".error-message");

// API
const ADVICEAPI = "https://api.adviceslip.com/advice";

// FUNCTION/S
function displayLoadingState() {
	blockquoteEl.textContent = adviceNumEl.textContent = "Loading...";
}

function displayAdvice(data) {
	// -- Get advice info from data
	const { slip } = data;
	const { id, advice } = slip;

	// -- Show info to UI
	adviceNumEl.textContent = id;
	blockquoteEl.textContent = advice;
}

function displayError(errMsg) {
	// -- Show the error
	errorEl.classList.add("show-error");

	// -- Add error message
	errorMsgEl.textContent = errMsg;
}

async function getAdvice() {
	try {
		// -- Display loading state while fetching data
		displayLoadingState();

		// -- Get random advice from API
		const res = await fetch(ADVICEAPI);

		// -- Convert response to a usable data
		const data = await res.json();

		// -- Invoke displayAdvice function
		displayAdvice(data);
	} catch (error) {
		// -- If an error is encountered, display errors
		displayError(error.message);
	}
}

// EVENT LISTENER/S
generateBtnEl.addEventListener("click", getAdvice);
window.addEventListener("load", getAdvice);
