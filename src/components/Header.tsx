import Avatar from "./Avatar";

const Header: React.FC = () => {
  return (
    <header className="flex w-full justify-between p-10 items-center">
      <h1 className="bg-light-900 text-xl">fundifier</h1>
      <Avatar />
    </header>
  );
};
export default Header;
