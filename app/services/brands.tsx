import { cn } from '@/lib/utils'
import { Marquee } from '@/components/magicui/marquee';


const projects = [
    {
      video: "https://videos.pexels.com/video-files/30442221/13045784_2560_1440_30fps.mp4",
      width: 320,
      height: 200,
      className: "w-80 h-52"
    },
    {
      video: "https://videos.pexels.com/video-files/5076634/5076634-uhd_2732_1440_25fps.mp4",
      width: 400,
      height: 300,
      className: "w-96 h-72"
    },
    {
      video: "https://videos.pexels.com/video-files/27421705/12140050_2730_1440_30fps.mp4",
      width: 280,
      height: 250,
      className: "w-72 h-64"
    },
    {
      video: "https://videos.pexels.com/video-files/4419251/4419251-hd_1920_1080_25fps.mp4",
      width: 360,
      height: 220,
      className: "w-80 h-56"
    },
    {
      video: "https://videos.pexels.com/video-files/5585939/5585939-hd_1920_1080_25fps.mp4",
      width: 300,
      height: 280,
      className: "w-72 h-64"
    },
    {
      video: "https://videos.pexels.com/video-files/5077471/5077471-uhd_1440_2732_25fps.mp4",
      width: 420,
      height: 240,
      className: "w-96 h-60"
    },
  ];

const VideoCard = ({
    video,
    className
} : { 
    video:string;
    width: number;
    height: number;
    className: string;
}) => {
    return (
        <div className={cn("relative cursor-pointer overflow-hidden mx-4")}>
            <div className='flex flex-row items-center'>
                <div className={cn("relative", className )}>
                    <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    className='w-full h-full object-cover'
                    />
                </div>
            </div>
        </div>
    )
}



const Brands = () => {
    return ( 
    <div className='relative flex w-full flex-col items-center justify-center overflow-hidden py-8'>
      <Marquee pauseOnHover className='[--duration:20s]'>
        {projects.map((project, index) => (
          <VideoCard key={index} {...project} />
        ))}
      </Marquee>
      
    </div> );
}
 
export default Brands ;