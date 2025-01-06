
import SearchInput from "./SearchInput";
import { ChatRequestOptions } from "ai";
interface FooterProps {
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  input: string;
}

const Footer: React.FC<FooterProps> = ({
  handleInputChange,
  handleSubmit,
  input,
}) => {
  return (
    <div className="flex items-center justify-center p-9">
      <SearchInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
      />
    </div>
  );
};

export default Footer;
