import Image from "next/image";

export default function Logo_left() {
  return (
    <div className="flex items-left justify-left">
      <Image
        src="/logo.svg"
        alt="Study Buddy"
        width={80}
        height={80}
        priority
      />

    </div>
  );
}
