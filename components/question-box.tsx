import StyledForm from "./StyledForm";
import StyledWideInput from "./styled-wide-input";
import StyledCard from "./styled-card";

const QuestionBox = () => {
  return (
    <StyledCard>
      <StyledForm>
        <label htmlFor="question">Question:</label>
        <StyledWideInput id="question" type="text" />
      </StyledForm>
    </StyledCard>
  );
};

export default QuestionBox;
