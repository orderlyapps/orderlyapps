import { supabase } from '@data';

export const upsertPublisher = async (
  rxdb: any,
  publisher: {
    confidential_id: string;
    publisher_id: string;
    displayName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    outlines: string[];
  },
  congregation_id: string
) => {
  const newPublisher_id = publisher.publisher_id || crypto.randomUUID();
  const confidential_id = publisher.confidential_id || crypto.randomUUID();

  const { data, error } = await supabase
    .from('publishers')
    .upsert({
      publisher_id: newPublisher_id,
      congregation_id,

      displayName: publisher.displayName,
      firstName: publisher.firstName,
      middleName: publisher.middleName,
      lastName: publisher.lastName,

      outlines: publisher.outlines,
    })
    .select()
    .single();

  if (error) {
    alert(error.message);
  }

  const localData: any = await rxdb.publishers?.upsert({
    ...publisher,
    ...data,
    confidential_id,
    publisher_id: newPublisher_id,
  });

  const { data: publisherList }: any = await supabase
    .from('publishers')
    .select();

  return publisherList;
};
