const imgImage = "/landing-assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";

function Image() {
  return (
    <div className="absolute h-[507px] left-0 top-0 w-[521px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <Image />
    </div>
  );
}