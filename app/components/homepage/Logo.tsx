import Image from "next/image";
const Logo = () => {
  return (
    <div className="flex items-center">
      <Image src={"/ventora.png"} alt={"logo"} width={20} height={20} />
      <span className="text-white text-xl font-semibold tracking-tight">
        est<span className="text-[#3db86a]">ora</span>
      </span>
    </div>
  );
};

export default Logo;
