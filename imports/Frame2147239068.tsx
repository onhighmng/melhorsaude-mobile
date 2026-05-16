import imgImage from "../assets/8dff2c19edc8727940a6d01073f57ee82433a27b.png";
import imgImage1 from "../assets/0495bc14ac23070285c72525187a934468838fcf.png";
import { useLanguage } from '../contexts/LanguageContext';

type FrameProps = {
  onMoodHistoryClick?: () => void;
  onRateSessionsClick?: () => void;
};

const ProductCard = ({
  title,
  titleColor = "text-[#1f1f1f]",
  imageSrc,
  onClick
}: {
  title: string;
  titleColor?: string;
  imageSrc: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="relative bg-white border border-[#e8e8e8] rounded-[20px] h-full overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
    >
      {/* Image Area */}
      <div className="absolute top-[6px] left-[6px] right-[6px] bottom-[54px] rounded-[14px] overflow-hidden">
        <img src={imageSrc} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      {/* Text Area */}
      <div className="absolute bottom-[6px] left-[6px] right-[6px] h-[42px] bg-[#fafafa] rounded-[14px] flex items-center px-3">
        <p className={`font-['Poppins',sans-serif] font-medium text-[14px] ${titleColor} truncate`}>
          {title}
        </p>
      </div>

      {/* Arrow Icon */}
      <div className={`absolute top-[12px] right-[12px] size-8 flex items-center justify-center bg-white rounded-full shadow-sm z-10 transition-transform group-hover:scale-110`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 7H17V17" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default function Frame({ onMoodHistoryClick, onRateSessionsClick }: FrameProps) {
  const { t } = useLanguage();

  return (
    <div className="relative size-full">
      <div className="grid grid-cols-2 gap-3 h-full">
        {/* Emotion Diary */}
        <ProductCard
          title={t('meuEspaco.emotionDiary')}
          imageSrc={imgImage}
          onClick={onMoodHistoryClick}
          iconPosition="right"
        />

        {/* Rate Sessions */}
        <ProductCard
          title={t('meuEspaco.rateSessions')}
          titleColor="text-[#D4AF37]"
          imageSrc={imgImage1}
          onClick={onRateSessionsClick}
        />
      </div>
    </div>
  );
}