import Image from "next/image";
const Logo = ({
  size = 20,
  text = "text-white",
  font = "text-xl",
}: {
  size?: number;
  text?: string;
  font?: string;
}) => {
  return (
    <div className="flex items-center">
      <Image src={"/ventora.png"} alt={"logo"} width={size} height={size} />
      <span className={`${text} ${font} font-semibold tracking-tight`}>
        est<span className="text-[#3db86a]">ora</span>
      </span>
    </div>
  );
};

export default Logo;
