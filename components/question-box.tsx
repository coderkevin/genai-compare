import StyledForm from "./styled-form";
import StyledWideInput from "./styled-wide-input";
import StyledCard from "./styled-card";
import { ChangeEvent } from "react";

interface QuestionBoxProps {
  question: string;
  setQuestion: (value: string) => void;
}

const QuestionBox = ({ question, setQuestion }: QuestionBoxProps) => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  return (
    <StyledCard>
      <StyledForm>
        <label htmlFor="question">Question:</label>
        <StyledWideInput
          id="question"
          type="text"
          value={question}
          onChange={onInputChange}
        />
      </StyledForm>
    </StyledCard>
  );
};

export default QuestionBox;
