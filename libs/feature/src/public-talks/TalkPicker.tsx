import useSBPublishers from '../publishers/hooks/useSBPublishers';

export const TalkPicker = () => {
  const publishers = useSBPublishers();
  console.log("🚀 ~ TalkPicker ~ publishers:", publishers)


  
  return <div>TalkPicker</div>;
};
