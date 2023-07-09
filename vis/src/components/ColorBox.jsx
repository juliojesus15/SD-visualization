export const ColorBox = ({ color }) => {
  return (
    <div className={`
      w-6 h-6
      border-2 border-gray-300
      shadow-md shadow-black/50 
      rounded-full 
      ${color.available ? "hover:opacity-70 active:scale-95 cursor-pointer ": "opacity-30 dark:opacity-10"}
      ${color.bg}`}
    >
    </div>
  );
};