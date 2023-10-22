import { TfiPaintRoller } from "react-icons/tfi";

export const Banner = () => {
  return (
    <div className="relative border m-8 rounded-lg bg-gray-300">
      <div className="flex items-center justify-evenly px-8 py-12 flex-col gap-5 lg:gap-2 lg:flex-row">
        <div className="space-y-2">
          <h1 className="text-4xl text-center lg:text-left">Jattflex Garmz</h1>
          <p className="text-lg text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque,
            voluptas, nam dolorum quos.
          </p>
        </div>
        <div>
          <TfiPaintRoller size={50} className="text-indigo-700" />
        </div>
      </div>
    </div>
  );
};
