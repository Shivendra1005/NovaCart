const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-8 bg-indigo-600 rounded-full" />
      <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>
        <span className="text-slate-400 font-normal">{text1} </span>
        {text2}
      </h2>
    </div>
  );
};

export default Title;
