// import { forwardRef } from "react";
// import { cn } from "../../lib/utils";

// const Button = forwardRef(
//   (
//     {
//       className,
//       variant = "default",
//       size = "default",
//       children,
//       disabled,
//       type = "button",
//       ...props
//     },
//     ref
//   ) => {
//     const variants = {
//       default: "bg-primary text-white hover:bg-primary/90",
//       destructive: "bg-red-500 text-white hover:bg-red-600",
//       outline:
//         "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//       secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//       ghost: "hover:bg-accent hover:text-accent-foreground",
//       link: "text-primary underline-offset-4 hover:underline",
//     };

//     const sizes = {
//       default: "h-10 px-4 py-2",
//       sm: "h-9 rounded-md px-3",
//       lg: "h-11 rounded-md px-8",
//       icon: "h-10 w-10",
//     };

//     return (
//       <button
//         type={type}
//         className={cn(
//           "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//           variants[variant],
//           sizes[size],
//           className
//         )}
//         ref={ref}
//         disabled={disabled}
//         {...props}
//       >
//         {children}
//       </button>
//     );
//   }
// );

// Button.displayName = "Button";

// export { Button };

import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  (
    {
      children,
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled = false,
      icon: Icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-green-600 hover:bg-green-700 text-white shadow-sm",
      destructive: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
      outline:
        "border border-green-600 bg-white text-green-600 hover:bg-green-50",
      secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm",
      ghost: "hover:bg-green-50 text-green-600",
      link: "text-green-600 hover:underline underline-offset-4",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 px-3 text-xs",
      lg: "h-11 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon
                className={cn("mr-2", size === "icon" ? "h-4 w-4" : "h-4 w-4")}
              />
            )}
            {children}
            {Icon && iconPosition === "right" && (
              <Icon
                className={cn("ml-2", size === "icon" ? "h-4 w-4" : "h-4 w-4")}
              />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
