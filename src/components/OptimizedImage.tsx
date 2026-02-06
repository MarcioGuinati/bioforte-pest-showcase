import { useState, useRef, useEffect, ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  placeholderColor?: string;
}

/**
 * OptimizedImage - Componente de imagem otimizado para performance
 * 
 * Características:
 * - Lazy loading nativo com Intersection Observer fallback
 * - Dimensões explícitas para evitar layout shift (CLS)
 * - Placeholder de cor durante carregamento
 * - Suporte a prioridade para LCP
 * - Transição suave ao carregar
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  placeholderColor = "bg-muted",
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${placeholderColor}`}
      style={{
        aspectRatio: `${width}/${height}`,
        width: "100%",
        maxWidth: width,
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          className={`
            w-full h-full object-cover
            transition-opacity duration-300
            ${isLoaded ? "opacity-100" : "opacity-0"}
            ${className}
          `}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
