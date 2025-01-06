import { FiSend } from "react-icons/fi";
import { ChatRequestOptions } from "ai";
import { AiOutlineAudio } from "react-icons/ai";
import { SiAudiomack } from "react-icons/si";
import { useState } from "react";
import { useAudioRecorder } from "@/hooks/useRecordVoice";
interface SearchInputProps {
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

const SearchInput: React.FC<SearchInputProps> = ({
  handleInputChange,
  handleSubmit,
  input,
}) => {
  const { isRecording, startRecording, stopRecording } = useAudioRecorder ();
  console.log(isRecording);

  const handleRecordingClick = () => {
    if (!isRecording) {
      startRecording;
    } else {
      stopRecording;
    }
  };

  return (
    <form
      className="flex justify-between w-4/5 p-5 rounded-full border border-zinc-500"
      onSubmit={handleSubmit}
    >
      <input
        className=" p-1 w-4/5 bg-transparent  rounded-full focus:outline-none"
        type="text"
        placeholder={`${
          isRecording
            ? "..............................................................................."
            : "i.e. what is the biggest fund right now?"
        }`}
        value={input}
        onChange={handleInputChange}
      />
      <div className="flex gap-4">
        <button
          className={`${
            isRecording ? "hidden" : "block"
          } flex justify-center items-center text-xl `}
        >
          <FiSend />
        </button>
        <button
          className="text-xl"
          onMouseDown={startRecording} // Start recording when mouse is pressed
          onMouseUp={stopRecording} // Stop recording when mouse is released
          onTouchStart={startRecording} // Start recording when touch begins on a touch device
          onTouchEnd={stopRecording} // Stop recording when touch ends on a touch device
        >
          <AiOutlineAudio className={`${isRecording ? "hidden" : "block"}`} />
          <SiAudiomack className={`${isRecording ? "block" : "hidden"}`} />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
