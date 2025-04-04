import { Toaster } from 'react-hot-toast';
import Navbar from '../molecules/Navbar';
import Filters from '../molecules/Filters';
import { useTheme } from '../providers/ThemeWrapper';

interface MainLayoutProps {
  children: React.ReactNode;
  onAddPatient: () => void;
}

const MainLayout = ({ children, onAddPatient }: MainLayoutProps) => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <>
      <Toaster position="top-right" />
      <div className="app-container">
        <Navbar
          toggleTheme={toggleTheme}
          isDark={isDarkTheme}
          onAddPatient={onAddPatient}
        />
        <main>
          <Filters />
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
