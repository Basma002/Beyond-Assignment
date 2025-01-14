import { cn } from "@/lib/utils"; // Make sure you have a utility for merging classNames
import React, { ReactNode } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-lg border border-gray-200 bg-white shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({
  className,
  children,
  ...props
}: CardProps) => (
  <div className={cn("p-4", className)} {...props}>
    {children}
  </div>
);

export const CardContent = ({
  className,
  children,
  ...props
}: CardProps) => (
  <div className={cn("p-4", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  className,
  children,
  ...props
}: CardProps) => (
  <div className={cn("p-4", className)} {...props}>
    {children}
  </div>
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle = ({
  className,
  children,
  ...props
}: CardTitleProps) => (
  <h2 className={cn("text-lg font-bold", className)} {...props}>
    {children}
  </h2>
);

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const CardDescription = ({
  className,
  children,
  ...props
}: CardDescriptionProps) => (
  <p className={cn("text-sm text-gray-600", className)} {...props}>
    {children}
  </p>
);
