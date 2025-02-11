import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/features/authSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg text-gray-300 max-w-md">
          Manage your projects efficiently with our powerful dashboard.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
        <Card className="w-full max-w-md bg-gray-900 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-gray-100">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700 focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700 focus:border-primary focus:ring-primary"
                />
              </div>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin h-5 w-5" />} Sign
                In
              </Button>
              <p className="text-gray-400 text-sm text-center mt-4">
                <a href="/forgot-password" className="hover:text-primary">
                  Forgot password?
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
