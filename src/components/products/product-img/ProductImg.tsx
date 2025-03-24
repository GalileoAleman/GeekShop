import Image from "next/image";

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
    width: number;
    height: number;
}

export const ProductImg = ({src, alt, className, style, width, height}: Props) => {

    const localSrc = (src) ? src.startsWith('http') // La url completa de la imagen
        ? src
        : `/geek-products/${src}`                        //Imagen local
    : '/imgs/placeholder.jpg';                      //Imagen por defecto

    return (
        <Image
            src={localSrc}
            width={width}
            height={height}
            alt={alt}
            className={className}
            style={style}
        />
    );
};
