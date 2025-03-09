"use client";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
// import Logo from "../../assets/logo.png"; 
import "./verification-pending.module.css"; 

export default function VerificationPending() {
	const [checking, setChecking] = useState(false);
	const [userEmail, setUserEmail] = useState<string>("");
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.currentUser?.email) {
			setUserEmail(auth.currentUser.email);
		}
	}, []);

	useEffect(() => {
		const checkVerification = async () => {
			if (!auth.currentUser) return;

			try {
				setChecking(true);
				await auth.currentUser.reload();
				const idTokenResult = await auth.currentUser.getIdTokenResult(true);

				if (auth.currentUser.emailVerified) {
					const isVerifiedClaim = idTokenResult.claims.isVerified;
					const role = idTokenResult.claims.role;

					if (!isVerifiedClaim) {
						console.log("Waiting for verification claim to be set...");
						return;
					}

					if (!role) {
						console.log("No role assigned yet...");
						return;
					}

					const dashboardUrl =
						role === "tutor"
							? `/mentor-dashboard/${auth.currentUser.uid}`
							: `/student-dashboard/${auth.currentUser.uid}`;

					alert("Email verified successfully!" + "SUCCESS");
					navigate(dashboardUrl);
				}
			} catch (error) {
				console.error("Error checking verification:", error);
				navigate("Error checking verification status" + "ERROR");
			} finally {
				setChecking(false);
			}
		};

		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user?.emailVerified) {
				const idTokenResult = await user.getIdTokenResult(true);
				const isVerifiedClaim = idTokenResult.claims.isVerified;
				const role = idTokenResult.claims.role;

				if (isVerifiedClaim && role) {
					const dashboardUrl =
						role === "tutor"
							? `/mentor-dashboard/${user.uid}`
							: `/student-dashboard/${user.uid}`;

					alert("Email verified successfully!" + " SUCCESS");
					navigate(dashboardUrl);
				}
			}
		});

		checkVerification();
		const interval = setInterval(checkVerification, 2000);

		return () => {
			unsubscribe();
			clearInterval(interval);
		};
	}, [navigate]);

	return (
		<div className="container">
			<div className="content">
				<div className="logo-container">
					<img src={"/placeholder.svg"} alt="Logo" className="logo" />
					<h1 className="title">
						Empower<span className="highlight">Ed</span> Learnings
					</h1>
				</div>
				<h2 className="subtitle">Verify Your Email</h2>
				<div className="message-container">
					<p className="message">
						We've sent a verification link to{" "}
						<span className="email">{userEmail}</span>. Please check your inbox
						and click the link to verify your account.
					</p>
					<p className="note">
						Once verified, you'll be automatically redirected to your dashboard.
					</p>
				</div>
			</div>
			{checking && (
				<div className="loading">
					<div className="spinner"></div>
					<p className="checking-text">Checking verification status...</p>
				</div>
			)}
		</div>
	)
}
