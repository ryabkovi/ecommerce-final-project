function Loading() {
  return (
    <div className="flex justify-center items-center h-[300px]">
      <div
        className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full"
        role="status"
      />
    </div>
  );
}

export default Loading;
