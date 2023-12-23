"use client";

import React from "react";
import { InputForm } from "@/components/component/input-form";
import ProfileIcon from "@/components/component/profile-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { signOutFunc } from "@/lib/firebase";
import { auth } from "@/lib/firebase";

const Survey = () => {
	const router = useRouter();

	const handleSignOut = async () => {
		console.log("onclick sign out: ", auth.currentUser);
		await signOutFunc().then(() => {
			// if no errors then push to survey page
			router.push("/");
		});
		// if no errors then push to home page
	};
	return (
		<>
			<div className="flex justify-between items-center pr-4 pt-4">
				<div>Logo</div>
				<ProfileIcon />
			</div>
			<Card className="p-4 flex w-[40vh]">
				<InputForm />
			</Card>
			<div className="p-4">
				<Button onClick={handleSignOut}>Sign Out</Button>
			</div>
		</>
	);
};

export default Survey;