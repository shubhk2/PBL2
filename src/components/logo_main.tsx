import Image from "next/image";

export default function Logo_main() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="Study Buddy"
        width={150}
        height={150}
        priority
      />

    </div>
  );
}
