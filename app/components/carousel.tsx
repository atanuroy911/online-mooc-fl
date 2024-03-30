import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface ImageInfo {
    mainText: string;
    subText: string;
}

interface CarouselProps {
    images: string[];
    imageInfo: ImageInfo[];
}

export default function Carousel({ images, imageInfo }: CarouselProps) {
    const [current, setCurrent] = useState(0);

    const currentImage = images[current];
    const { mainText, subText } = imageInfo[current];

    const prevImage = () => {
        const isFirstSlide = current === 0;
        const newIndex = isFirstSlide ? images.length - 1 : current - 1;
        setCurrent(newIndex);
    }

    const nextImage = () => {
        const isLastSlide = current === images.length - 1;
        const newIndex = isLastSlide ? 0 : current + 1;
        setCurrent(newIndex);
    }

    return (
        <div className="relative pb-16">
            <div>
                <button onClick={prevImage} className="absolute left-[2%] top-[50%] z-[40]"><BsArrowLeft/></button>
                <img src={currentImage} alt={`Image ${current + 1}`} className="h-[500px] object-cover w-full"/>
                <div className="absolute top-[20%] left-[5%] bg-white dark:bg-black p-6 max-w-[450px]">
                    <h1 className="my-2 text-[2rem] font-bold">{mainText}</h1>
                    <p className="text-[1rem]">{subText}</p>
                </div>
                <button onClick={nextImage} className="absolute right-[2%] top-[50%] z-[40]"><BsArrowRight/></button>
            </div>
        </div>
    )
}
