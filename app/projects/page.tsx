"use client";

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/component/navbars/navbar";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PanelGroup } from "@/components/component/projects/panel-group";
import GridProjects from "@/components/component/projects/grid-projects";

const Projects = () => {
	const router = useRouter();

	useEffect(() => {
		const checkAuthState = async () => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					const docSnap = await getDoc(docRef);
					if (!docSnap.data()?.doneSurvey) {
						router.push("/survey");
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

	return (
		<main>
			<Navbar mainPage={false} />
			<div>
				<h1 className="text-3xl font-bold">Projects</h1>
				<p>Choose a project to view</p>
			</div>
			<GridProjects />
		</main>
	);
};

export default Projects;
