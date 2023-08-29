import QueryCard from "@/components/query-card";
import QuestionBox from "@/components/question-box";
import StyledCardList from "./styled-card-list";
import StyledRoundButton from "./styled-round-button";

const QueryGroup = () => {
  return (
    <StyledCardList>
      <QuestionBox />
      <QueryCard />
      <StyledRoundButton>+</StyledRoundButton>
    </StyledCardList>
  );
};

export default QueryGroup;
