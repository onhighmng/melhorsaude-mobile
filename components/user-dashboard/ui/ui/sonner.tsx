// Sonner disabled for mobile - no toast notifications in React Native
interface ToasterProps {
  [key: string]: any;
}

const Toaster = ({ ...props }: ToasterProps) => {
  return null;
};

export { Toaster };