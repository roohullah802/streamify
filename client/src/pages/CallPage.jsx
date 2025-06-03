
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
} from "@stream-io/video-react-sdk";

const CallPage = () => {
 


  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        
          {/* <StreamVideo >
            <StreamCall >
              <CallContent />
            </StreamCall>
          </StreamVideo> */}
       
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
       
      </div>
    </div>
  );
};

const CallContent = () => {
 
  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;