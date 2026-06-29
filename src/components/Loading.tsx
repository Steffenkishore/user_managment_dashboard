const Loading = () => {
  return (
    <div className="flex min-h-75 items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-lg font-medium text-slate-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
