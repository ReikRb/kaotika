import React from "react";

interface ProductImageProps {
    imageSrc: string;
    altText: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageSrc, altText }) => (
    <>
        <img src={imageSrc} alt={altText} className="h-auto max-w-full"/>
    </>
);

export default ProductImage;
