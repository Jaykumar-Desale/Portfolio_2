
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Lock, ShieldAlert, Info } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { checkAccountLockStatus, validatePassword, getPasswordRecommendations } from "@/utils/passwordPolicy";

// Schema for change password form
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(12, "New password must be at least 12 characters"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordRecommendations, setShowPasswordRecommendations] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, failedAttempts, lastFailedAttempt, changePassword, passwordLastChanged } = useAuth();
  
  const lockStatus = checkAccountLockStatus(failedAttempts, lastFailedAttempt);
  const passwordRecommendations = getPasswordRecommendations();
  
  // Password age in days
  const passwordAge = passwordLastChanged ? 
    Math.floor((new Date().getTime() - passwordLastChanged.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  
  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  // Set up the change password form
  const changePasswordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    
    // Check if account is locked
    if (lockStatus.isLocked) {
      const remainingMinutes = Math.ceil((lockStatus.remainingTime || 0) / 60);
      toast({
        title: "Account Temporarily Locked",
        description: `Too many failed login attempts. Please try again in ${remainingMinutes} minutes.`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(() => {
      const isSuccess = login(password);
      
      if (isSuccess) {
        toast({
          title: "Login Successful",
          description: "You are now logged in as admin.",
        });
        navigate("/admin");
      } else {
        setError(true);
        
        // Warning based on number of attempts
        if (failedAttempts + 1 >= lockStatus.maxAttempts) {
          toast({
            title: "Account Locked",
            description: `Your account has been locked for 15 minutes due to too many failed attempts.`,
            variant: "destructive",
          });
        } else {
          const attemptsLeft = lockStatus.maxAttempts - (failedAttempts + 1);
          toast({
            title: "Login Failed",
            description: `Invalid password. ${attemptsLeft} attempts remaining before account is locked.`,
            variant: "destructive",
          });
        }
      }
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  const onPasswordChangeSubmit = (values: ChangePasswordFormValues) => {
    const result = changePassword(values.currentPassword, values.newPassword);
    
    if (result) {
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });
      changePasswordForm.reset();
    } else {
      // Error is shown by the useAuth hook for validation failures
      toast({
        title: "Password Change Failed",
        description: "Current password is incorrect or new password didn't meet requirements.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Enter the portfolio admin password to continue
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {lockStatus.isLocked && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertDescription>
                    Account locked for {Math.ceil((lockStatus.remainingTime || 0) / 60)} minutes due to too many failed attempts.
                  </AlertDescription>
                </Alert>
              )}
              
              {passwordAge >= 90 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your password is {passwordAge} days old. Consider changing it for security.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={lockStatus.isLocked || isSubmitting}
                    className={error ? "border-destructive" : ""}
                    autoComplete="current-password"
                  />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                {error && (
                  <p className="text-sm text-destructive">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0 h-auto text-xs" 
                  onClick={() => setShowPasswordRecommendations(!showPasswordRecommendations)}
                >
                  <Info className="h-3 w-3 mr-1" />
                  {showPasswordRecommendations ? "Hide" : "View"} security recommendations
                </Button>
                
                {isAuthenticated && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="p-0 h-auto text-xs">
                        Change password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <Form {...changePasswordForm}>
                        <form onSubmit={changePasswordForm.handleSubmit(onPasswordChangeSubmit)}>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                              Update your admin password. Make sure it's secure and meets all requirements.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <FormField
                              control={changePasswordForm.control}
                              name="currentPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Current Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="Enter current password" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={changePasswordForm.control}
                              name="newPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>New Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="Enter new password" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Must be at least 12 characters with uppercase, lowercase, number and special character.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={changePasswordForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="Confirm new password" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <DialogFooter>
                            <Button type="submit">Change Password</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              
              {showPasswordRecommendations && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium mb-2">Password security recommendations:</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      {passwordRecommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || lockStatus.isLocked}
              >
                {isSubmitting ? "Authenticating..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Default password info for demo purposes */}
        

        
      </main>
      <Footer />
    </>
  );
}
