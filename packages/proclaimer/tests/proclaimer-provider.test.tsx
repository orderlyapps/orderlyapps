import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, render, screen } from "@testing-library/react";
import { ProclaimerProvider } from "../src/supabase/proclaimer-provider.tsx";
import { useSupabase, useSupabaseOrNull } from "../src/supabase/supabase-context.ts";

afterEach(cleanup);

function ConfiguredIndicator() {
  const supabase = useSupabaseOrNull();
  return <span>{supabase ? "configured" : "not-configured"}</span>;
}

function RequiredClient() {
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

test("useSupabaseOrNull returns null when credentials are missing", () => {
  render(
    <ProclaimerProvider supabaseUrl="" supabaseAnonKey="">
      <ConfiguredIndicator />
    </ProclaimerProvider>,
  );

  expect(screen.getByText("not-configured")).toBeTruthy();
});

test("useSupabaseOrNull returns the client when credentials are given", () => {
  render(
    <ProclaimerProvider supabaseUrl="https://example.supabase.co" supabaseAnonKey="anon-key">
      <ConfiguredIndicator />
    </ProclaimerProvider>,
  );

  expect(screen.getByText("configured")).toBeTruthy();
});

test("useSupabase returns the client when credentials are given", () => {
  render(
    <ProclaimerProvider supabaseUrl="https://example.supabase.co" supabaseAnonKey="anon-key">
      <RequiredClient />
    </ProclaimerProvider>,
  );

  expect(screen.getByText("configured")).toBeTruthy();
});

test("useSupabase throws when the provider is not configured", () => {
  // Suppress the expected console.error from React's error boundary logging.
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() =>
    render(
      <ProclaimerProvider supabaseUrl="" supabaseAnonKey="">
        <RequiredClient />
      </ProclaimerProvider>,
    ),
  ).toThrow(/not configured/);
  spy.mockRestore();
});

test("useSupabaseOrNull throws when rendered outside a provider", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<ConfiguredIndicator />)).toThrow(/no ProclaimerProvider/);
  spy.mockRestore();
});

test("useSupabase throws when rendered outside a provider", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<RequiredClient />)).toThrow(/no ProclaimerProvider/);
  spy.mockRestore();
});
