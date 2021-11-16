import Image from "next/image";
import pic from "../public/profilePic.jpg";
import bg from "../public/bg.jpg";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255, 0.8) 0, rgba(255,255,255, 3.2) 89%), url(${bg.src})`,
      }}
    >
      <div className="flex py-10 md:py-24 flex-col md:flex-row justify-center items-center text-center shadow">
        <div className="md:mr-10">
          <Image
            src={pic}
            alt="Marta's profile pic"
            quality={100}
            objectFit="cover"
            layout="fixed"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <div>
          <div className="font-title font-light text-5xl sm:text-7xl text-gray-600">
            <span className="decoration-clone bg-clip-text text-transparent bg-gradient-to-b from-yellow-300 to-red-500">
              think
            </span>
            ,{" "}
            <span className="decoration-clone bg-clip-text text-transparent bg-gradient-to-b from-indigo-300 to-purple-600">
              make
            </span>
            ,{" "}
            <span className="decoration-clone bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-green-500">
              repeat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
