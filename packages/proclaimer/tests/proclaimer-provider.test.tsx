import { expect, test, afterEach } from "vite-plus/test";
import { cleanup, render, screen } from "@testing-library/react";
import { ProclaimerProvider } from "../src/providers/proclaimer-provider.tsx";
import { useSupabase } from "../src/providers/supabase-context.ts";

afterEach(cleanup);

function ConfiguredIndicator() {
  const supabase = useSupabase();
  return <span>{supabase ? "configured" : "not-configured"}</span>;
}

test("renders children", () => {
  render(
    <ProclaimerProvider supabaseUrl="" supabaseAnonKey="">
      <p>child content</p>
    </ProclaimerProvider>,
  );

  expect(screen.getByText("child content")).toBeTruthy();
});

test("provides a null supabase client when credentials are missing", () => {
  render(
    <ProclaimerProvider supabaseUrl="" supabaseAnonKey="">
      <ConfiguredIndicator />
    </ProclaimerProvider>,
  );

  expect(screen.getByText("not-configured")).toBeTruthy();
});

test("provides a supabase client when credentials are given", () => {
  render(
    <ProclaimerProvider supabaseUrl="https://example.supabase.co" supabaseAnonKey="anon-key">
      <ConfiguredIndicator />
    </ProclaimerProvider>,
  );

  expect(screen.getByText("configured")).toBeTruthy();
});
