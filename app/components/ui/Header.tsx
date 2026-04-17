const Header = ({
  Icon,

  headline,
  text,
}: {
  Icon: React.ElementType;

  headline: string;
  text: string;
}) => {
  return (
    <div className="bg-gradient-to-br from-[#0a2e16] to-[#1a5c2e] rounded-2xl px-4 sm:px-6 lg:px-7 py-4 text-white flex items-center gap-3">
      <div className="p-2 bg-[#3db86a] rounded-lg shadow-sm">
        <Icon className="text-white h-6 w-6" />
      </div>
      <div>
        <h1 className="text-2xl font-bold ">{headline}</h1>
        <p className="text-sm font-medium">{text}</p>
      </div>
    </div>
  );
};

export default Header;
