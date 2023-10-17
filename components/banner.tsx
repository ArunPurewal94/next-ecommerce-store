import { TfiPaintRoller } from "react-icons/tfi";

export const Banner = () => {
  return (
    <div className="relative border m-8 rounded-lg bg-gray-300">
      <div className="flex items-center justify-evenly px-8 py-12 flex-col gap-5 lg:gap-2 lg:flex-row">
        <div className="space-y-2">
          <h1 className="text-4xl text-center">
            Jord Powell&apos;s Art Store!
          </h1>
          <p className="text-lg text-center">
            Enjoy my collection of Canvas and Prints
          </p>
        </div>
        <div>
          <TfiPaintRoller size={50} className="text-indigo-700" />
        </div>
      </div>
    </div>
  );
};
