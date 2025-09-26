
export default function Home() {
  return (
<div>
        <button
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          onClick={
            () => {
              alert("HELLO WORLD");
            }
          }
        >
          Go to nextjs.org →
        </button></div>
  );
}
