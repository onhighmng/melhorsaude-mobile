import imgImage from "figma:asset/e8e2ae6c59942b93027046047aa7be8c33ef123d.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[199.609px] left-0 top-0 w-[356.999px]" data-name="Image">
        <img alt="" className="block max-w-none size-full" height="199.609" src={imgImage} width="356.999" />
      </div>
    </div>
  );
}