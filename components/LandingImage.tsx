import Image from "next/image";

function LandingImage() {
  return (
    <div className="flex flex-col items-center justify-center mt-[-50px]">
      <Image
        src="/Flying.svg"
        alt="Airport Image"
        width={400} // Set width
        height={300} // Set height
        priority // Ensures it loads immediately
      />
      <p className="text-[56px] mt-[-50px] leading-[64px] text-[#202124] dark:text-[#e8eaed]">
        Flights
      </p>
    </div>
  );
}

export default LandingImage;
