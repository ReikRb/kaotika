import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const ShopContainer: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen grid grid-rows-10">
        {children}
    </div>
  );
};

export default ShopContainer;