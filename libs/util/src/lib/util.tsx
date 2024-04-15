import styled from 'tailwind';

/* eslint-disable-next-line */
export interface UtilProps {}

const StyledUtil = styled.div`
  color: pink;
`;

export function Util(props: UtilProps) {
  return (
    <StyledUtil>
      <h1>Welcome to Util!</h1>
    </StyledUtil>
  );
}

export default Util;
