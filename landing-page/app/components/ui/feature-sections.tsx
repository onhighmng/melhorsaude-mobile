import { cn } from "./utils";
import { useState } from "react";
import { Play } from "lucide-react";
const imgRetiredWomanHoldingSmartphoneWithVideoCall20250217164327Utc1 = "/landing-assets/079291da9e6f672878110f4805a5c505832382be.png";
const imgEntrepreneurWomenWorkingAtHiringApplicationD20250219085723Utc1 = "/landing-assets/e6e8540359040ca4335e896e758e49b391476ade.png";
const videoThumbnail = "/landing-assets/c8e3bb2f680891a43139c15f64dc62e02ec12ccb.png";

const iconPlaceholderImage = "https://images.unsplash.com/photo-1672632826521-498e44486223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFyY2glMjBpY29uJTIwcHVycGxlJTIwZ3JhZGllbnR8ZW58MXx8fHwxNzY4MDYzNTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface FeatureCardProps {
  imageSrc: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

function FeatureCard({ imageSrc, title, description }: FeatureCardProps) {
  return (
    <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
      <img className="rounded-xl" src={imageSrc} alt="Feature image" />
      <h3 className="text-base font-semibold text-slate-700 mt-4">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </div>
  );
}

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  features: FeatureCardProps[];
}

export function FeatureSection({ title, subtitle, features }: FeatureSectionProps) {
  return (
    <section className="w-full py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-10">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}

interface FeatureItemProps {
  icon?: React.ReactNode;
  iconImage?: string;
  iconBgColor: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

function FeatureItem({ icon, iconImage, iconBgColor, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-6 max-w-md">
      <div className={cn("p-6 aspect-square rounded-full shrink-0 flex items-center justify-center", iconImage ? "overflow-hidden p-0" : "", iconBgColor)}>
        {iconImage ? (
          <img src={iconImage} alt="Feature icon" className="w-full h-full object-contain" />
        ) : (
          icon
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-700">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

interface FeatureWithImagesProps {
  image1Src: string;
  image2Src: string;
  imageAlt?: string;
  videoUrl?: string;
  features: FeatureItemProps[];
}

export function FeatureWithImages({ image1Src, image2Src, imageAlt = "Features", videoUrl, features }: FeatureWithImagesProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full">
      {/* Left Half - 2 Overlapping Images */}
      <div className="w-full md:w-1/2 relative h-[500px] md:h-[600px]">
        {/* Background Image - Top Left (Smaller) */}
        <div className="absolute top-0 left-0 w-[55%] md:w-[52%] z-30">
          <div className="relative w-full rounded-3xl shadow-xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
            {!isPlaying ? (
              <>
                <img
                  src={videoThumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
                  aria-label="Play video"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
                  </div>
                </button>
              </>
            ) : (
              <div className="w-full h-full bg-black">
                {videoUrl?.includes('youtube') || videoUrl?.includes('vimeo') ? (
                  <iframe
                    className="w-full h-full"
                    src={videoUrl}
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={videoUrl || "/landing-assets/brand-video.mp4"}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Foreground Image - Bottom Right (Larger, overlapping) */}
        <div className="absolute top-[25%] md:top-[30%] right-0 w-[70%] md:w-[68%] z-20">
          <img
            className="w-full rounded-3xl object-cover shadow-2xl"
            src={imgEntrepreneurWomenWorkingAtHiringApplicationD20250219085723Utc1}
            alt={imageAlt}
            style={{ aspectRatio: '3/4' }}
          />
        </div>
      </div>

      {/* Right Half - Features */}
      <div className="w-full md:w-1/2 space-y-10 px-4 md:px-0">
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}