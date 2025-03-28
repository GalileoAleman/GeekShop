import Image, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
    src?: string;
    alt: string;
    width: number;
    height: number;
}
  
export const ProductImg = ({ src, alt, width, height, ...rest }: Props) => {

    const localSrc = (src) ? src.startsWith('http') // La url completa de la imagen
        ? src
        : `/geek-products/${src}`                        //Imagen local
    : '/imgs/placeholder.jpg';                      //Imagen por defecto

    return (
        <Image
            src={localSrc}
            alt={alt}
            width={width}
            height={height}
            {...rest}
        />
    );
};
