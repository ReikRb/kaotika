import React from "react";

interface ProductImageProps {
    imageSrc: string;
    altText: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageSrc, altText }) => (
    <div className="flex items-center justify-center h-[50%] mt-3 mb-3 ">
        <img src={imageSrc} alt={altText} className="h-64 w-64" />
    </div>
);

export default ProductImage;
