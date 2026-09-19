import { expect, test } from "vite-plus/test";
import { hostFromUrl, normalizeUrl } from "../src/bookmarks/store.ts";

test("normalizeUrl accepts localhost URLs", () => {
  expect(normalizeUrl("http://localhost:4220/")).toBe("http://localhost:4220/");
  expect(normalizeUrl("localhost:4220")).toBe("http://localhost:4220/");
  expect(normalizeUrl("localhost")).toBe("http://localhost/");
  expect(normalizeUrl("app.localhost:3000")).toBe("http://app.localhost:3000/");
});

test("normalizeUrl accepts loopback and IPv6 hosts", () => {
  expect(normalizeUrl("127.0.0.1:3000")).toBe("http://127.0.0.1:3000/");
  expect(normalizeUrl("127.1")).toBe("http://127.0.0.1/");
  expect(normalizeUrl("localhost.")).toBe("http://localhost./");
  expect(normalizeUrl("localhost:443")).toBe("http://localhost:443/");
  expect(normalizeUrl("http://[::1]:8080")).toBe("http://[::1]:8080/");
});

test("normalizeUrl decides scheme from parsed hostname, not raw input", () => {
  expect(normalizeUrl("localhost:3000@evil.com")).toBe("https://localhost:3000@evil.com/");
  expect(normalizeUrl("user@localhost:3000")).toBe("http://user@localhost:3000/");
});

test("normalizeUrl defaults public domains to https", () => {
  expect(normalizeUrl("example.com")).toBe("https://example.com/");
  expect(normalizeUrl("https://example.com/path?q=1")).toBe("https://example.com/path?q=1");
});

test("normalizeUrl rejects invalid input", () => {
  expect(normalizeUrl("")).toBe(null);
  expect(normalizeUrl("   ")).toBe(null);
  expect(normalizeUrl("intranet")).toBe(null);
  expect(normalizeUrl("not a url")).toBe(null);
  expect(normalizeUrl("ftp://example.com")).toBe(null);
});

test("hostFromUrl keeps non-default ports", () => {
  expect(hostFromUrl("http://localhost:4220/")).toBe("localhost:4220");
  expect(hostFromUrl("https://example.com:8443/")).toBe("example.com:8443");
  expect(hostFromUrl("https://www.example.com/")).toBe("example.com");
});
