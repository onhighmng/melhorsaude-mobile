import Frame1 from "../imports/Frame1-2-405";
import { LoginScreen } from "./components/auth/LoginScreen";
import { AccessCodeScreen } from "./components/auth/AccessCodeScreen";
import { RegistrationScreen } from "./components/auth/RegistrationScreen";
import { NavigationProvider, useNavigation } from "./NavigationContext";

function Main() {
  const { currentScreen } = useNavigation();

  if (currentScreen === 'login') {
    return <LoginScreen />;
  }
  
  if (currentScreen === 'access-code') {
    return <AccessCodeScreen />;
  }
  
  if (currentScreen === 'registration') {
    return <RegistrationScreen />;
  }
  
  return (
    <div className="w-full min-h-screen bg-white">
      <Frame1 />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <Main />
    </NavigationProvider>
  );
}
