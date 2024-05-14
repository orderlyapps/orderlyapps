export const getPhoneNumber = async (rxdb: any, publisher_id: string) => {
  try {
    if (!publisher_id) throw 'No publisher_id provided';
    
    const phoneNumber = await rxdb.publishers
      ?.findOne(publisher_id)
      .exec()
      .then((doc: any) => doc.toJSON().phoneNumber);

    if (!phoneNumber) throw 'No phone number found';
    return phoneNumber;
  } catch (error) {
    if (error) {
      console.log(error);
    }
    return 'Unknown';
  }
};
