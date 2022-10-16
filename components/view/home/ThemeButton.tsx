import changeTheme from "function/changeTheme";

const ThemeButton = () => {
  return (
    <>
      <div className="fixed bottom-0 right-0 z-50 flex m-2">
        <div
          className="flex items-center justify-center w-32 h-10 text-xs text-white bg-[#363636] dark:bg-[#f9f9f9] dark:text-black rounded-full cursor-pointer"
          onClick={changeTheme}
        >
          테마를 변경해보세요
        </div>
      </div>
    </>
  );
};

export default ThemeButton;
