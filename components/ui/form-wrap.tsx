export const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-fit h-full flex items-center justify-center py-12">
      <form className="max-w-[750px] w-full flex flex-col gap-6 items-center shadow-2xl rounded-md p-4 lg:p-8">
        {children}
      </form>
    </div>
  );
};
