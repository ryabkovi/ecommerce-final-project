// function Loading() {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div
//         className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-500 rounded-full"
//         role="status"
//       ></div>
//     </div>
//   );
// }

// export default Loading;
function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div
        className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full"
        role="status"
      ></div>
    </div>
  );
}

export default Loading;
