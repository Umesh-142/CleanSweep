"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/shared/Logo";
import { Button } from "../components/shared/Button";
import { Input } from "../components/shared/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/shared/Card";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendDisabled]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setOtp(value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Invalid verification code.");
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail({ email, otp });
      toast.success("Email verified successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Verification failed");
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    setResendDisabled(true);
    toast.success("A new verification code has been sent to your email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <Logo />
          <CardTitle className="text-2xl font-bold text-green-700">
            Verify your email
          </CardTitle>
          <CardDescription className="text-gray-600">
            We've sent a verification code to{" "}
            <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="otp"
              type="text"
              placeholder="Enter verification code"
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
              disabled={isLoading}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin" /> : "Verify Email"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            Didn't receive a code?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={handleResendCode}
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend code (${countdown}s)` : "Resend code"}
            </Button>
          </div>
          <div className="mt-2 text-center">
            <Link to="/login" className="text-green-700 hover:underline">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
