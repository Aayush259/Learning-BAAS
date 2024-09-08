
export default function Loader({ containerClasses }: {containerClasses?: string}) {
  return (
    <div className={`absolute top-0 left-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-25 ${containerClasses}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
    </div>
  );
};
