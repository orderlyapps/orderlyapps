import styled from 'tailwind';

/* eslint-disable-next-line */
export interface DataProps {}

const StyledData = styled.div`
  color: pink;
`;

export function Data(props: DataProps) {
  return (
    <StyledData>
      <h1>Welcome to Data!</h1>
    </StyledData>
  );
}

export default Data;
