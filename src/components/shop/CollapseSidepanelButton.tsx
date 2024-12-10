import { useEffect, useState } from "react";

interface Props {
    direction: String;
    executeFunction: Function;
};

const CollapseSidepanelButton: React.FC<Props> = ({direction, executeFunction}) => {
    const [ArrowImage, setArrowImage] = useState('');

    useEffect(() => {
        direction === 'right'
        ? setArrowImage('/images/shop/rightArrow.png')
        : setArrowImage('/images/shop/leftArrow.png');
    }, [])

    return (
        <>
            <div className="h-full flex items-center">
                <img src={ArrowImage} alt="Arrow" className="h-1/6 opacity-0" onClick={executeFunction()}/>
            </div>
        </>
    );
};

export default CollapseSidepanelButton;