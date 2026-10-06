import { expect, test } from "vite-plus/test";
import { pdf } from "@react-pdf/renderer";
import { ContactsPdfDocument } from "../src/feature/publisher-local/components/download-contacts-pdf-button/components/contacts-pdf-document/contacts-pdf-document.tsx";
import type { ContactWithDetails } from "../src/feature/publisher-local/components/download-contacts-pdf-button/types.ts";

const contacts = [
  {
    id: "1",
    last_name: "Nguyễn",
    first_name: "Mai",
    display_name: null,
    phone: "555-0001",
    email: "mai@example.com",
    address: { street_line: "4 Đường Láng", suburb: "Đống Đa" },
    emergency_contact: { first_name: "Ελένη", last_name: "Łukaszewicz", phone: "555-0002" },
  },
  {
    id: "2",
    last_name: "Владимир",
    first_name: "Пётр",
    display_name: null,
    phone: "555-0003",
    email: null,
    address: null,
    emergency_contact: null,
  },
] as ContactWithDetails[];

test("contacts pdf embeds fonts with ToUnicode maps", async () => {
  const blob = await pdf(<ContactsPdfDocument contacts={contacts} />).toBlob();
  const buf = Buffer.from(await blob.arrayBuffer());
  const raw = buf.toString("latin1");

  // Non-embedded base-14 fonts let some viewers render but not select text,
  // and corrupt characters outside WinAnsi (e.g. "Nguyễn", "Łukaszewicz").
  expect(raw).toContain("FontFile2");
  expect(raw).toContain("ToUnicode");
  expect(raw).not.toContain("Helvetica");
});
