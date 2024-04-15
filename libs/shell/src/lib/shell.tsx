import styled from 'tailwind';

/* eslint-disable-next-line */
export interface ShellProps {}

const StyledShell = styled.div`
  color: pink;
`;

export function Shell(props: ShellProps) {
  return (
    <StyledShell>
      <h1>Welcome to Shell!</h1>
    </StyledShell>
  );
}

export default Shell;
