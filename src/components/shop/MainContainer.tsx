import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const MainContainer: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-5/6 bg-black flex">
        {children}
    </div>
  );
};

export default MainContainer;