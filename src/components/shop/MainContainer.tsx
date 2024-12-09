import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
};

const MainContainer: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen row-span-8 row-start-3 flex">
        {children}
    </div>
  );
};

export default MainContainer;