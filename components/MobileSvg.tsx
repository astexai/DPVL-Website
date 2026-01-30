import Image from "next/image";

export default function MobileSvg()
{
    return <div>
        <div className="block sm:hidden absolute inset-0 w-full h-full">
      <Image
      src={"/assets/bg/MobileBanner.png"}
      fill
      alt="mobile banner"
      className="object-cover"
      />
    </div>
    </div>
}