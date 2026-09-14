import type { ReactNode } from "react";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { AssignmentInfo } from "./components/assignment-info/AssignmentInfo.tsx";
import { AssignedPublishers } from "./components/assigned-publishers/AssignedPublishers.tsx";
import { PublisherSelector } from "./components/publisher-selector/PublisherSelector.tsx";
import { useAssignmentData } from "./hooks/use-assignment-data.ts";
import { useAssignmentHandlers } from "./hooks/use-assignment-handlers.ts";
import { useAssistantHandlers } from "./hooks/use-assistant-handlers.ts";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";

interface AssignmentDetailContentProps {
  week_id: string;
  assignment_id: string;
  children: (parts: { info: ReactNode; selector: ReactNode }) => ReactNode;
}

export function AssignmentDetailContent({
  week_id,
  assignment_id,
  children,
}: AssignmentDetailContentProps) {
  const {
    congregation_id,
    assignment,
    publishers,
    assignee,
    assigneeLabel,
    assistantId,
    assistantAssignment,
    assistantAssignee,
    isLoading,
    assignmentTitle,
    assignmentColor,
    assignmentContext,
  } = useAssignmentData({ week_id, assignment_id });

  const { handleDelete, handleSelect } = useAssignmentHandlers({
    congregation_id,
    assignment_id,
    week_id,
    assignment,
  });

  const { handleDeleteAssistant, handleSelectAssistant } = useAssistantHandlers({
    congregation_id,
    assistantId,
    week_id,
    assistantAssignment,
  });

  if (isLoading) {
    return <Spinner centered />;
  }

  return children({
    info: (
      <>
        <AssignmentInfo
          title={assignmentTitle}
          color={assignmentColor}
          context={assignmentContext}
        />

        <AssignedPublishers
          assignee={assignee}
          assigneeLabel={assigneeLabel}
          onDeleteAssignee={handleDelete}
          assistantId={assistantId}
          assistantAssignee={assistantAssignee}
          onDeleteAssistant={handleDeleteAssistant}
        />
      </>
    ),
    selector: (
      <>
        <Space />
        <PublisherSelector
          publishers={publishers}
          assignment={assignment}
          assistantId={assistantId}
          assistantAssignment={assistantAssignment}
          onSelectAssignee={handleSelect}
          onSelectAssistant={handleSelectAssistant}
          onClearAssignee={handleDelete}
          onClearAssistant={handleDeleteAssistant}
          assignment_id={assignment_id}
          week_id={week_id}
        />
      </>
    ),
  });
}
