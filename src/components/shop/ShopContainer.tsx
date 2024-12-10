import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
};

const ShopContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen h-screen grid grid-rows-10">
        {children}
    </div>
  );
};

export default ShopContainer;