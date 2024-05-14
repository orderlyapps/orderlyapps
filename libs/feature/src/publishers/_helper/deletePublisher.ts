import { supabase } from '@data';

export const deletePublisher = async (db: any, publisher_id: string) => {
  const { error }: any = await supabase
    .from('publishers')
    .delete()
    .eq('publisher_id', publisher_id);

  if (error) console.log(error.message);

  try {
    const { doc } = await db.publishers?.findOne(publisher_id).exec();
    await doc.delete();
  } catch (error) {
    console.log(error);
  }
};
