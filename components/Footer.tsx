import Link from "next/link";

export default function Footer() {
  return (
    <footer className="space-y-1 px-4 py-6 text-center text-xs text-neutral-400">
      <p>
        <Link href="/how2use" className="text-orange-400 underline hover:text-orange-300">
          How to use DPOPz?
        </Link>
      </p>
      <p>Subby and gator with Team. DXER</p>
      <p>data provided by XYZ012, 1899, siyamaki</p>
      <p>
        Unofficial difficulty from{" "}
        <a
          href="https://zasa.sakura.ne.jp/dp/run.php"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          SNJ@KMZS
        </a>
      </p>
    </footer>
  );
}
