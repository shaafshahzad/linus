"use client";

import React, { useEffect, useState } from "react";
import { FormQuestion } from "@/components/component/input-form";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from "@/components/component/navbar";
import { Card } from "@/components/ui/card";
import { set } from "react-hook-form";

// Define your questions
const questions = [
	{
		title: "Question 1",
		placeholder: "Placeholder 1",
		desc: "Description 1",
	},
	{
		title: "Question 2",
		placeholder: "Placeholder 2",
		desc: "Description 2",
	},
	{
		title: "Question 3",
		placeholder: "Placeholder 3",
		desc: "Description 3",
	},
	{
		title: "Question 4",
		placeholder: "Placeholder 4",
		desc: "Description 4",
	},
	{
		title: "Question 5",
		placeholder: "Placeholder 5",
		desc: "Description 5",
	},
	// Add more questions as needed
];

const Survey = () => {
	const router = useRouter();
	// Add a state variable for the current question index
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	// Get the current question
	const currentQuestion = questions[currentQuestionIndex];
	// Function to go to the next question
	const nextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			router.push("/survey/thank-survey");
		}
	};
	const handleSuccessfulSubmit = () => {
		nextQuestion();
	};

	useEffect(() => {
		const checkAuthState = async () => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.data()?.doneSurvey) {
						router.push("/projects");
					}
				} else {
					router.push("/");
				}
			});

			// Cleanup subscription on unmount
			return () => unsubscribe();
		};

		checkAuthState();
	}, [router]);

	const userInput = async (userResponse: string) => {
		if (auth.currentUser) {
			// Create or update the document with the user's UID
			const docRef = doc(db, "questions", auth.currentUser.uid);

			// Prepare the update object
			let updateData: { [key: string]: string } = {};
			updateData[`Q${currentQuestionIndex + 1}`] = userResponse;

			// Update the document with the new response
			await setDoc(docRef, updateData, { merge: true });

			// Check if this was the last question
			if (currentQuestionIndex === questions.length - 1) {
				// Update the user document to indicate the survey is done
				await setDoc(doc(db, "users", auth.currentUser.uid), {
					doneSurvey: true,
				});
				router.push("/survey/thank-survey");
			} else {
				// Move to the next question
				nextQuestion();
			}
		}
	};
	return (
		<>
			<main className="max-w-2xl mx-auto">
				<Navbar mainPage={false} />
				<div className="mb-4">
					<h1 className="text-3xl font-bold">Survey</h1>
					<p>Please answer the following questions</p>
				</div>
				<Card className="p-4">
					<FormQuestion
						title={currentQuestion.title}
						placeholder={currentQuestion.placeholder}
						desc={currentQuestion.desc}
						onSuccessfulSubmit={handleSuccessfulSubmit}
						valueOfUser={userInput}
					/>
				</Card>
			</main>
		</>
	);
};

export default Survey;
