import { Swiper, SwiperSlide } from '@ui-base';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ReactNode, Suspense, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

type TabbedPageContent = { label: string; component: ReactNode }[];

export const TabbedPage = ({
  label,
  content,
  backButtonText,
}: {
  label: string;
  backButtonText?: string;
  content: TabbedPageContent;
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              {...(backButtonText && { text: backButtonText })}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{label}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={content[currentTab].label}>
            {content.map(({ label }: { label: string }, index: number) => (
              <IonSegmentButton
                key={label}
                value={label}
                onClick={() => setCurrentTab(index)}
              >
                {label}
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent color={"light"}>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <div
            style={{
              height: '100%',
              // background: 'red',
              // padding: '10px',
            }}
          >
            <Swiper
              style={{
                // background: 'blue',
                // padding: '10px',
                height: '100%',
              }}
              currentTab={currentTab}
              slidesPerView={1}
              on={{
                slideChange: ({ activeIndex }: any) =>
                  setCurrentTab(activeIndex),
              }}
              injectStyles={[
                `
              :host(.red) .swiper-wrapper {
                background-color: red;
                
              }
              `,
              ]}
            >
              {content.map(
                ({
                  label,
                  component,
                }: {
                  label: string;
                  component: ReactNode;
                }) => (
                  <SwiperSlide
                    key={label}
                    style={{
                      // background: 'purple',
                      height: '100%',
                      // padding: '10px',
                      // overflow: 'auto',
                    }}
                  >
                    <div
                      style={{
                        // background: 'blue',
                        // padding: '10px',
                        height: '100%',
                        overflow: 'auto',
                      }}
                    >
                      {component}
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default TabbedPage;
