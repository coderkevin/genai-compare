import StyledCard from "./styled-card";
import StyledFormButton from "./styled-form-button";
import StyledWideInput from "./styled-wide-input";
import StyledForm from "./StyledForm";

const QueryCard = () => {
  return (
    <StyledCard>
      <StyledForm>
        <label htmlFor="topic">Topic:</label>
        <input id="topic" type="text" />
        <label htmlFor="url">URL:</label>
        <StyledWideInput id="url" type="text" />
        <StyledFormButton>Query</StyledFormButton>
      </StyledForm>
    </StyledCard>
  );
};

export default QueryCard;
