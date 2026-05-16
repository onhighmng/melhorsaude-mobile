function Button() {
  return (
    <div className="absolute bg-[#e3f2fd] h-[35px] left-[4px] rounded-[100px] top-[4px] w-[109px]" data-name="Button">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[24px] left-[18px] text-[#1976d2] text-[12px] text-nowrap top-[6px] tracking-[-0.3125px]">Saude mental</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#ffebee] h-[35px] left-[117px] rounded-[100px] top-[4px] w-[109px]" data-name="Button">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[normal] left-[30px] text-[#af1010] text-[12px] text-nowrap top-[10px]">Fisico</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#e8f5e9] h-[35px] left-[230px] rounded-[100px] top-[4px] w-[109px]" data-name="Button">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[normal] left-[37px] text-[#388e3c] text-[12px] text-nowrap top-[10px]">financeiro</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#e8f5e9] h-[35px] left-[343px] rounded-[100px] top-[4px] w-[109px]" data-name="Button">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[normal] left-[37px] text-[#388e3c] text-[12px] text-nowrap top-[10px]">juridico</p>
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute bg-black h-[43px] left-0 rounded-[100px] top-0 w-[456px]" data-name="Menu">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[43px] left-0 top-0 w-[456px]">
      <Menu />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[43px] left-0 top-0 w-[456px]">
      <Frame />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="relative size-full">
      <Frame1 />
    </div>
  );
}
