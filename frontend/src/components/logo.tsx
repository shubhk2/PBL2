import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
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
