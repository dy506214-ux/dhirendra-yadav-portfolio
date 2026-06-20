"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface ClientFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  action: (formData: FormData) => Promise<any>;
  successMessage?: string;
  errorMessage?: string;
  resetOnSuccess?: boolean;
}

export function ClientForm({ 
  action, 
  children, 
  successMessage = "Saved successfully!", 
  errorMessage = "An error occurred. Please try again.",
  resetOnSuccess = true,
  ...props 
}: ClientFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const [formKey, setFormKey] = useState(0);

  return (
    <form
      key={formKey}
      ref={ref}
      {...props}
      action={async (formData) => {
        const promise = action(formData).catch((err) => {
          if (err.message === "NEXT_REDIRECT" || err.digest?.startsWith("NEXT_REDIRECT")) {
            return;
          }
          throw err;
        });
        
        toast.promise(promise, {
          loading: "Processing...",
          success: successMessage,
          error: errorMessage,
        });

        try {
          await promise;
          if (resetOnSuccess) {
            setFormKey(prev => prev + 1);
          }
        } catch (e) {
          // Error is handled by toast
        }
      }}
    >
      {children}
    </form>
  );
}
