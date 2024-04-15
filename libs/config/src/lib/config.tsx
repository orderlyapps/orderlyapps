import styled from 'tailwind';

/* eslint-disable-next-line */
export interface ConfigProps {}

const StyledConfig = styled.div`
  color: pink;
`;

export function Config(props: ConfigProps) {
  return (
    <StyledConfig>
      <h1>Welcome to Config!</h1>
    </StyledConfig>
  );
}

export default Config;
