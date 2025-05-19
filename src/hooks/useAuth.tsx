
import { createContext, useContext, useState, useEffect } from "react";
import { validatePassword } from "@/utils/passwordPolicy";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  failedAttempts: number;
  lastFailedAttempt: Date | null;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
  passwordLastChanged: Date | null;
}

// This would be stored securely in a real application
// Password requirements:
// - At least 12 characters
// - Contains uppercase, lowercase, number, special char
const ADMIN_PASSWORD_KEY = "portfolio_admin_password";
const DEFAULT_ADMIN_PASSWORD = "Jaykumar@01";  // Changed to the requested password
const FAILED_ATTEMPTS_KEY = "failed_login_attempts";
const LAST_FAILED_ATTEMPT_KEY = "last_failed_login_attempt";
const PASSWORD_LAST_CHANGED_KEY = "password_last_changed";

// Initialize or get the current admin password from localStorage
const getAdminPassword = (): string => {
  const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);
  if (!storedPassword) {
    // First time setup - store the default password
    localStorage.setItem(ADMIN_PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD);
    return DEFAULT_ADMIN_PASSWORD;
  }
  return storedPassword;
};

const getFailedAttempts = (): number => {
  const attempts = localStorage.getItem(FAILED_ATTEMPTS_KEY);
  return attempts ? parseInt(attempts, 10) : 0;
};

const getLastFailedAttempt = (): Date | null => {
  const timestamp = localStorage.getItem(LAST_FAILED_ATTEMPT_KEY);
  return timestamp ? new Date(parseInt(timestamp, 10)) : null;
};

const getPasswordLastChanged = (): Date | null => {
  const timestamp = localStorage.getItem(PASSWORD_LAST_CHANGED_KEY);
  if (!timestamp) {
    // Initialize with current date if not set
    const now = new Date();
    localStorage.setItem(PASSWORD_LAST_CHANGED_KEY, now.getTime().toString());
    return now;
  }
  return new Date(parseInt(timestamp, 10));
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(getFailedAttempts());
  const [lastFailedAttempt, setLastFailedAttempt] = useState<Date | null>(getLastFailedAttempt());
  const [passwordLastChanged, setPasswordLastChanged] = useState<Date | null>(getPasswordLastChanged());
  
  // Password expiry check - 90 days
  useEffect(() => {
    if (passwordLastChanged) {
      const now = new Date();
      const daysSinceChanged = Math.floor((now.getTime() - passwordLastChanged.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceChanged >= 90 && isAuthenticated) {
        toast({
          title: "Password Expiry Notice",
          description: "Your password is over 90 days old. Please change it for security reasons.",
          // Changed from "warning" to "default" since "warning" isn't a valid variant
          variant: "default",
          duration: 10000,
        });
      }
    }
  }, [isAuthenticated, passwordLastChanged]);

  const login = (password: string) => {
    // Check if account is locked
    const now = new Date();
    const lockStatus = {
      isLocked: failedAttempts >= 5 && lastFailedAttempt && 
                (now.getTime() - lastFailedAttempt.getTime() < 15 * 60 * 1000),
      remainingTime: lastFailedAttempt ? 
                    Math.max(0, 15 * 60 - Math.floor((now.getTime() - lastFailedAttempt.getTime()) / 1000)) : 0
    };

    if (lockStatus.isLocked) {
      toast({
        title: "Account Locked",
        description: `Too many failed attempts. Try again in ${Math.floor(lockStatus.remainingTime / 60)} minutes.`,
        variant: "destructive",
      });
      return false;
    }

    const currentPassword = getAdminPassword();
    const isValid = password === currentPassword;
    
    if (isValid) {
      setIsAuthenticated(true);
      // Reset failed attempts on successful login
      localStorage.setItem(FAILED_ATTEMPTS_KEY, "0");
      setFailedAttempts(0);
      setLastFailedAttempt(null);
      return true;
    } else {
      // Increment failed attempts
      const newFailedAttempts = failedAttempts + 1;
      localStorage.setItem(FAILED_ATTEMPTS_KEY, newFailedAttempts.toString());
      setFailedAttempts(newFailedAttempts);
      
      // Record timestamp of failed attempt
      localStorage.setItem(LAST_FAILED_ATTEMPT_KEY, now.getTime().toString());
      setLastFailedAttempt(now);
      
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  
  const changePassword = (currentPassword: string, newPassword: string) => {
    const storedPassword = getAdminPassword();
    
    if (currentPassword !== storedPassword) {
      return false;
    }
    
    // Validate the new password
    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      toast({
        title: "Password Requirements Not Met",
        description: validation.errors.join(". "),
        variant: "destructive",
      });
      return false;
    }
    
    // Store the new password
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    
    // Update the last changed date
    const now = new Date();
    localStorage.setItem(PASSWORD_LAST_CHANGED_KEY, now.getTime().toString());
    setPasswordLastChanged(now);
    
    return true;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        failedAttempts, 
        lastFailedAttempt, 
        changePassword, 
        passwordLastChanged 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
