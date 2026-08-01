function Button({ text, loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}

export default Button;