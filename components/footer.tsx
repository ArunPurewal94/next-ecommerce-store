import { BiLogoInstagram, BiLogoFacebook, BiLogoTwitter } from "react-icons/bi";

export const Footer = () => {
  return (
    <div className="sticky bottom-0 flex items-center justify-between p-5 border-t bg-white dark:bg-black h-14">
      <p className="text-sm">&copy; Arun Purewal</p>
      <ul className="flex items-center gap-3">
        <li>
          <BiLogoInstagram size={20} />
        </li>
        <li>
          <BiLogoFacebook size={20} />
        </li>
        <li>
          <BiLogoTwitter size={20} />
        </li>
      </ul>
    </div>
  );
};
