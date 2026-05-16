import imgImageMelhorSaude from '@/assets/company-dashboard/f066e727bc45a7068fb1f989657736b83adf0448.png';

function ImageMelhorSaude() {
  return (
    <div className="absolute h-[27.359px] left-0 top-0 w-[257.985px]" data-name="Image (Melhor Saúde)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMelhorSaude} />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <ImageMelhorSaude />
    </div>
  );
}
