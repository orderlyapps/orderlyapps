import { createPortal } from "react-dom";
import { IonBackdrop } from "@ionic/react";
import { Spinner } from "../../../../../../ui/components/display/spinner/Spinner.tsx";
import { Body } from "../../../../../../ui/components/display/text/body/Body.tsx";
import { Space } from "../../../../../../ui/components/layout/space/Space.tsx";

interface DownloadBackdropProps {
  is_open: boolean;
  message?: string;
}

export function DownloadBackdrop({
  is_open,
  message = "Preparing your download...",
}: DownloadBackdropProps) {
  if (!is_open) return null;

  return createPortal(
    <>
      <IonBackdrop visible tappable={false} stopPropagation style={{ zIndex: 99999 }} />
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          zIndex: 100000,
          pointerEvents: "none",
        }}
      >
        <div>
          <Body>{message}</Body>
          <Space />
          <Spinner size="lg" />
        </div>
      </div>
    </>,
    document.body,
  );
}
