import { useRxAllDocuments } from '@data';
import { formatDisplayName } from '../helper/formatDisplayName';

export const useFamilyHeads = () => {
  const { result: publishers }: any = useRxAllDocuments('publishers');

  const familyHeads = publishers
    .filter((publisher: { firstName: any; familyHead: any; id: any }) => {
      return publisher.familyHead === publisher.id;
    })
    .map(
      (head: {
        lastName: string;
        id: string;
        firstName: string;
        displayName: string;
      }) => {
        return { text: formatDisplayName(head), value: head.id };
      }
    );

  return familyHeads;
};
