import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const ShopContainer: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-black">
        {children}
    </div>
  );
};

export default ShopContainer;