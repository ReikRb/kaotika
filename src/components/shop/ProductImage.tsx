import React from "react";

interface ProductImageProps {
    imageSrc: string;
    altText: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageSrc, altText }) => (
    <div className="flex items-center justify-center h-[50%] border-b-2 border-gray-300">
        <img src={imageSrc} alt={altText} className="h-32 w-32" />
    </div>
);

export default ProductImage;
