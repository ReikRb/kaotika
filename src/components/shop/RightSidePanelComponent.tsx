import { useEffect, useState } from 'react';

interface RightSidePanelProps {
    isOpen: boolean;
    togglePanel: () => void;
}

const RightSidePanel: React.FC<RightSidePanelProps> = ({ isOpen, togglePanel }) => {
    const [ArrowImage, setArrowImage] = useState('');

    useEffect(() => {
        setArrowImage('/images/shop/rightArrow.png');
    }, []);

    return (
        <>
            <div className={`fixed top-[20%] right-0 h-[80%] max bg-black border-1 border-sepia z-50 transition-transform ${isOpen ? 'translate-x-full' : 'translate-x-1/3'}`} style={{ width: '50%' }}>
                <button onClick={togglePanel} className="absolute top-[38%] left-0">
                    <img src={ArrowImage} alt="Close Right Panel" className="h-36 w-9" />
                </button>
                <div className="p-4 text-white">
                    <p>CART</p>
                </div>
            </div>
        </>
    );
};

export default RightSidePanel;