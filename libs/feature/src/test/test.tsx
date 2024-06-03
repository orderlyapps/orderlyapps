/* eslint-disable-next-line */
export interface TestProps {}

export function Test(props: TestProps) {
  return (
    <div>
      <h1>Welcome to Test!</h1>
    </div>
  );
}

export default Test;

if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const { it, expect, beforeEach } = import.meta.vitest;
  let render: typeof import('@testing-library/react').render;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Test />);
    expect(baseElement).toBeTruthy();
  });
}
