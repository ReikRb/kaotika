import React from "react";

interface Props {
    imageSrc: string;
    altText: string;
}

const ProductImage: React.FC<Props> = ({ imageSrc, altText }) => (
    <>
        <img src={imageSrc} alt={altText} className="h-auto max-w-full"/>
    </>
);

export default ProductImage;